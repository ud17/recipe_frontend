import Category from "../components/Category";
import Search from "../components/Search";
import Latest from "../components/Latest";
import Popular from "../components/Popular";
import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
  const logOut = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.clear();
    setisLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
        {isLoggedIn ? ( <Button onClick={logOut}>Logout</Button> ) : <></>}
        <Search />
        <Category />
        <Latest />
        <Popular />
    </div>
  )
}


const Button = styled.button`
  background-color: red;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
  &:enabled {
    opacity: 1.0;
  }
  opacity: ${props => !props.enabled ? 0.5 : 1};
  margin-left: 900px;
`;

export default Home