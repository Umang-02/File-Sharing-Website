import React from 'react';
import "../components/homepage.css";
import img from "./file-transfer.gif";
import {Link} from "react-router-dom";
const App = () => {
    return(
        <>
        <div className="left-right">
            <div className="left">
                <h1>
                    Lightning-fast
                    data <span>transfers</span>
                </h1>
                <p>Share files of any size, whenever you need it.</p>
                <Link to="/startsharing"><button class="getstartedbutton" role="button">Get Started &rarr;</button></Link>
            </div>
            <div className="right">
                <img src={img}/>
            </div>
        </div>
        </>
    )
  };
  
  export default App
