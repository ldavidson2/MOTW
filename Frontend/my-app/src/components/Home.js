import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {



  return (
    <div>
        <h1>Almanac</h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Toughness</th>
                    <th>Intelligence</th>
                    <th>Risk Factor</th>
                    <th>Special Abilities</th>
                </tr>
            </thead>
        </table>
    </div>
  );
};

export default Home;
