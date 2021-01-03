import React, {Component, useEffect, useRef, useState} from "react";
import '../styles/App.css';

const App = () => {
  const [Time, setTime] = useState("25");
  const [Minute, setMinute] = useState(25);
  const [Seconds, setSeconds] = useState(5);
  const [Break,setBreak] = useState(5);
  const [Work,setWork] = useState(25);
  const [started,setStarted] = useState(false);
  const [Reset,setReset] = useState(true);
  let [timer,setTimer] = useState("");
  //const timer = useRef(null);//refer to the initial state and is access to every other rerenders;
  const startHandler =(evt) => {

    setStarted(!started);
    setReset(false);
    Timer1();
  }
  const Timer1 = () => {
    timer = setInterval(()=>setTimer1(),1000);
    //setTimer(setInterval(()=>setTimer1(),1000));//other way of doing it if timer state is const
    //timer.current = setInterval(()=>setTimer(),1000);//if you are using useref;
    setTimer(timer);
  }
  let numSeconds = Seconds;
  let numMinutes = Minute;
  const setTimer1 = () =>{
    //  numSeconds = Seconds;
    //  numMinutes = Minute;
    if(Number(numSeconds) === 0 && Number(numMinutes) === 0){
      alert("work duration is over");
      clearInterval(timer);
      setMinute(Break);
      setSeconds(0);
      numMinutes = Break;
      numSeconds = 0;
      setTimer2();
      return;
    }
    if(numSeconds === 0){
      console.log("hello");
      setMinute(numMinutes - 1);
      numMinutes -= 1;
      numSeconds = 60;
    }
    setSeconds(numSeconds-1);
    numSeconds = numSeconds-1;  
    if(Number(numSeconds) === 0 && Number(numMinutes) === 0){
      alert("work duration is over");
      clearInterval(timer);
      setMinute(Break);
      setSeconds(0);
      numMinutes = Break;
      numSeconds = 0;
      setTimer2();
      return;
    }
  }
  const setTimer2 = () =>{
    timer = setInterval(()=>Timer2(),1000);
    setTimer(timer);
  }
  const Timer2 =()=>{
    // numSeconds = Seconds;
    //  numMinutes = Minute;
    if(numSeconds === 0 && numMinutes === 0){
      alert("break duration is over");
      clearInterval(timer);
      setMinute(Work);
      setSeconds(0);
      numMinutes = Work;
      numSeconds = 0;
      Timer1();
      return;
    }
    if(numSeconds === 0){
      setMinute(numMinutes - 1);
      numMinutes -= 1;
      numSeconds = 60;
    }
    setSeconds(numSeconds-1);
    numSeconds = numSeconds-1; 
    if(numSeconds === 0 && numMinutes === 0){
      alert("break duration is over");
      clearInterval(timer);
      setMinute(Work);
      setSeconds(0);
      numMinutes = Work;
      numSeconds = 0;
      Timer1();
      return;
    }
  }
  const stopHandler = () => {
    // clearInterval(timer.current);
    setStarted(!started);
    clearInterval(timer);

  }
  const setHandler =(evt)=>{
    evt.preventDefault();
    if(Number(Work) === 0  && Number(Break) === 0){
      setWork(25);
      setBreak(5);
     
    }
    else{
    setWork(Work);
    setBreak(Break);
    setMinute(Work);
    setSeconds(0);}
    
  }
  const reset =() =>{
    clearInterval(timer);
    setTimer("");
    setStarted(false);
    setMinute(25);
    setSeconds(0);
    setWork(25);
    setBreak(5);


  }
  const changeWork =(evt)=>{
    evt.preventDefault();
    if(Number(evt.target.value) < 0){
      setWork("");
    }else{
      setWork(evt.target.value);
    }
  }
  const changeBreak =(evt)=>{
    evt.preventDefault();
    if(Number(evt.target.value) < 0){
      setBreak("");
    }else{
      setBreak(evt.target.value);
    }
  }
  return (
    <div id="main">
      
      <h1>{Minute<10?"0"+Minute:Minute}:{Seconds<10?"0"+Seconds:Seconds}</h1>
      <h1>Work-Time</h1>
      <div className="btn">
        <button data-testid='start-btn' onClick={startHandler} disabled={started?true:false}>start</button>
        <button data-testid='stop-btn' onClick={stopHandler} disabled={started?false:true}>stop</button>
        <button data-testid='reset-btn' onClick={reset} disabled={Reset}> Reset</button>
      </div>
      <form className="btn" onSubmit={setHandler}>
        <input data-testid='work-duration'  type="Number" onChange={changeWork} value={Work} disabled={started?true:false} required></input>
        <input data-testid='break-duration'  type="Number" onChange={changeBreak} value={Break} disabled={started?true:false} required></input>
        <button type="submit" disabled={started?true:false} data-testid='set-btn'>set</button>
      </form>
      
    </div>
  )
}

export default App;
