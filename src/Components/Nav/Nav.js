import React from "react";
import { Link } from "react-router-dom";
import { api } from "../../config/api";
import "./Nav.scss";

class Nav extends React.Component {
  constructor() {
    super();

    this.state = {
      searchOn: false,
      popupOn: true,
      searchResult: [],
    };
  }

  handleKeyword = (e) => {
    fetch(`${api}/products/search?keyword=${e.target.value}`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        this.setState({
          searchResult: result.data,
        });
      });
  };

  handlePopup = () => {
    this.setState((prev) => {
      return { popupOn: !prev.popupOn };
    });
  };

  handleSearch = () => {
    this.setState((prev) => {
      return { searchOn: !prev.searchOn };
    });
  };

  userLogout = () => {
    window.localStorage.removeItem("token");
    window.location.href = "/";
  };

  render() {
    const { searchOn, popupOn, searchResult } = this.state;
    const token = localStorage.getItem("token");
    return (
      <div className="Nav">
        <div className="navWrapper">
          <div className={popupOn ? "navPopup" : "popupClose"}>
            <p>
              <a href="/main">
                오직 이곳에서만, 로우로우
                <span> 써비스</span>
              </a>
            </p>
            <div onClick={this.handlePopup}>
              <span />
              <span />
            </div>
          </div>
          <div className="navContent">
            <div className="navHome">
              <a href="/">
                <img
                  src="https://www.rawrow.com/web/upload/mundane/logo.png"
                  alt="logo"
                />
                <span />
              </a>
            </div>
            <ul className="navCenter">
              <li className="navCenterList">
                <a href="/product/ALL">PRODUCT</a>
                <ul className="productItems">
                  {NAV_TITLE.PRODUCT.map((title, i) => {
                    return (
                      <li key={i} className={i > 4 ? "orangeItems" : ""}>
                        {title}
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className="navCenterList">
                <a href="/product/ALL">EXPLORE</a>
                <ul className="exploreItems">
                  {NAV_TITLE.EXPLORE.map((title, i) => {
                    return <li key={i}>{title}</li>;
                  })}
                </ul>
              </li>
              <li className="navCenterList">
                <a href="/product/ALL">CENTER</a>
                <ul className="centerItems">
                  {NAV_TITLE.CENTER.map((title, i) => {
                    return <li key={i}>{title}</li>;
                  })}
                </ul>
              </li>
            </ul>
            <ul className="navRight">
              <li onClick={this.handleSearch}>SEARCH</li>
              <li>MY PAGE</li>
              {window.localStorage.getItem("token") === null ? (
                <Link to="/login">
                  <li>LOGIN</li>
                </Link>
              ) : (
                <li onClick={this.userLogout}>LOGOUT</li>
              )}
              <Link to={token !== null ? "/cart" : "/login"}>
                <li>CART</li>
              </Link>
              <li>KR /</li>
            </ul>
          </div>
          <div className={searchOn ? "search searchOn" : "search"}>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                onChange={this.handleKeyword}
              />
              <div>
                <div onClick={this.handleSearch}>
                  <span className="closeBtnOne" />
                  <span className="closeBtnTwo" />
                </div>
              </div>
            </form>
          </div>
          <div
            className={searchOn ? "searchResult" : "searchResult searchNone"}
          >
            {searchResult?.map((el) => {
              return (
                <a
                  key={el.id}
                  href={`/detail/${el.id}`}
                  onClick={this.goToDetail}
                >
                  <div className="resultBox" name={el.id}>
                    <img alt="resultImage" src={el.thumbnail} />
                    <span className="category">{el.category}</span>
                    <span className="searchName">{el.name}</span>
                    <div>
                      <span className={el.sale_price > 0 ? "price" : ""}>
                        {el.price}원
                      </span>
                      {el.sale_price > 0 && (
                        <span className="salePrice">{el.sale_price}원</span>
                      )}
                    </div>
                    <span className="buyNow">DETAIL ></span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;

const NAV_TITLE = {
  PRODUCT: [
    "NEW ARRIVAL",
    "R BAG",
    "R EYE",
    "R TRUNK",
    "ACCESSORY",
    "CLEARANCE",
    "SALE",
  ],
  EXPLORE: ["SERIES", "PROJECT", "NEWS", "STOCKIST", "ABOUT"],
  CENTER: ["Q&A", "FAQ", "LIFETIME WARRANTY", "REVIEW", "RENTAL SERVICE"],
};
