import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import "./Monster.css";
import Imp from "./Imp.png";

const Monster = () => {
  const [monster, setMonster] = useState(['grr']);
  // const [monsterImage, setMonsterImage] = useState([]);
  //   const loc = useLocation();
  //   // let pk = loc.state.PK;

  //   useEffect(() => {
  //       getMonster();
  //     }, []);
    
      /**
       * This function fetches all monster data.
       */
      // async function getMonster() {
      //   try {
      //     const response = await axios.get(`/monsters/{pk}`);
      //     console.log(response.data.Items);
      //     setMonster(response.data.Items);
      //   } catch (error) {
      //     console.error(error);
      //   }
      //   try {
      //     const response = await axios.get(`/monsterImage/{pk}`);
      //     console.log(response.data);
      //     setMonsterImage(response.data);
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }

  return (
    <div>
        <h1>Imp{monster.Name}</h1>
        <div id="container">
          <div id="imageContainer">
            <img src={Imp} alt="testImage" />
          </div>
          <table>
            <tbody>
              <tr>
              <td>Class:</td>
              <td> 1{monster.Class}</td>
              </tr>
              <tr>
              <td>Size:</td>
              <td> 1{monster.Size}</td>
              </tr>
              <tr>
              <td>Toughness:</td>
              <td> 1{monster.Toughness}</td>
              </tr>
              <tr>
              <td>Intelligence:</td>
              <td> 1{monster.Intelligence}</td>
              </tr>
              <tr>
              <td>Risk Factor:</td>
              <td> 1{monster.RiskFactor}</td>
              </tr>
              <tr>
              <td>Special Abilities:</td>
              <td> 1{monster.SpecialAbilities}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div id="notes">
            <h2>Notes</h2>
            <p></p>
          </div>
        </div>
    </div>
  );
};

export default Monster;
