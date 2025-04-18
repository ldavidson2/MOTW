import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const Monster = () => {
    const [monster, setMonster] = useState([]);
    const loc = useLocation();
    let pk = loc.state.PK;

    useEffect(() => {
        getMonster();
      }, []);
    
      /**
       * This function fetches all monster data.
       */
      async function getMonster() {
        try {
          const response = await axios.get(`/monsters/all`);
          console.log(response.data.Items);
          setMonster(response.data.Items)
        } catch (error) {
          console.error(error);
        }
      }

  return (
    <div>
        <h1>{pk}</h1>
    </div>
  );
};

export default Monster;
