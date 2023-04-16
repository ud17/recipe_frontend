import Pages from "./pages/Pages";
import Category from "./components/Category";
import Search from "./components/Search";
import Login from "./pages/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi"
import Signup from "./pages/Signup";
import { useState } from "react";
import Home from "./pages/Home";
import Cuisine from "./pages/Cuisine";
import Searched from "./pages/Searched";
import Recipe from "./pages/Recipe";
import Protected from "./utils/Protected";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(null);
    const logIn = () => {
      setisLoggedIn(true);
    };
    const logOut = () => {
      setisLoggedIn(false);
    };

  return (
    <div className="App">
      <BrowserRouter>
        <Nav>
          <GiKnifeFork />
          <Logo to={"/"}>recipeee</Logo>
        </Nav>
        
      <Routes>
          <Route exact path="/" element={<Protected isLoggedIn={isLoggedIn}><Home /></Protected>}/>
          <Route exact path="/cuisine/:type" element={<Protected isLoggedIn={isLoggedIn}>
            <Cuisine />
          </Protected>}/>
          <Route exact path="/searched/:search" element={<Protected isLoggedIn={isLoggedIn}>
            <Searched />
          </Protected>}/>
          <Route exact path="/recipe/:recipeId" element={<Protected isLoggedIn={isLoggedIn}>
            <Recipe />
          </Protected>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
  padding: 0rem 0.5rem;
`;

const Nav = styled.div`
  padding: 2rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg {
    font-size: 2rem;
  }
`;

export default App;
