import React from "react";
import "./404page.css";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return ( 
    <><div className="w-screen h-screen bg-white">

     <div class="container">
      <div class="gif">
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      <div class="content">
        <h1 class="main-heading" > ERROR 404 - This page is gone.</h1>
        <p>
          ...maybe the page you're looking for is not found or never existed.
        </p>
        <a href="/home" target="blank">

          <button class='button'>Back to home <i class="far fa-hand-point-right"></i></button>
        </a>
      </div>
    </div>
    </div>
    </>
  );
};

export default PageNotFound;
