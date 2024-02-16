import { useState } from 'react';
import { useTimerStore } from '../hooks/store';

const Settings = ({ onSave }: { onSave: Function }) => {
  // TODO: Load initial values from the store
  const [workMinutes, setWorkMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({
      workMinutes,
      shortBreakMinutes,
      longBreakMinutes,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Work Duration (minutes): </label>
        <input
          type="number"
          value={workMinutes}
          onChange={(e) => setWorkMinutes(+e.target.value)}
        />
      </div>
      <div>
        <label>Short Break Duration (minutes): </label>
        <input
          type="number"
          value={shortBreakMinutes}
          onChange={(e) => setShortBreakMinutes(+e.target.value)}
        />
      </div>
      <div>
        <label>Long Break Duration (minutes): </label>
        <input
          type="number"
          value={longBreakMinutes}
          onChange={(e) => setLongBreakMinutes(+e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default Settings;
