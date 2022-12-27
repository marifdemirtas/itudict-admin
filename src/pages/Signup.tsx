import React from "react";
import styled from "styled-components";
import SignupCard from "../components/SignupCard";

const SignupContainer = styled.div`
  display: flex;
  margin-left: 28%;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  #basic {
    width: 500px;
  }
`;

const Signup = (): JSX.Element => {
  return (
    <SignupContainer>
      <SignupCard />
    </SignupContainer>
  );
};

export default Signup;
