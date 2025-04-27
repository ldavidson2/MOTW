import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Navigation.css";

const Navigation = () => {


  return (
    <div id="navBar">
        <Link to="/Home">Home</Link>
        <Link to="/NewMonster">Add Monster</Link>
    </div>
  );
};

export default Navigation;
