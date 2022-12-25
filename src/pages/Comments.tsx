import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CommentTable from "../components/CommentTable";
import Navbar from "../components/Navbar";

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

const StyledHeaders = styled.div`
  dipslay: flex;
  flex-direction: column;
`;

const Comments = (): JSX.Element => {
  const navigate = useNavigate();
  const routeLogin = () => {
    navigate("/login");
  };
  return (
    <StyledContainer>
      <Navbar />
      <StyledHeaders>
        <p>ITU Dict Admin Panel</p>
        <p>Comment Table</p>
      </StyledHeaders>
      <CommentTable />
    </StyledContainer>
  );
};

export default Comments;
