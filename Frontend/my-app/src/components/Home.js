import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navigation from "./Navigation.js";
import axios from "axios";
import "./Home.css";

const Home = () => {
    const [monsters, setMonsters] = useState([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        getMonsters();
      }, []);
    
      /**
       * This function fetches all monster data.
       */
      async function getMonsters() {
        try {
          const response = await axios.get(`/monsters/all`);
          setMonsters(response.data.Items)
        } catch (error) {
          console.error(error);
        }
      }

  /**
   * This function searches for patients based on a search query and returns the filtered results or
   * all patients if the search query is empty.
   * @param search - The search parameter is a string that represents the search query entered by the
   * user to search for patients.
   */
  async function searchMonster(search) {
    if (search !== "") {
      try {
        const filteredMonsters = await axios.get(`/searchMonsters/${search}`, {});
        setMonsters(filteredMonsters.data);
      } catch (e) {
      }
    } else if (search === "") {
      const monsterResponse = await axios.get(`/monsters/all`);
      setMonsters(monsterResponse.data.Items);
    }
  }

  /**
   * The function updates a search keyword and returns it.
   * @param search - The parameter "search" is a variable that represents the keyword or phrase that
   * the user is searching for. The function "updateSearch" takes this parameter and sets it as the
   * state variable "keyword" using the "setKeyword" function. Finally, the function returns the search
   * parameter.
   * @returns the `search` parameter that was passed to it.
   */
  function updateSearch(search) {
    setKeyword(search);
    return search;
  }

  /**
   * The SearchBar function returns a search bar component with an input field and a search button that
   * triggers a search function.
   * @returns A React component called SearchBar.
   */
  function SearchBar() {
    async function onChange(e) {
      let done = await updateSearch(e.target.value);
      searchMonster(e.target.value);
    }
    const pressEnter = (e) => {
      if (e.key === "Enter") {
        document.getElementById("searchButton").click();
      }
    };
    
    return (
      <div id="search">
        <div>
          <input
            key="search-bar"
            id = "searchBar"
            value={keyword}
            placeholder={"Search Monsters"}
            onChange={onChange}
            onKeyDown={pressEnter}
          />
        </div>
        <button
          id="searchButton"
          onClick={() => {
            searchMonster(keyword);
          }}
          onKeyDown={pressEnter}
        >
         Search
        </button>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className="container">   
        <h1>Monsters</h1>
        <div id="bar">   
          {SearchBar()}
        </div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Size</th>
                    <th>Toughness</th>
                    <th>Intelligence</th>
                    <th>Risk Factor</th>
                    <th>Ability Rating</th>
                </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td>
                  <Link to="/Monster" state={{ PK: 1 }}>
                    Gremlin
                  </Link></td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
                <td>3</td>
                <td>3</td>
                <td>2</td>
              </tr>
              <tr>
                <td>
                  <Link to="/Monster" state={{ PK: 2 }}>
                    Imp
                  </Link></td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>2</td>
                <td>1</td>
              </tr>
              <tr>
                <td>
                  <Link to="/Monster" state={{ PK: 3 }}>
                    Shifter
                  </Link></td>
                <td>3</td>
                <td>3</td>
                <td>3</td>
                <td>3</td>
                <td>2</td>
                <td>4</td>
              </tr>
              <tr>
                <td>
                  <Link to="/Monster" state={{ PK: 1 }}>
                    Gremlin
                  </Link></td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
                <td>3</td>
                <td>3</td>
                <td>2</td>
              </tr>
              <tr>
                <td>
                  <Link to="/Monster" state={{ PK: 2 }}>
                    Imp
                  </Link></td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>2</td>
                <td>1</td>
              </tr>
              <tr>
                <td>
                  <Link to="/Monster" state={{ PK: 3 }}>
                    Shifter
                  </Link></td>
                <td>3</td>
                <td>3</td>
                <td>3</td>
                <td>3</td>
                <td>2</td>
                <td>4</td>
              </tr>
              <tr>
                <td>
                  <Link to="/Monster" state={{ PK: 1 }}>
                    Gremlin
                  </Link></td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
                <td>3</td>
                <td>3</td>
                <td>2</td>
              </tr>
              <tr>
                <td>
                  <Link to="/Monster" state={{ PK: 2 }}>
                    Imp
                  </Link></td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>2</td>
                <td>1</td>
              </tr>
              <tr>
                <td>
                  <Link to="/Monster" state={{ PK: 3 }}>
                    Shifter
                  </Link></td>
                <td>3</td>
                <td>3</td>
                <td>3</td>
                <td>3</td>
                <td>2</td>
                <td>4</td>
              </tr> */}
                {monsters && monsters.map((monster) => {
                  return (
                    <tr key={monster.Name}>
                      <td>
                        <Link to="/Monster" state={{ PK: monster.PK }}>
                          {monster.Name}
                        </Link></td>
                      <td>{monster.MonsterClass}</td>
                      <td>{monster.Size}</td>
                      <td>{monster.Toughness}</td>
                      <td>{monster.Intelligence}</td>
                      <td>{monster.RiskFactor}</td>
                      <td>{monster.SpecialAbilityRating}</td>
                    </tr>
                  );
                })}
              </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
