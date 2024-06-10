'use client';
import { Roboto_Mono } from 'next/font/google';
import { useState } from 'react';
import Countdown, {
  CountdownApi,
  CountdownRenderProps,
  zeroPad,
} from 'react-countdown';

const Completionist = () => <span>You are good to go!</span>;
const spaceMono = Roboto_Mono({ weight: '700', subsets: ['latin'] });

export const renderer = ({ minutes, seconds }: CountdownRenderProps) => {
  // if (completed) {
  //   return <Completionist />;
  // } else {
  return (
    <span
      className={`text-8xl font-black text-nordWhite ${spaceMono.className}`}
    >
      {zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  );
  // }
};

export const CountdownTimer = ({
  timeInSeconds,
}: {
  timeInSeconds: number;
}) => {
  let countdownApi: CountdownApi | null = null;
  const [date, setDate] = useState(Date.now() + timeInSeconds * 1000);

  const handleStartClick = (): void => {
    countdownApi && countdownApi.start();
  };

  const handlePauseClick = (): void => {
    countdownApi && countdownApi.pause();
  };

  const handleResetClick = (): void => {
    setDate(Date.now() + 25 * 60 * 1000);
  };

  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  };

  return (
    <Countdown
      date={date}
      ref={setRef}
      autoStart={false}
      renderer={renderer}
      onTick={() => console.log('tick')}
      onPause={() => console.log('paused')}
    />
  );
};
