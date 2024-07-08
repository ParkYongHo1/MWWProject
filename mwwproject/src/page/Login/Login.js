import React from "react";
import Wrapper from "./css/Wrapper";
import ButtonBox from "./css/ButtonBox";
import Title from "./css/Title";
import { Button, ButtonText } from "./css/Button";
import axios from "axios";
import { KAKAO_AUTH_URL } from "../../OAuth/OAuth";

function Login() {
  const handleSubmit = async () => {
    try {
      const res = await axios.get("/auth/google");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Title>로그인</Title>
      <ButtonBox>
        <Button to={`${KAKAO_AUTH_URL}`} bgColor="#FEE500" bdColor="#FEE500">
          <ButtonText>
            <img
              src={process.env.PUBLIC_URL + "/logo_kakao.png"}
              width="30px"
              alt="kakao logo"
            />
          </ButtonText>
          <ButtonText>카카오로 로그인하기</ButtonText>
        </Button>
        <Button bgColor="#03C75A" bdColor="#03C75A">
          <ButtonText>
            <img
              src={process.env.PUBLIC_URL + "/logo_naver.png"}
              width="30px"
              alt="naver logo"
            />
          </ButtonText>
          <ButtonText>네이버로 로그인하기</ButtonText>
        </Button>
        <Button bgColor="#FFFFFF" bdColor="lightgray">
          <ButtonText>
            <img
              src={process.env.PUBLIC_URL + "/logo_google.png"}
              width="30px"
            />
          </ButtonText>
          <ButtonText>Google로 로그인하기</ButtonText>
        </Button>
      </ButtonBox>
    </Wrapper>
  );
}

export default Login;
