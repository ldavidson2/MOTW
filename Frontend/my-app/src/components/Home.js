import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const Home = () => {
    const [monsters, setMonsters] = useState([]);

    useEffect(() => {
        getMonsters();
      }, []);
    
      /**
       * This function fetches all monster data.
       */
      async function getMonsters() {
        try {
          const response = await axios.get(`/monsters/all`);
          console.log(response.data.Items);
          setMonsters(response.data.Items)
        } catch (error) {
          console.error(error);
        }
      }

  return (
    <div>
        <h1>Almanac</h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Size</th>
                    <th>Toughness</th>
                    <th>Intelligence</th>
                    <th>Risk Factor</th>
                    <th>Special Abilities</th>
                </tr>
            </thead>
            <tbody>
                {monsters && monsters.map((monster) => {
                  return (
                    <tr key={monster.Name}>
                      <td>
                        <Link to="/Monster" state={{ PK: monster.PK }}>
                          {monster.Name}
                        </Link></td>
                      <td>{monster.Class}</td>
                      <td>{monster.Size}</td>
                      <td>{monster.Toughness}</td>
                      <td>{monster.Intelligence}</td>
                      <td>{monster.RiskFactor}</td>
                      <td>{monster.SpecialAbilities}</td>
                    </tr>
                  );
                })}
              </tbody>
        </table>
    </div>
  );
};

export default Home;
