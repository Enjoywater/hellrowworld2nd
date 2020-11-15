import React from "react";

class ProductNavList extends React.Component {
  render() {
    const { content, nameChange, index, checkTitle } = this.props;
    const isOrange = content === "CLEARANCE" || content === "SALE";

    return (
      <li
        className={checkTitle === content ? "productNav lineOn" : "productNav"}
        key={content}
        index={index}
        onClick={() => nameChange(content)}
      >
        <span className={isOrange ? "colorOrange" : ""}>{content}</span>
      </li>
    );
  }
}

export default ProductNavList;
