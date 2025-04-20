'use client';

import { useTimerStore } from '@/app/hooks/store';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Smile } from 'lucide-react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ModalContext } from './modalContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Modal() {
  const { showModal, setShowModal } = useContext(ModalContext);

  const [workMinutes, setWorkMinutes] = useState(
    useTimerStore.use.workDuration(),
  );
  const [shortBreakMinutes, setShortBreakMinutes] = useState(
    useTimerStore.use.shortBreakDuration(),
  );
  const [longBreakMinutes, setLongBreakMinutes] = useState(
    useTimerStore.use.longBreakDuration(),
  );

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
    setShowModal(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({
      workMinutes,
      shortBreakMinutes,
      longBreakMinutes,
    });
  };

  return (
    <div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader onClick={() => setShowModal(false)}></DialogHeader>
          <Smile size={80} color="green" />
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-5 py-2 items-center">
              <label className="col-span-3">Work Duration (minutes): </label>
              <Input
                className="col-span-2"
                type="number"
                value={workMinutes}
                onChange={(e) => setWorkMinutes(+e.target.value)}
              />
            </div>
            <div className="grid grid-cols-5 py-2 items-center">
              <label className="col-span-3">
                Short Break Duration (minutes):{' '}
              </label>
              <Input
                className="col-span-2"
                type="number"
                value={shortBreakMinutes}
                onChange={(e) => setShortBreakMinutes(+e.target.value)}
              />
            </div>
            <div className="grid grid-cols-5 py-2 items-center">
              <label className="col-span-3">
                Long Break Duration (minutes):{' '}
              </label>
              <Input
                className="col-span-2"
                type="number"
                value={longBreakMinutes}
                onChange={(e) => setLongBreakMinutes(+e.target.value)}
              />
            </div>
            <Button type="submit">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
