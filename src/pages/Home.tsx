import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const StyledButton = styled.button`
  margin-bottom: 10px;
`;

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const routeLogin = () => {
    navigate("/login");
  };
  return (
    <StyledContainer>
      <StyledButton onClick={routeLogin}> Press here to Login </StyledButton>
      <header>Welcome to ITU Dict Admin Panel</header>
    </StyledContainer>
  );
};

export default Home;
