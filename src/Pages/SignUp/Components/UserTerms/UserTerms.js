import React, { Component } from "react";

class UserTerms extends Component {
  render() {
    const {
      agreeAllToggle,
      agreeAll,
      checkAgree,
      useAgree,
      collectAgree,
      smsAgree,
      mailAgree,
      clickSignUp,
    } = this.props;
    return (
      <section className="sectionRight">
        <div className="termsBox allCheck">
          <label>
            이용약관 및 개인정보수집 및 이용,
            <br />
            쇼핑정보 수신(선택)에 모두 동의합니다.
          </label>
          <span className="agreeAll">
            <input
              onChange={agreeAllToggle}
              name="agreeAll"
              type="checkbox"
              checked={agreeAll ? "true" : "false"}
            />
          </span>
        </div>
        <div className="otherTermBox">
          <span>이용약관 동의 (필수)</span>
          <div className="termsBox">
            <p>
              제1조(목적)이 약관은 로우로우(전자상거래 사업자)가 운영하는
              로우로우 사이버 몰(이하 “몰”이라 한다)에서 제공하는 인터넷 관련
              서비스(이하 “서비스”라 한다)를 이용함에 있어 사이버 몰과 이용자의
              권리?의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </div>
          <div className="agreeCheck">
            <span>이용약관에 동의하십니까?</span>
            <span>
              <label htmlFor="agreeService">동의함</label>
              <input
                onChange={() => checkAgree("useAgree")}
                name="useAgree"
                type="checkbox"
                checked={useAgree ? "true" : "false"}
              />
            </span>
          </div>
        </div>
        <div className="otherTermBox">
          <span>개인정보 수집 및 이용 동의 (필수)</span>
          <div className="termsBox">
            <p>
              '로우로우'은 (이하 '회사'는) 고객님의 개인정보를 중요시하며,
              "정보통신망 이용촉진 및 정보보호"에 관한 법률을 준수하고 있습니다.
            </p>
          </div>
          <div className="agreeCheck">
            <span>개인정보 수집 및 이용에 동의하십니까?</span>
            <span>
              <label htmlFor="agreePrivacy">동의함</label>
              <input
                onChange={() => checkAgree("collectAgree")}
                name="collectAgree"
                type="checkbox"
                checked={collectAgree ? "true" : "false"}
              />
            </span>
          </div>
        </div>
        <div className="otherTermBox">
          <span>쇼핑정보 수신 동의 (선택)</span>
          <div className="termsBox">
            <p>
              할인쿠폰 및 혜택, 이벤트, 신상품 소식 등 쇼핑몰에서 제공하는
              유익한 쇼핑정보를 SMS나 이메일로 받아보실 수 있습니다.
            </p>
          </div>
          <div className="agreeCheck">
            <span>SMS 수신을 동의하십니까?</span>
            <span>
              <input
                name="smsAgree"
                type="checkbox"
                onChange={() => checkAgree("smsAgree")}
                checked={smsAgree ? "true" : "false"}
              />
              <label htmlFor="agreeSms">동의함</label>
            </span>
          </div>
          <div className="agreeCheck">
            <span>이메일 수신을 동의하십니까??</span>
            <span>
              <input
                name="mailAgree"
                type="checkbox"
                onChange={() => checkAgree("mailAgree")}
                checked={mailAgree ? "true" : "false"}
              />
              <label htmlFor="agreeEmail">동의함</label>
            </span>
          </div>
        </div>
        <div>
          <button onClick={clickSignUp} className="joinBtn">
            회원가입
          </button>
        </div>
      </section>
    );
  }
}

export default UserTerms;
