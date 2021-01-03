import React, { Component, useEffect, useRef, useState } from "react";
import "../styles/App.css";
const App = () => {
  const [Minute, setMinute] = useState(25);
  const [Seconds, setSeconds] = useState(0);
  const [Break, setBreak] = useState(5);
  const [Work, setWork] = useState(25);
  const [started, setStarted] = useState(false);
  const [Reset, setReset] = useState(true);
  const [change, setChange] = useState(true);
  const [toggle,setToggle] = useState(1);
  // const timer = useRef(null);
  const startHandler = (evt) => {
    evt.preventDefault();
    setStarted(true);
    setReset(false);
  };
  const stopHandler = (evt) => {
    evt.preventDefault();
    setStarted(false);
  };
  const resetHandler = (evt) => {
    evt.preventDefault();
    setStarted(false);
    setSeconds(0);
    setMinute(25);
    setBreak(5);
    setWork(25);
  };
  const WorkHandler = (evt) => {
    evt.preventDefault();
    setWork(evt.target.value);
    if (Number(evt.target.value) < 0) {
      setWork("");
    }
  };
  const BreakHandler = (evt) => {
    evt.preventDefault();
    setBreak(evt.target.value);
    if (Number(evt.target.value) < 0) {
      setBreak("");
    }
  };
  const submitHandler =(evt) => {
    evt.preventDefault();
    setReset(false);
    setToggle(1);
    if(Number(Break) === 0 && Number(Work) === 0){
      setWork(25);
      setBreak(5);
    }else{
      setMinute(Work);
      setSeconds(0);
    }
  }
  const toggler = () =>{
    if(Number(toggle) === 1){
      // alert("Work is Done");
      setToggle(0);
      setMinute(Break);
      setSeconds(0)
    }else{
      // alert("Break is Done");
      setToggle(1);
      setMinute(Work);
      setSeconds(0)
    }
  }
  const WorKtimer = () => {
    if((Number(Seconds)-1) === 0 && (Number(Minute)) === 0){
      setSeconds(0);
      setMinute(0);
      // toggler();
    }
    else if (Number(Seconds) == 0) {
      setSeconds(59);
      setMinute(Minute - 1);
    } else {
      setSeconds(Seconds - 1);
    }
    
  };

  useEffect(() => {

    let timer;

    if (started) {
      if(Number(Seconds)===0 && Number(Minute)===0){
        
        if(Number(toggle) ===1 ){
          alert("Work is Done");
        }else{
          alert("Break is Done");
        }
        toggler();
      }
      timer = setInterval(() => {
        WorKtimer();
      }, 1000);
    
    }
    return () => {
      clearInterval(timer);
    };
  }, [started, Minute, Seconds]);

  return (
    <div id="main">
      <h1>
        {Minute < 10 ? "0" + Minute : Minute}:
        {Seconds < 10 ? "0" + Seconds : Seconds}
      </h1>
      {toggle? <h1>Work-Time</h1> : <h1>Break-Time</h1>}
      <div className="btn">
        <button
          data-testid="start-btn"
          onClick={startHandler}
          disabled={started ? true : false}
        >
          start
        </button>
        <button
          data-testid="stop-btn"
          onClick={stopHandler}
          disabled={started ? false : true}
        >
          stop
        </button>
        <button data-testid="reset-btn" onClick={resetHandler} disabled={Reset}>
          Reset
        </button>
      </div>
      <form className="btn" onSubmit={submitHandler}>
        <input
          onChange={WorkHandler}
          data-testid="work-duration"
          type="Number"
          value={Work}
          disabled={started ? true : false}
          required
        ></input>

        <input
          onChange={BreakHandler}
          data-testid="break-duration"
          type="Number"
          value={Break}
          disabled={started ? true : false}
          required
        ></input>

        <button
          type="submit"
          disabled={started ? true : false}
          data-testid="set-btn"
        >
          set
        </button>
      </form>
    </div>
  );
};

export default App;
