import React, { useState } from "react";
import "./App.css";
import ResidentsList from "./Components/ResidentsList";
import Search from "./Components/Search";
import Error from "./Components/Error";
import "h8k-components";

const title = "Hacker Dormitory";
function App() {

  const [error, setError] = useState("");
  const [resident, setResident] = useState([]);

  const submitHandler = (data) => {
      if(data.type === 'error') {
        setError(data.data);
      } else {
        setResident((prevState) => {
          return [...prevState, data.data]
        })
      }
  }

  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center align-items-center w-50 mx-auto">
        <Search onSubmitBack = {submitHandler}/>
        { error && <Error message = {error} /> }
        <ResidentsList resident = {resident}/>
      </div>
    </div>
  );
}

export default App;
