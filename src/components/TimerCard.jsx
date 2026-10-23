import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, FastForward, Sparkles, Coffee, Laptop } from 'lucide-react';
import { playSound } from '../utils/sound';

export const TimerCard = ({ 
  t, 
  soundEnabled, 
  onWorkCompleted, 
  onTriggerBreakModal 
}) => {
  // Modes: 'work' | 'break'
  const [mode, setMode] = useState('work');
  // Durations in minutes: 25 or 50 for work; 2 or 5 for break
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  // Time left in seconds
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  const totalSeconds = selectedMinutes * 60;
  const timerRef = useRef(null);

  // When mode or selectedMinutes changes and not active, reset timer
  const handleSelectPreset = (minutes, newMode = mode) => {
    playSound('click', soundEnabled);
    setIsActive(false);
    setMode(newMode);
    setSelectedMinutes(minutes);
    setTimeLeft(minutes * 60);
  };

  const handleToggleTimer = () => {
    playSound('click', soundEnabled);
    setIsActive(!isActive);
  };

  const handleResetTimer = () => {
    playSound('click', soundEnabled);
    setIsActive(false);
    setTimeLeft(selectedMinutes * 60);
  };

  const handleSkip = () => {
    playSound('click', soundEnabled);
    setIsActive(false);
    if (mode === 'work') {
      // Prompt user with break modal
      onTriggerBreakModal();
      handleSelectPreset(5, 'break');
    } else {
      handleSelectPreset(25, 'work');
    }
  };

  // Timer Tick Effect
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsActive(false);
            
            // Completion logic
            playSound('chime', soundEnabled);

            if (mode === 'work') {
              onWorkCompleted(selectedMinutes);
              // Auto-open Break Modal
              onTriggerBreakModal();
              // Transition to break mode
              setMode('break');
              setSelectedMinutes(5);
              return 5 * 60;
            } else {
              // Break finished
              setMode('work');
              setSelectedMinutes(25);
              return 25 * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, mode, selectedMinutes, soundEnabled, onWorkCompleted, onTriggerBreakModal]);

  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Circular SVG math
  const radius = 118;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.max(0, Math.min(1, (totalSeconds - timeLeft) / totalSeconds));
  const strokeDashoffset = circumference * (1 - progressRatio);

  return (
    <div className="relative glass-panel rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between border border-zinc-800 shadow-2xl overflow-hidden">
      {/* Decorative background glow */}
      <div 
        className={`absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          mode === 'work' ? 'bg-emerald-500/10' : 'bg-sky-500/10'
        }`} 
      />

      {/* Top Header Mode Switcher */}
      <div className="w-full flex items-center justify-between pb-4 border-b border-stone-200 dark:border-white/5 mb-4 sm:mb-6 transition-colors duration-200">
        <div className="flex items-center gap-2">
          {mode === 'work' ? (
            <Laptop className="w-5 h-5 text-emerald-400" />
          ) : (
            <Coffee className="w-5 h-5 text-sky-400" />
          )}
          <span className="text-sm font-semibold text-stone-900 dark:text-stone-200 transition-colors duration-200">
            {mode === 'work' ? t.modeWork : t.modeBreak}
          </span>
        </div>

        {/* Quick Stretch Launch Button */}
        <button
          onClick={() => {
            playSound('click', soundEnabled);
            onTriggerBreakModal();
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-[#4E8768]/10 hover:bg-emerald-50 dark:hover:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm dark:shadow-none"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-[#5E9C76] transition-colors duration-200" />
          <span>{t.quickStretch}</span>
        </button>
      </div>

      {/* Preset Duration Buttons */}
      <div className="inline-flex p-1 rounded-xl bg-zinc-100/80 dark:bg-[#121615]/80 border border-stone-200 dark:border-white/5 mb-6 transition-colors duration-200 shadow-inner dark:shadow-none">
        {mode === 'work' ? (
          <>
            <button
              onClick={() => handleSelectPreset(25, 'work')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedMinutes === 25
                  ? 'bg-emerald-700 text-white dark:bg-[#4E8768] dark:text-stone-900 font-semibold shadow-sm shadow-emerald-700/40 dark:shadow-emerald-500/40'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-zinc-200'
              }`}
            >
              {t.sprint25}
            </button>
            <button
              onClick={() => handleSelectPreset(50, 'work')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedMinutes === 50
                  ? 'bg-emerald-700 text-white dark:bg-[#4E8768] dark:text-stone-900 font-semibold shadow-sm shadow-emerald-700/40 dark:shadow-emerald-500/40'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-zinc-200'
              }`}
            >
              {t.sprint50}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleSelectPreset(2, 'break')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedMinutes === 2
                  ? 'bg-sky-500 text-zinc-950 font-semibold shadow-sm shadow-sky-500/40'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-zinc-200'
              }`}
            >
              {t.break2}
            </button>
            <button
              onClick={() => handleSelectPreset(5, 'break')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedMinutes === 5
                  ? 'bg-sky-500 text-zinc-950 font-semibold shadow-sm shadow-sky-500/40'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-zinc-200'
              }`}
            >
              {t.break5}
            </button>
          </>
        )}
      </div>

      {/* SVG Circular Progress Ring */}
      <div className="relative my-2 flex items-center justify-center">
        <svg className="w-64 h-64 sm:w-72 sm:h-72 transform -rotate-90">
          <defs>
            <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* Background Track */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            className="stroke-zinc-200 dark:stroke-[#232B28] transition-colors duration-200"
            strokeWidth="10"
            fill="transparent"
          />

          {/* Dynamic Progress Arc */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className={`transition-all duration-500 ease-out ${
              mode === 'work'
                ? 'stroke-[url(#emeraldGrad)] dark:stroke-[#4E8768]'
                : 'stroke-[url(#skyGrad)] dark:stroke-[#38bdf8]'
            }`}
          />
        </svg>

        {/* Center Time & State Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-1">
            <span 
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                isActive 
                  ? (mode === 'work' ? 'bg-emerald-500 dark:bg-[#4E8768] animate-ping' : 'bg-sky-500 dark:bg-sky-400 animate-ping')
                  : 'bg-zinc-300 dark:bg-zinc-600'
              }`} 
            />
            <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold transition-colors duration-200">
              {isActive ? (mode === 'work' ? t.modeWork : t.modeBreak) : t.timeRemaining}
            </span>
          </div>

          <div className="text-5xl sm:text-6xl font-extrabold tracking-tighter text-stone-900 dark:text-stone-200 font-display tabular-nums select-none drop-shadow-md transition-colors duration-200">
            {formattedTime}
          </div>

          <p className="text-xs text-stone-500 dark:text-stone-500 mt-2 font-medium transition-colors duration-200">
            {mode === 'work' ? `${selectedMinutes}m ${t.focusCadence}` : `${selectedMinutes}m ${t.activeRestoration}`}
          </p>
        </div>
      </div>

      {/* Timer Primary Controls */}
      <div className="w-full flex items-center justify-center gap-4 mt-6">
        <button
          onClick={handleResetTimer}
          className="p-3 rounded-2xl bg-white/90 dark:bg-[#1A201E]/60 hover:bg-stone-100 dark:hover:bg-zinc-800 border border-stone-200 dark:border-white/5 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-zinc-200 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm dark:shadow-none"
          title="Reset timer"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={handleToggleTimer}
          className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl ${
            isActive
              ? 'bg-zinc-100 dark:bg-[#1A201E] hover:bg-zinc-200 dark:hover:bg-zinc-700 text-stone-900 dark:text-stone-200 border border-stone-200 dark:border-white/5'
              : mode === 'work'
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#4E8768] dark:hover:bg-emerald-400 dark:text-stone-900 shadow-emerald-700/30 dark:shadow-emerald-500/30'
                : 'bg-sky-500 hover:bg-sky-400 text-zinc-950 shadow-sky-500/30'
          }`}
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>{t.pause}</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>{timeLeft < totalSeconds ? t.resume : t.start}</span>
            </>
          )}
        </button>

        <button
          onClick={handleSkip}
          className="p-3 rounded-2xl bg-white/90 dark:bg-[#1A201E]/60 hover:bg-stone-100 dark:hover:bg-zinc-800 border border-stone-200 dark:border-white/5 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-zinc-200 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm dark:shadow-none"
          title={mode === 'work' ? t.skipToBreak : t.skipToWork}
        >
          <FastForward className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
