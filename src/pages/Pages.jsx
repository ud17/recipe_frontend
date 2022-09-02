import React from "react";
import Home from "./Home";
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import { Route, Routes } from "react-router-dom";

function Pages() {
  return (
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/cuisine/:type" element={<Cuisine/>}/>
        <Route exact path="/searched/:search" element={<Searched />}/>
    </Routes>
  )
}

export default Pages;