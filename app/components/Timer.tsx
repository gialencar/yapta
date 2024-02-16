import { Roboto_Mono } from 'next/font/google';
import { useEffect, useState } from 'react';
import { useTimerStore } from '../hooks/store';
import { formatTime } from '../ultils/format-time';

const spaceMono = Roboto_Mono({ weight: '700', subsets: ['latin'] });

function Timer() {
  const workDuration = useTimerStore.use.workDuration();
  const shortBreakDuration = useTimerStore.use.shortBreakDuration();
  const longBreakDuration = useTimerStore.use.longBreakDuration();

  const [isRunning, setIsRunning] = useState(false);
  const [sessionLength, setSessionLength] = useState(workDuration * 60);
  const [timeLeft, setTimeLeft] = useState(0.05 * 60);
  // const [sessions] = useState(['work', 'shortBreak', 'longBreak']);
  const [sessions, setSessions] = useState(0);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);

  const [audioDom, setAudioDom] = useState<HTMLAudioElement | null>(null);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(sessionLength);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // setIsRunning(false);
      audioDom?.play();

      const nextSessionCount = sessions + 1;
      setSessions(nextSessionCount);

      setTimeLeft(
        nextSessionCount % 7 === 0
          ? longBreakDuration * 60
          : nextSessionCount % 2 === 0
          ? workDuration * 60
          : shortBreakDuration * 60,
      );

      return () => clearInterval(timer);
    }
  }, [
    audioDom,
    isRunning,
    longBreakDuration,
    sessions,
    shortBreakDuration,
    timeLeft,
    workDuration,
  ]);

  return (
    <>
      <div className="flex justify-between gap-x-12">
        <span
          className={`text-nordWhite border rounded-lg border-r-4 px-1 ${
            currentSessionIndex === 0 ? 'border-r-tomato' : 'border-r-nordWhite'
          }`}
        >
          Pomodoro
        </span>
        <span
          className={`text-nordWhite border rounded-lg border-r-4 px-1 ${
            currentSessionIndex === 1 ? 'border-r-blue-400' : 'border-r-nordWhite'
          }`}
        >
          Short Break
        </span>
        <span
          className={`text-nordWhite border rounded-lg border-r-4 px-1 ${
            currentSessionIndex === 2 ? 'border-r-teal-600' : 'border-r-nordWhite'
          }`}
        >
          Long Break
        </span>
      </div>
      <div className="flex justify-between gap-x-24">
        <span className="text-nordWhite flex-1 text-right">{`${workDuration}:00`}</span>
        <span className="text-nordWhite flex-1 text-center">{`${shortBreakDuration}:00`}</span>
        <span className="text-nordWhite flex-1 text-left">{`${longBreakDuration}:00`}</span>
      </div>

      <div className="flex flex-col">
        <div className="bg-white/20 rounded-b-none p-12 rounded-2xl shadow-glass backdrop-blur-sm border-[1px] border-white/30">
          <span className={`text-8xl font-black text-nordWhite ${spaceMono.className}`}>
            {formatTime(timeLeft)}
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
        <audio ref={(element) => setAudioDom(element)} src="/flute-notification.wav"></audio>
      </div>
    </>
  );
}

export default Timer;
