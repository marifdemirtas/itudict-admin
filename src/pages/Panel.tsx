import React from "react";
import styled from "styled-components";
import UserTable from "../components/UserTable";
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

const StyledHeader = styled.header`
  position: absolute;
  top: 20px;
`;

const Panel = (): JSX.Element => {
  const navigate = useNavigate();
  const routeLogin = () => {
    navigate("/login");
  };
  return (
    <StyledContainer>
      <StyledHeader>ITU Dict Admin Panel</StyledHeader>
      <UserTable />
    </StyledContainer>
  );
};

export default Panel;
