import React from "react";
import CartList from "./Components/CartList/CartList";
import "./Cart.scss";
import { api } from "../../config/api";

class Cart extends React.Component {
  state = {
    cartList: [],
  };

  componentDidMount() {
    fetch(`${api}/cart`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ cartList: res.data });
      });
  }

  handleDelete = (cartId) => {
    const { cartList } = this.state;

    const filteredList = cartList.filter(
      (content) => content.cart_id !== cartId
    );
    // this.setState({
    //   cartList: filteredList,
    // });

    fetch(`${api}/cart/${cartId}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          cartList: filteredList,
        });
      });
  };

  handlePlus = (idx) => {
    const { cartList } = this.state;
    const newCartList = cartList.length > 0 && [...cartList];
    newCartList[idx].quantity = newCartList[idx].quantity + 1;

    this.setState({
      cartList: newCartList,
    });
  };

  handleMinus = (idx) => {
    const { cartList } = this.state;
    const newCartList = cartList.length > 0 && [...cartList];
    newCartList[idx].quantity =
      newCartList[idx].quantity > 1
        ? newCartList[idx].quantity - 1
        : newCartList[idx].quantity;

    this.setState({ cartList: newCartList });
  };

  calPrice = () => {
    const { cartList } = this.state;
    let totalPrice = 0;

    if (cartList !== undefined) {
      for (let i = 0; i < cartList.length; i++) {
        totalPrice += cartList[i].product_price * cartList[i].quantity;
      }
    }
    return totalPrice.toLocaleString();
  };

  calSalePrice = () => {
    const { cartList } = this.state;
    let totalSalePrice = 0;

    if (cartList !== undefined) {
      for (let i = 0; i < cartList.length; i++) {
        if (cartList[i].product_sale_price !== 0) {
          totalSalePrice =
            (cartList[i].product_price - cartList[i].product_sale_price) *
            cartList[i].quantity;
        }
      }
    }

    return totalSalePrice.toLocaleString();
  };

  calTotalPrice = () => {
    let totalPrice = 0;

    totalPrice =
      Number(this.calPrice().split(",").join("")) -
      Number(this.calSalePrice().split(",").join(""));
    return totalPrice.toLocaleString();
  };

  render() {
    const { cartList } = this.state;

    return (
      <div className="Cart">
        <div className="cartTitle">
          <ul>
            <li>국내배송상품 ({cartList.length})</li>
            <li>해외배송상품 (0)</li>
            <p>장바구니에 담긴 상품은 10일 동안 보관됩니다.</p>
          </ul>
        </div>
        <div className="cartList">
          <ul>
            {cartList?.map((content, i) => (
              <CartList
                key={content.product_name}
                idx={i}
                name={content.product_name}
                price={content.product_price}
                salePrice={content.product_sale_price}
                amount={content.quantity}
                thumbnail={content.thumbnail}
                handleDelete={this.handleDelete}
                handlePlus={this.handlePlus}
                handleMinus={this.handleMinus}
                cartId={content.cart_id}
              />
            ))}
          </ul>
        </div>
        <div className="cartPrice">
          <div>
            <p>PRICE</p>
            <p>SHIPPING</p>
            <p>DISCOUNT SEE DETAIL</p>
            <p>TOTAL</p>
          </div>
          <div>
            <p>{this.calPrice()}원</p>
            <p>+ 0원</p>
            <p>{this.calSalePrice()}원</p>
            <p>{this.calTotalPrice()}원</p>
          </div>
        </div>
        <div className="cartButtonBox">
          <div className="cartButton">ORDER</div>
        </div>
      </div>
    );
  }
}

export default Cart;
