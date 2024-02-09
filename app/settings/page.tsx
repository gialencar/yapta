'use client';

import React from 'react';
import Settings from '../components/Settings';
import { useRouter } from 'next/navigation';
import { useTimerStore } from '../hooks/store';

function Page() {
  const router = useRouter();
  const setWorkDuration = useTimerStore.use.setWorkDuration();
  const setShortBreakDuration = useTimerStore.use.setShortBreakDuration();
  const setLongBreakDuration = useTimerStore.use.setLongBreakDuration();

  const onSave = (dur: {
    workMinutes: number;
    shortBreakMinutes: number;
    longBreakMinutes: number;
  }) => {
    setWorkDuration(dur.workMinutes);
    setShortBreakDuration(dur.shortBreakMinutes);
    setLongBreakDuration(dur.longBreakMinutes);
    router.push('/');
  };

  return <Settings onSave={onSave} />;
}

export default Page;
