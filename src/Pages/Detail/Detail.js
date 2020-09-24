import React from "react";
import InfoTitle from "./Components/InfoTitle";
import Review from "./Components/Review";
import { api } from "../../config/api";
import {
  DETAIL_DATA,
  DESC_DATA,
  CHANGE_DATA,
  related_product_list_test,
} from "./data";
import "./Detail.scss";

class Detail extends React.Component {
  constructor() {
    super();

    this.state = {
      activeInfo: false,
      activeNotice: false,
      activePolicy: false,
      activeRelated: false,
      detail: {},
      count: 1,
    };
  }

  handleInfo = (idx) => {
    this.setState((prev) => {
      return {
        [ACTIVE_LIST[idx]]: !prev[ACTIVE_LIST[idx]],
      };
    });
  };

  changePrice = (num) => {
    if (!num) return 0;
    return num.toLocaleString();
  };

  handleCount = (e) => {
    const { innerText } = e.target;
    const { count } = this.state;

    if (count > 1 && innerText === "-") {
      this.setState({
        count: count - 1,
      });
    } else if (innerText === "+") {
      this.setState({
        count: count + 1,
      });
    }
  };

  componentDidMount() {
    fetch(`${api}/products/146`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setTimeout(() => {
          this.setState({
            detail: result.data[0],
          });
        }, 1000);
      });
  }

  render() {
    const {
      activeInfo,
      activeNotice,
      activePolicy,
      activeRelated,
      detail,
      count,
    } = this.state;

    const {
      detailimage,
      name: mainName,
      price: mainPrice,
      sale_price,
      point,
      sub_text,
      thumbnail_group,
      related_group,
    } = detail;

    return (
      <div className="Detail">
        {Object.keys(detail).length ? (
          <div className="detailContents">
            <div className="imageSection">
              <div className="productImage">
                {detailimage.map((el, i) => {
                  return (
                    <img
                      key={i}
                      alt="detail"
                      src={
                        i === detailimage.length - 1
                          ? el.slice(2, el.length - 2)
                          : el.slice(2, el.length - 1)
                      }
                    />
                  );
                })}
              </div>
              <Review />
            </div>
            <div className="infoSection">
              <ul className="titleList">
                <li className="productTitle">{mainName}</li>
                <li
                  className={sale_price ? "mainPrice lineThrough" : "mainPrice"}
                >
                  {this.changePrice(mainPrice)}원
                </li>
                <li className="salePrice">
                  {sale_price > 0 && (
                    <>
                      <span>{this.changePrice(sale_price)}원</span>
                      <span>
                        {` ${parseInt(
                          ((mainPrice - sale_price) / mainPrice) * 100
                        )}%`}
                      </span>
                    </>
                  )}
                </li>
                <li className="pointText">
                  <span>{this.changePrice(point)}P</span>
                  <span>
                    {` (${parseInt(
                      (point / (sale_price === 0 ? mainPrice : sale_price)) *
                        100
                    )}%)`}
                  </span>
                </li>
                <li className="subText">{sub_text}</li>
              </ul>
              <div className="productColor">
                {thumbnail_group?.map((el, i) => {
                  return <img key={i} alt="img" src={el} />;
                })}
              </div>
              <div className="orderCounter">
                <div className="countTitle">{mainName}</div>
                <div className="counter">
                  <span onClick={this.handleCount}>-</span>
                  <span>{count}</span>
                  <span onClick={this.handleCount}>+</span>
                </div>
                <div className="pricePoint">
                  <div>{this.changePrice(mainPrice * count)}원</div>
                  <div>{`(${this.changePrice(point * count)}P)`}</div>
                </div>
              </div>
              <div className="finalPrice">{`총 상품금액 : ${this.changePrice(
                (sale_price ? sale_price : mainPrice) * count
              )}원`}</div>
              <div className="orderBox">
                <div className="buyNow">BUY NOW</div>
                <div className="addCart">ADD TO CART</div>
              </div>
              <div className="description">
                <p>
                  <span className="orange bold">{orangeTitle}</span>
                  <span className="bold">{subTitle}</span>
                </p>
                {DESC_DATA.map((el, i) => {
                  return (
                    <div key={i}>
                      <p className="bold">{el.contentTitle}</p>
                      <p>{el.content}</p>
                    </div>
                  );
                })}
              </div>
              <div className="information">
                <div className={activeInfo ? "infoBox activeInfo" : "infoBox"}>
                  <InfoTitle
                    handler={() => this.handleInfo(0)}
                    active={activeInfo}
                    title="INFO"
                  />
                  <p>MATERIAL : COTTON 100%</p>
                  <p>WEIGHT : 650g</p>
                  <p>SIZE : W 30 x H 48 x D 14.5 cm</p>
                </div>
                <div
                  className={activeNotice ? "infoBox activeInfo" : "infoBox"}
                >
                  <InfoTitle
                    handler={() => this.handleInfo(1)}
                    active={activeNotice}
                    title={"NOTICE"}
                  />
                  <p className="bold">{noticeTitle}</p>
                  <p>{noticeContent}</p>
                </div>
                <div
                  className={activePolicy ? "infoBox activeInfo" : "infoBox"}
                >
                  <InfoTitle
                    handler={() => this.handleInfo(2)}
                    active={activePolicy}
                    title={"POLICY"}
                  />
                  {CHANGE_DATA.map((el, i) => {
                    return (
                      <div key={i}>
                        <p
                          className={
                            i === 0
                              ? "bold"
                              : i === 5
                              ? "bold secondPolicy"
                              : ""
                          }
                        >
                          {el}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div
                  className={activeRelated ? "infoBox activeInfo" : "infoBox"}
                >
                  <InfoTitle
                    handler={() => this.handleInfo(3)}
                    active={activeRelated}
                    title={"RELATED"}
                  />
                  <ul>
                    {related_group.map((el) => {
                      return (
                        <li key={el.related_id}>
                          <img alt="relatedItem" src={el.related_thumbnail} />
                          <div className="itemTitle">{el.related_name}</div>
                          <div
                            className={
                              el.related_sale_price
                                ? "itemPrice priceLine"
                                : "itemPrice"
                            }
                          >
                            {this.changePrice(el.related_price)}원
                          </div>
                          {el.related_sale_price !== 0 && (
                            <div className="itemPrice orange">
                              {this.changePrice(el.related_sale_price)}원
                            </div>
                          )}
                        </li>
                      );
                    })}
                    {/* {related_product_list_test.map((el) => {
                      return (
                        <li key={el.id}>
                          <img alt="relatedItem" src={el.thumbnail} />
                          <div className="itemTitle">{el.name}</div>
                          <div
                            className={
                              el.sale_price
                                ? "itemPrice priceLine"
                                : "itemPrice"
                            }
                          >
                            {this.changePrice(el.price)}원
                          </div>
                          {el.sale_price !== 0 && (
                            <div className="itemPrice orange">
                              {this.changePrice(el.sale_price)}원
                            </div>
                          )}
                        </li>
                      );
                    })} */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="loader" />
        )}
      </div>
    );
  }
}

export default Detail;

const ACTIVE_LIST = [
  "activeInfo",
  "activeNotice",
  "activePolicy",
  "activeRelated",
];

const { orangeTitle, subTitle, noticeTitle, noticeContent } = DETAIL_DATA;
