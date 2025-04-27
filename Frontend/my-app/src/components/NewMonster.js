import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ulid } from "ulid";
import dompurify from "dompurify";
import Navigation from "./Navigation.js";
import axios from "axios";
import "./Home.css";
import "./NewMonster.css";

const NewMonster = () => {
  const initialFormState = {
    name: "",
    monsterClass: null,
    size: null,
    toughness: null,
    intelligence: null,
    riskFactor: null,
    specialAbilityRating: null,
    specialAbilities: "",
    notes: "",
    formType: "createMonster",
  };

  const [formState, updateFormState] = useState(initialFormState);
  const monsterUlid = ulid();
  const { formType } = formState;
  const [error, setError] = useState();
  let navigate = useNavigate();

  /**
   * The function updates the form state with the new value of the input field when it changes.
   * @param event - The event parameter is an object that represents the event that triggered the
   * function.
   */
  function onChange(event) {
    event.persist();
    console.log(event.target.value);
    updateFormState(() => ({ ...formState, [event.target.name]: event.target.value }));
  }

  /**
   * The function handles the keypress event and triggers a click event on an element with the ID
   * "buttons" when the Enter key is pressed.
   * @param event - The event parameter is an object that represents the event that triggered the
   * function.
   */
  const handleKeypress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("buttons").click();
    }
  };

  async function submitMonster(event) {
    event.preventDefault();
    const {
      name,
      monsterClass,
      size,
      toughness,
      intelligence,
      riskFactor,
      specialAbilityRating,
      specialAbilities,
      notes,
    } = formState;
    /**
     * For statement to delete red input border
     */
    const inputs = document.getElementsByClassName("is-danger");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("is-danger");
    }
    if (!name) {
      document.getElementById("name").classList.add("is-danger");
    } else if (!monsterClass) {
      document.getElementById("monsterClass").classList.add("is-danger");
    } else if (!size) {
      document.getElementById("size").classList.add("is-danger");
    } else if (!toughness) {
      document.getElementById("toughness").classList.add("is-danger");
    } else if (!intelligence) {
      document.getElementById("intelligence").classList.add("is-danger");
    } else if (!riskFactor) {
      document.getElementById("riskFactor").classList.add("is-danger");
    } else if (!specialAbilityRating) {
      document.getElementById("specialAbilityRating").classList.add("is-danger");
    } else {
      const response = await axios.post("/newMonster", {
        PK: monsterUlid,
        name: dompurify.sanitize(name),
        monsterClass: dompurify.sanitize(monsterClass),
        size: dompurify.sanitize(size),
        toughness: dompurify.sanitize(toughness),
        intelligence: dompurify.sanitize(intelligence),
        riskFactor: dompurify.sanitize(riskFactor),
        specialAbilityRating: dompurify.sanitize(specialAbilityRating),
        specialAbilities: dompurify.sanitize(specialAbilities),
        notes: dompurify.sanitize(notes),
      });
      navigate("/Home");
    }
  }

  return (
    <div>
      <Navigation />
      <form onSubmit={submitMonster}>
        {formType === "createMonster" && (
          <div id="form">
            <div id="inputs">
              <div id="left">
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="input"
                    name="name"
                    required
                    onChange={onChange}
                    onKeyDown={handleKeypress}
                  />
                </div>
                <div>
                  <label htmlFor="monsterClass">Class</label>
                  <select 
                    id="monsterClass"
                    className="input"
                    name="monsterClass"
                    required
                    onChange={onChange}
                    onKeyDown={handleKeypress}
                  >
                    <option value="">-</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="size">Size</label>
                  <select
                    id="size"
                    className="input"
                    name="size"
                    required
                    onChange={onChange}
                    onKeyDown={handleKeypress}
                  >
                  <option value="">-</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                </div>
                <div>
                  <label htmlFor="toughness">Toughness</label>
                  <select
                    id="toughness"
                    className="input"
                    name="toughness"
                    required
                    onChange={onChange}
                    onKeyDown={handleKeypress}
                  >
                  <option value="">-</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                </div>
                <div>
                  <label htmlFor="intelligence">Intelligence</label>
                  <select
                    id="intelligence"
                    className="input"
                    name="intelligence"
                    required
                    onChange={onChange}
                    onKeyDown={handleKeypress}
                  >
                  <option value="">-</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                </div>
                <div>
                  <label htmlFor="riskFactor">Risk Factor</label>
                  <select
                    id="riskFactor"
                    className="input"
                    name="riskFactor"
                    required
                    onChange={onChange}
                    onKeyDown={handleKeypress}
                  >
                  <option value="">-</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                </div>
                <div>
                  <label htmlFor="specialAbilityRating">Ability Rating</label>
                  <select
                    id="specialAbilityRating"
                    className="input"
                    name="specialAbilityRating"
                    required
                    onChange={onChange}
                    onKeyDown={handleKeypress}
                  >
                  <option value="">-</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                </div>
              </div>
              <div id="right">
                <div>
                  <label htmlFor="specialAbilities">Special Abilities</label>
                  <textarea
                    id="specialAbilities"
                    className="input"
                    name="specialAbilities"
                    onChange={onChange}
                    onKeyDown={handleKeypress}
                  />
                </div>
                <div>
                  <label htmlFor="notes">Additional Notes</label>
                  <textarea
                    type="text"
                    id="notes"
                    className="input"
                    name="notes"
                    onChange={onChange}
                    onKeyDown={handleKeypress}
                  />
                </div>
              </div>
            </div>
            <div id="button">
              <button id="buttons">Create Monster</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewMonster;
