import React from "react";
import "./ItemList.scss";

class ItemList extends React.Component {
  render() {
    const {
      itemSrc,
      itemHoverSrc,
      itemName,
      itemPrice,
      itemSalePrice,
      itemSubText,
      itemLastText,
    } = this.props;

    return (
      <div className="ItemList">
        {this.props.length !== 0 && (
          <li className="listEffect">
            <div className="itemImage">
              <a href="">
                <img className="imgPic" alt="Item Pic" src={itemSrc} />
                {itemHoverSrc && (
                  <img
                    className="imgHover"
                    alt="Item Pic Hover"
                    src={itemHoverSrc}
                  />
                )}
              </a>
            </div>
            <div className="itemInfo">
              <a href="">
                <span>{itemName}</span>
                <span className={itemSalePrice ? "price priceLineOn" : "price"}>
                  {itemPrice && itemPrice.toLocaleString()}원
                </span>
                {itemSalePrice !== 0 && (
                  <span className="discountPrice">
                    {itemSalePrice.toLocaleString()}원
                  </span>
                )}
                {itemSubText && <span className="subText">{itemSubText}</span>}
                {itemLastText === "CLEARANCE" && (
                  <span className="lastText">LAST CHANCE</span>
                )}
              </a>
            </div>
          </li>
        )}
      </div>
    );
  }
}

export default ItemList;
