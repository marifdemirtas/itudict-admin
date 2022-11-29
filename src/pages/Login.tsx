import React from "react";
import styled from "styled-components";
import LoginCard from "../components/LoginCard";

const LoginContainer = styled.div`
  display: flex;
  margin-left: 28%;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  #basic {
    width: 500px;
  }
`;

const Login = (): JSX.Element => {
  return (
    <LoginContainer>
      <LoginCard />
    </LoginContainer>
  );
};

export default Login;
