import { GearSix } from '@phosphor-icons/react';
import { Button, Modal } from 'keep-react';
import { useState } from 'react';

type SettingsProps = {
  onSave: (data: {
    workMinutes: number;
    shortBreakMinutes: number;
    longBreakMinutes: number;
  }) => void;
};

export const SettingsModal = ({ onSave }: SettingsProps) => {
  const [showModal, setShowModal] = useState(true);
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

  const onClick = () => {
    setShowModal(!showModal);
  };

  return (
    <Modal
      icon={<GearSix size={28} color="#1F271B" />}
      size="md"
      show={showModal}
      position="top-center"
    >
      <Modal.Header>Timer</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="flex">
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
      </Modal.Body>
      <Modal.Footer>
        <Button type="outlineGray" onClick={onClick}>
          Cancel
        </Button>
        <Button type="primary" onClick={onClick}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
