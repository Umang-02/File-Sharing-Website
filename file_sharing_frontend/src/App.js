import React from 'react'
import Navbar from "../src/components/navbar";
import Homepage from "../src/components/homepage";
import Sharingpage from "../src/components/sharingpage";
import {Route,Routes} from "react-router-dom";
const App = () => {
  return( 
    <>
      <Navbar />;
      <div className="container">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/startsharing" element={<Sharingpage />} />
      </Routes>
      </div>
    </>
  )
};

export default App
