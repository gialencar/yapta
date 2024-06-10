import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Timer } from '../app/components/Timer';
import { useTimerStore } from '../app/hooks/store';

jest.mock('../app/hooks/store', () => ({
  useTimerStore: {
    use: {
      workDuration: jest.fn(),
      shortBreakDuration: jest.fn(),
      longBreakDuration: jest.fn(),
    },
  },
}));

describe('Timer', () => {
  beforeEach(() => {
    useTimerStore.use.workDuration.mockReturnValue(25);
    useTimerStore.use.shortBreakDuration.mockReturnValue(5);
    useTimerStore.use.longBreakDuration.mockReturnValue(15);
  });

  it('renders the Timer component', () => {
    render(<Timer />);
    expect(screen.getByText('Pomodoro')).toBeInTheDocument();
    expect(screen.getByText('Short Break')).toBeInTheDocument();
    expect(screen.getByText('Long Break')).toBeInTheDocument();
  });

  it('starts and pauses the timer', () => {
    render(<Timer />);
    const startPauseButton = screen.getByText('Start');

    // Start the timer
    fireEvent.click(startPauseButton);
    expect(startPauseButton.textContent).toBe('Pause');

    // Pause the timer
    fireEvent.click(startPauseButton);
    expect(startPauseButton.textContent).toBe('Start');
  });

  it('resets the timer', () => {
    render(<Timer />);
    const startPauseButton = screen.getByText('Start');
    const resetButton = screen.getByText('Reset');

    // Start the timer
    fireEvent.click(startPauseButton);
    expect(startPauseButton.textContent).toBe('Pause');

    // Reset the timer
    fireEvent.click(resetButton);
    expect(startPauseButton.textContent).toBe('Start');
  });

  it('switches sessions on completion', () => {
    jest.useFakeTimers();
    render(<Timer />);
    const startPauseButton = screen.getByText('Start');

    // Start the timer
    fireEvent.click(startPauseButton);

    act(() => {
      jest.advanceTimersByTime(25 * 60 * 1000);
    });

    expect(screen.getByText('Short Break')).toHaveClass('border-r-blue-400');
    jest.useRealTimers();
  });
});
