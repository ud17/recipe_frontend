import Category from "../components/Category";
import Search from "../components/Search";
import Latest from "../components/Latest";
import Popular from "../components/Popular";
import React from 'react';

function Home() {
  return (
    <div>
        <Search />
        <Category />
        <Latest />
        <Popular />
    </div>
  )
}

export default Home