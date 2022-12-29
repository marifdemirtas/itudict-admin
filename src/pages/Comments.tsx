import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CommentTable from "../components/CommentTable";
import Navbar from "../components/Navbar";
import { Alert } from "antd";

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
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <StyledContainer>
      {visible && (
        <Alert
          message="Comment is deleted"
          type="success"
          showIcon
          style={{ position: "absolute", top: "50px", width: "250px" }}
        />
      )}
      <Navbar />
      <StyledHeaders>
        <p>ITU Dict Admin Panel</p>
        <p>Comment Table</p>
      </StyledHeaders>
      <CommentTable setVisible={setVisible} />
    </StyledContainer>
  );
};

export default Comments;
