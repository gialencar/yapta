import { Roboto_Mono } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';
import Countdown, { CountdownApi } from 'react-countdown';
import { useTimerStore } from '../hooks/store';
import { Button } from './Button';
import { renderer } from './CountdownTimer';

const spaceMono = Roboto_Mono({ weight: '700', subsets: ['latin'] });

type SessionType = 'work' | 'shortBreak' | 'longBreak';

export const Timer = () => {
  const workDuration = useTimerStore.use.workDuration();
  const shortBreakDuration = useTimerStore.use.shortBreakDuration();
  const longBreakDuration = useTimerStore.use.longBreakDuration();

  const [isRunning, setIsRunning] = useState(false);
  const [sessionLengthInSeconds, setSessionLengthInSeconds] = useState(
    workDuration * 60
  );
  const [date, setDate] = useState(Date.now() + sessionLengthInSeconds * 1000);
  const [session, setSession] = useState<SessionType>('work');
  const [workSessionsCount, setWorkSessionsCount] = useState(0);

  const countdownApiRef = useRef<CountdownApi | null>(null);

  const switchSession = () => {
    if (session === 'work') {
      const newWorkSessionsCount = workSessionsCount + 1;
      setWorkSessionsCount(newWorkSessionsCount);
      if (newWorkSessionsCount % 4 === 0) {
        setSession('longBreak');
        setSessionLengthInSeconds(longBreakDuration * 60);
      } else {
        setSession('shortBreak');
        setSessionLengthInSeconds(shortBreakDuration * 60);
      }
    } else {
      setSession('work');
      setSessionLengthInSeconds(workDuration * 60);
    }
  };

  const handleStartPause = (): void => {
    countdownApiRef.current &&
      (isRunning
        ? countdownApiRef.current.pause()
        : countdownApiRef.current.start());
    setIsRunning(!isRunning);
  };

  const handleReset = (): void => {
    setIsRunning(false);
    countdownApiRef.current && countdownApiRef.current.stop();
  };

  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      countdownApiRef.current = countdown.getApi();
    }
  };

  useEffect(() => {
    setIsRunning(false);
    countdownApiRef.current && countdownApiRef.current.stop();
    const duration =
      session === 'work'
        ? workDuration * 60
        : session === 'shortBreak'
        ? shortBreakDuration * 60
        : longBreakDuration * 60;
    setSessionLengthInSeconds(duration);
    setDate(Date.now() + duration * 1000);
  }, [
    longBreakDuration,
    session,
    sessionLengthInSeconds,
    shortBreakDuration,
    workDuration,
  ]);

  return (
    <>
      <div className={`flex justify-between gap-x-12 ${spaceMono.className}`}>
        <span
          className={`text-nordWhite border rounded-lg border-r-4 px-1 ${
            session === 'work' ? 'border-r-tomato' : 'border-r-nordWhite'
          }`}
        >
          Pomodoro
        </span>
        <span
          className={`text-nordWhite border rounded-lg border-r-4 px-1 ${
            session === 'shortBreak'
              ? 'border-r-blue-400'
              : 'border-r-nordWhite'
          }`}
        >
          Short Break
        </span>
        <span
          className={`text-nordWhite border rounded-lg border-r-4 px-1 ${
            session === 'longBreak' ? 'border-r-teal-600' : 'border-r-nordWhite'
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
          <Countdown
            date={date}
            ref={setRef}
            autoStart={false}
            renderer={renderer}
            onStart={() => console.log('started')}
            // onTick={() => console.log('tick')}
            onPause={() => console.log('paused')}
            onComplete={switchSession}
          />
        </div>

        <div className="flex">
          <Button
            className="rounded-t-none rounded-br-none"
            onClick={handleStartPause}
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button
            className="rounded-t-none rounded-bl-none"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </>
  );
};
