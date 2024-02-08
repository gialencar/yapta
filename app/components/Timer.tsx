import { Roboto_Mono } from 'next/font/google';
import { useState, useRef, useEffect } from 'react';

const spaceMono = Roboto_Mono({ weight: '700', subsets: ['latin'] });

function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [sessionLength, setSessionLength] = useState(25 * 60);
  const [shortBreakLength, setShortBreakLength] = useState(5 * 60);
  const [time, setTime] = useState(sessionLength);
  let minutesRef = useRef<HTMLSpanElement>(null);
  let secondsRef = useRef<HTMLSpanElement>(null);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    pauseTimer();
    setTime(sessionLength);
  };

  useEffect(() => {
    if (time <= 0) {
      pauseTimer();
      setSessionLength(shortBreakLength);
    }

    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    minutes = minutes < 10 ? 0 + minutes : minutes;
    seconds = seconds < 10 ? 0 + seconds : seconds;

    if (minutesRef?.current && secondsRef?.current) {
      minutesRef.current.textContent = `${minutes}`.padStart(2, '0');
      secondsRef.current.textContent = `${seconds}`.padStart(2, '0');
    }
    if (isRunning) {
      const pomodoro = setInterval(() => {
        console.log('tick');
        setTime((time) => time - 1);
      }, 1000);
      return () => clearInterval(pomodoro);
    }
  }, [isRunning, time, shortBreakLength, sessionLength]);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-nord-bg bg-center bg-cover bg-no-repeat">
      <div className="flex justify-between gap-x-12">
        <span className="text-nordWhite">Pomodoro</span>
        <span className="text-nordWhite">Short Break</span>
        <span className="text-nordWhite">Long Break</span>
      </div>
      <div className="flex justify-between gap-x-24">
        <span className="text-nordWhite">25:00</span>
        <span className="text-nordWhite">05:00</span>
        <span className="text-nordWhite">15:00</span>
      </div>

      <div className="flex flex-col">
        <div className="bg-white/20 rounded-b-none p-12 rounded-2xl shadow-glass backdrop-blur-sm border-[1px] border-white/30">
          <span className="text-8xl font-black text-nordWhite">
            <span className={spaceMono.className} ref={minutesRef}>
              25
            </span>
            <span>:</span>
            <span className={spaceMono.className} ref={secondsRef}>
              00
            </span>
          </span>
        </div>

        <div className="flex">
          <button
            className="bg-white/20 px-4 py-2 rounded-2xl rounded-t-none shadow-glass backdrop-blur-sm border-[1px] border-white/30 flex-1 rounded-br-none hover:bg-white/30 hover:border-white/50 text-nordWhite font-semibold"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            className="bg-white/20 px-4 py-2 rounded-2xl rounded-t-none shadow-glass backdrop-blur-sm border-[1px] border-white/30 flex-1 rounded-bl-none hover:bg-white/30 hover:border-white/50 text-nordWhite font-semibold"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}

export default Timer;
