import React from "react";
import "./404page.css";
const PageNotFound = () => {
  return ( 
    <><div className="w-screen h-screen bg-white">

     <div className="container">
      <div className="gif">
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      <div className="content">
        <h1 className="main-heading" > ERROR 404 - This page is gone.</h1>
        <p>
          ...maybe the page you're looking for is not found or never existed.
        </p>
        <a href="/home" target="blank">

          <button className='button'>Back to home <i className="far fa-hand-point-right"></i></button>
        </a>
      </div>
    </div>
    </div>
    </>
  );
};

export default PageNotFound;
