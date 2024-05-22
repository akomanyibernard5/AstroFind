import React from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Main from "./Components/Main/Main";
import "./index.css";

const App = () => {
  const [mode, setMode] = React.useState(true);
  const [signed, setSigned] = React.useState(true);
  const [signInData, setSignInData] = React.useState({
    fullname: "",
    email: "",
    password1: "",
    password2: ""
  });
  const [wrong, setWrong] = React.useState(false);
  const [empty1, setEmpty1] = React.useState(false);
  const [empty2, setEmpty2] = React.useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const { email, fullname, password1, password2 } = signInData;
  
    // Reset error states
    setWrong(false);
    setEmpty1(false);
    setEmpty2(false);

    if (password1 !== password2) {
      setWrong(true);
    } else if (email === "") {
      setEmpty1(true);
    } else if (fullname === "") {
      setEmpty2(true);
    } else {
      setSigned(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setSignInData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Clear previous error messages when input changes
    setWrong(false);
    setEmpty1(false);
    setEmpty2(false);
  }

  function toggleMode() {
    setMode(prevMode => !prevMode);
  }

  return signed ? (
    <div className="page">
      <div className="signin-page">
        <h1 className="text">Create Account</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            value={signInData.fullname}
            placeholder="Full Name"
            className="fullname"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={signInData.email}
            placeholder="Email Address"
            className="email"
            onChange={handleChange}
          />
          <input
            type="password"
            value={signInData.password1}
            placeholder="Enter password"
            name="password1"
            className="password1"
            onChange={handleChange}
          />
          <input
            type="password"
            value={signInData.password2}
            placeholder="Confirm password"
            name="password2"
            className="password2"
            onChange={handleChange}
          />
          {wrong && <p className="match">Passwords do not match</p>}
          {empty1 && <p className="match">Email field cannot be empty</p>}
          {empty2 && <p className="match">Name field cannot be empty</p>}
          <button type="submit" className="submit">Submit</button>
        </form>
      </div>
    </div>
  ) : (
    <>
      <Sidebar 
      mode={mode} toggleMode={toggleMode} />
      <Main signInData={signInData.fullname} mode={mode} />
    </>
  );
};

export default App;
