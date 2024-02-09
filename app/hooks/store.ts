import { create, StoreApi, UseBoundStore } from 'zustand';

interface TimerStore {
  WorkDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  setWorkDuration: (duration: number) => void;
  setShortBreakDuration: (duration: number) => void;
  setLongBreakDuration: (duration: number) => void;
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const useTimerStore = createSelectors(
  create<TimerStore>()((set) => ({
    WorkDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    setWorkDuration: (duration) => set({ WorkDuration: duration }),
    setShortBreakDuration: (duration) => set({ shortBreakDuration: duration }),
    setLongBreakDuration: (duration) => set({ longBreakDuration: duration }),
  })),
);
