import { create, StoreApi, UseBoundStore } from 'zustand';

interface TimerStore {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  currentSession: 'work' | 'shortBreak' | 'longBreak';
  setWorkDuration: (duration: number) => void;
  setShortBreakDuration: (duration: number) => void;
  setLongBreakDuration: (duration: number) => void;
  setCurrentSession: (session: 'work' | 'shortBreak' | 'longBreak') => void;
  nextSession: () => void;
}

/*
 * https://zustand.docs.pmnd.rs/guides/auto-generating-selectors
 * used for auto-generating hooks for each state property.
 * eg. `useTimerStore.use.workDuration()`
 */
type WithSelectors<S> =
  S extends { getState: () => infer T } ?
    S & { use: { [K in keyof T]: () => T[K] } }
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
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    currentSession: 'work',
    setWorkDuration: (duration) => set({ workDuration: duration }),
    setShortBreakDuration: (duration) => set({ shortBreakDuration: duration }),
    setLongBreakDuration: (duration) => set({ longBreakDuration: duration }),
    setCurrentSession: (session) => set({ currentSession: session }),
    nextSession: () => {
      set((state) => {
        if (state.currentSession === 'work')
          return { currentSession: 'shortBreak' };
        else if (state.currentSession === 'shortBreak')
          return { currentSession: 'longBreak' };
        else return { currentSession: 'work' };
      });
    },
  })),
);
