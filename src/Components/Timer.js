import React, { useState, useEffect } from "react";

const Timer = (props) => {
  const hours = 0;
  const minutes = props.duration;
  const seconds = 0;
    const [paused, setPaused] = useState(false);
    const [over, setOver] = useState(false);
    const [[h, m, s], setTime] = useState([hours, minutes, seconds]);
  
    const beep = () => {
      var snd = new Audio("https://assets.coderrocketfuel.com/pomodoro-times-up.mp3");  
      snd.play();
  }

    const tick = () => {
      if (paused || over) return;
      if (h === 0 && m === 0 && s === 0){
        setOver(true);
        if(setOver == true){beep()}
      } 
        else if (m === 0 && s === 0) {
        setTime([h - 1, 59, 59]);
      } else if (s == 0) {
        setTime([h, m - 1, 59]);
      } else {
        setTime([h, m, s - 1]);
      }
    };
  
    const reset = () => {
      setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);
      setPaused(false);
      setOver(false);
    };
  
    useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
      if(over == true) beep();
      return () => clearInterval(timerID);
    });
  
    return (
      <div>
        <p>{`${h.toString().padStart(2, '0')}:${m
          .toString()
          .padStart(2, '0')}:${s.toString().padStart(2, '0')}`}</p>
        <div>{over ? "Time's up!"  : ''}</div>
        <button onClick={() => setPaused(!paused)}>
          {paused ? 'Resume' : 'Pause'}
        </button>
        <button onClick={() => reset()}>Restart</button>
      </div>
    );
  };

export default Timer;
