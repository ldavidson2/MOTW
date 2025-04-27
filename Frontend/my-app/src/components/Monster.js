import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import Navigation from "./Navigation.js";
import "./Home.css";
import "./Monster.css";
import Imp from "./Imp.png";

const Monster = () => {
  const [monster, setMonster] = useState([]);
  const [monsterImage, setMonsterImage] = useState([]);
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
          const response = await axios.get(`/monsters/${pk}`);
          setMonster(response.data.Items[0]);
        } catch (error) {
          console.error(error);
        }
        try {
          const response = await axios.get(`/monsterImage/${pk}`);
          setMonsterImage(response.data);
        } catch (error) {
          console.error(error);
        }
      }

  return (
    <div>
        <Navigation />
        <div id="container">
          <div id="imageContainer">
            {/* <img src={Imp} alt="testImage" /> */}
            <img src={monsterImage} alt="testImage" />
          </div>
          <table>
            <thead>
              <tr>
                <th colSpan="6">{monster.Name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td className="labels">Class:</td>
              <td className="labels">Size:</td>
              <td className="labels">Toughness:</td>
              <td className="labels">Intelligence:</td>
              <td className="labels">Risk Factor:</td>
              <td className="labels">Ability Rating:</td>
              </tr>
              <tr id="stats">
              <td>{monster.MonsterClass}</td>
              <td>{monster.Size}</td>
              <td>{monster.Toughness}</td>
              <td>{monster.Intelligence}</td>
              <td>{monster.RiskFactor}</td>
              <td>{monster.SpecialAbilityRating}</td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr className="specialAbilities">
                <td colSpan="6" className="labels">Special Abilities:</td>
              </tr>
              <tr className="specialAbilities">
                <td colSpan="6" className="text">{monster.SpecialAbilities}</td>
              </tr>
              <tr className="notes">
                <td colSpan="6" className="labels">Notes:</td>
              </tr>
              <tr className="notes">
                <td colSpan="6" className="text">{monster.Notes}</td>
              </tr>
            </tbody>
          </table>

          
          {/* <table>
            <thead>
              <tr>
                <th colSpan="6">Imp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td className="labels">Class:</td>
              <td className="labels">Size:</td>
              <td className="labels">Toughness:</td>
              <td className="labels">Intelligence:</td>
              <td className="labels">Risk Factor:</td>
              <td className="labels">Ability Rating:</td>
              </tr>
              <tr id="stats">
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>2</td>
              <td>2</td>
              <td>1</td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr className="specialAbilities">
                <td colSpan="6" className="labels">Special Abilities:</td>
              </tr>
              <tr className="specialAbilities">
                <td colSpan="6" className="text">Imps are losers who possess no special abilities of any kind. I mean, they can fly so I guess that. But birds can also fly and they're dumb so you tell me.</td>
              </tr>
              <tr className="notes">
                <td colSpan="6" className="labels">Notes:</td>
              </tr>
              <tr className="notes">
                <td colSpan="6" className="text">Losers. Small and mischevious. There's really not much else to say about them.</td>
              </tr>
            </tbody>
          </table> */}
        </div>
    </div>
  );
};

export default Monster;
