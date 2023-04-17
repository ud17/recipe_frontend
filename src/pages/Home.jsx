import Latest from "../components/Latest";
import Popular from "../components/Popular";

import React from 'react';

function Home() {
  localStorage.setItem("userId", "");
  localStorage.setItem("role", "");
  return (
    <div>
        <Latest />
        <Popular />
    </div>
  )
}

export default Home