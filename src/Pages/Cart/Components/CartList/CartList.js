import React from "react";
import "./CartList.scss";

class CartList extends React.Component {
  render() {
    const {
      amount,
      handlePlus,
      handleMinus,
      idx,
      name,
      price,
      salePrice,
      thumbnail,
      handleDelete,
      cartId,
    } = this.props;

    return (
      <li className="CartList">
        <div className="thumbnail">
          <input type="checkbox" />
          <a href="m">
            <img alt="thumbImg" src={thumbnail} />
          </a>
        </div>
        <div className="listInfo">
          <a href="m">{name}</a>
          <div className="deleteBox" onClick={() => handleDelete(cartId)}>
            <span className="delete1"></span>
            <span className="delete2"></span>
          </div>
          <span>
            <div className="minus" onClick={() => handleMinus(idx)}></div>
            <input type="text" value={amount} />
            <div className="plus" onClick={() => handlePlus(idx)}></div>
          </span>
          <span className={salePrice ? "price lineOn" : "price"}>
            {price.toLocaleString()}원
          </span>
          {salePrice !== 0 && (
            <span className="salePrice">{salePrice.toLocaleString()}원</span>
          )}
        </div>
        <div className="listPrice">
          <div>
            {((salePrice ? salePrice : price) * amount).toLocaleString()}원
          </div>
          <div>배송:기본배송 / 무료</div>
        </div>
      </li>
    );
  }
}

export default CartList;
