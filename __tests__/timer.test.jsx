import { act, fireEvent, render, screen } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
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

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn().mockReturnValue(null),
  })),
}));

describe('Timer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useTimerStore.use.workDuration.mockReturnValue(25);
    useTimerStore.use.shortBreakDuration.mockReturnValue(5);
    useTimerStore.use.longBreakDuration.mockReturnValue(15);
  });

  describe('Rendering', () => {
    it('renders the initial state correctly', () => {
      render(<Timer />);

      // session hints
      expect(screen.getByText('Pomodoro')).toHaveClass('border-r-tomato');
      expect(screen.getByText('Short Break')).toHaveClass('border-r-nordWhite');
      expect(screen.getByText('Long Break')).toHaveClass('border-r-nordWhite');

      // buttons
      expect(screen.getByText('Start')).toBeInTheDocument();
      expect(screen.getByText('Reset')).toBeInTheDocument();
    });

    it('shows the correct initial time', () => {
      render(<Timer />);
      expect(screen.getByTestId('countdown').textContent).toBe('25:00');
    });
  });

  describe('Timer controls', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('handles start/pause toggle correctly', () => {
      render(<Timer />);
      const startPauseButton = screen.getByText('Start');

      // Start
      fireEvent.click(startPauseButton);
      expect(startPauseButton).toHaveTextContent('Pause');

      // Pause
      fireEvent.click(startPauseButton);
      expect(startPauseButton).toHaveTextContent('Start');
    });

    it('counts down correctly when running', () => {
      render(<Timer />);

      fireEvent.click(screen.getByText('Start'));

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(screen.getByTestId('countdown')).toHaveTextContent('24:59');

      act(() => {
        jest.advanceTimersByTime(59000);
      });
      expect(screen.getByTestId('countdown')).toHaveTextContent('24:00');
    });

    it('resets the timer correctly', () => {
      render(<Timer />);
      const startPauseButton = screen.getByText('Start');
      const resetButton = screen.getByText('Reset');

      // Start the timer
      fireEvent.click(startPauseButton);
      act(() => {
        jest.advanceTimersByTime(5000);
      });

      // Reset the timer
      fireEvent.click(resetButton);
      expect(screen.getByTestId('countdown')).toHaveTextContent('25:00');
      expect(startPauseButton).toHaveTextContent('Start');
    });
  });

  describe('Session switching', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('switches to short break after work session', () => {
      render(<Timer />);
      const startPauseButton = screen.getByText('Start');

      // Start the timer
      fireEvent.click(startPauseButton);

      act(() => {
        jest.advanceTimersByTime(25 * 60 * 1000); // 25 minutes
      });

      expect(screen.getByText('Pomodoro')).toHaveClass('border-r-nordWhite');
      expect(screen.getByText('Short Break')).toHaveClass('border-r-blue-400');
      expect(screen.getByText('Long Break')).toHaveClass('border-r-nordWhite');
      expect(screen.getByTestId('countdown')).toHaveTextContent('05:00');
    });

    it('switches to long break after 4 work sessions', () => {
      render(<Timer />);

      // Complete 4 work sessions and 3 short breaks
      for (let i = 1; i <= 4; i++) {
        fireEvent.click(screen.getByText('Start'));

        // Complete work session
        act(() => {
          jest.advanceTimersByTime(25 * 60 * 1000); // 25 minutes
        });

        if (i <= 3) {
          // Complete short break
          fireEvent.click(screen.getByText('Start'));
          act(() => {
            jest.advanceTimersByTime(5 * 60 * 1000); // 5 minutes
          });
        }
      }

      expect(screen.getByTestId('countdown')).toHaveTextContent('15:00');
      expect(screen.getByText('Long Break')).toHaveClass('border-r-teal-600');
    });
  });

  describe('Test Mode', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('timer is shorter in test mode', () => {
      useSearchParams.mockImplementation(() => ({
        get: jest.fn().mockReturnValue('true'),
      }));

      render(<Timer />);

      expect(screen.getByTestId('countdown')).toHaveTextContent('00:25');

      fireEvent.click(screen.getByText('Start'));

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(screen.getByTestId('countdown')).toHaveTextContent('00:24');
    });
  });
});
