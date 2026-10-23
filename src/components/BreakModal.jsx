import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Play, 
  Pause, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Info, 
  RotateCcw,
  Award
} from 'lucide-react';
import { ExerciseVisual } from './ExerciseVisual';
import { playSound } from '../utils/sound';

export const BreakModal = ({ 
  isOpen, 
  onClose, 
  exercises, 
  lang, 
  t, 
  soundEnabled, 
  onBreakFinished 
}) => {
  // We pick a targeted 3-exercise routine across categories
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(25);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const timerRef = useRef(null);

  // Initialize selected 3 exercises whenever modal opens
  useEffect(() => {
    if (isOpen) {
      // Pick 1 eyes, 1 neck, 1 spine/shoulders
      const eyesList = exercises.filter(e => e.category === 'eyes');
      const neckList = exercises.filter(e => e.category === 'neck');
      const bodyList = exercises.filter(e => e.category === 'spine' || e.category === 'shoulders');

      const routine = [
        eyesList[Math.floor(Math.random() * eyesList.length)] || exercises[0],
        neckList[Math.floor(Math.random() * neckList.length)] || exercises[1],
        bodyList[Math.floor(Math.random() * bodyList.length)] || exercises[2],
      ];

      setSelectedExercises(routine);
      setCurrentIndex(0);
      setIsFinished(false);
      setIsPaused(false);
      setTimerSeconds(routine[0]?.duration || 25);
    }
  }, [isOpen, exercises]);

  // Active exercise countdown
  const currentEx = selectedExercises[currentIndex];

  useEffect(() => {
    if (!isOpen || isFinished || !currentEx) return;

    if (!isPaused && timerSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            playSound('tick', soundEnabled);
            return 0;
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
  }, [isOpen, isFinished, isPaused, timerSeconds, currentEx, soundEnabled]);

  if (!isOpen) return null;

  const currentDuration = currentEx?.duration || 25;
  const progressPercent = Math.round(((currentDuration - timerSeconds) / currentDuration) * 100);

  const handleNext = () => {
    playSound('click', soundEnabled);
    if (currentIndex < selectedExercises.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setTimerSeconds(selectedExercises[nextIndex]?.duration || 25);
      setIsPaused(false);
    } else {
      // Complete entire session
      triggerCelebration();
    }
  };

  const handleRestartCurrent = () => {
    playSound('click', soundEnabled);
    setTimerSeconds(currentDuration);
    setIsPaused(false);
  };

  const triggerCelebration = () => {
    setIsFinished(true);
    playSound('complete', soundEnabled);
    onBreakFinished();

    // Trigger fireworks with canvas-confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#38bdf8', '#f59e0b', '#ec4899']
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#10b981', '#6ee7b7', '#38bdf8']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#10b981', '#f59e0b', '#a7f3d0']
        });
      }, 250);
    } catch (e) {
      console.warn("Confetti error", e);
    }
  };

  const handleClose = () => {
    playSound('click', soundEnabled);
    onClose();
  };

  // Translations for current exercise
  const exData = currentEx ? (currentEx[lang] || currentEx.en) : null;

  const categoryBadgeColors = {
    eyes: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
    neck: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
    spine: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/60',
    shoulders: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60',
  };

  const categoryNames = {
    eyes: t.catEyes,
    neck: t.catNeck,
    spine: t.catSpine,
    shoulders: t.catShoulders,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white/90 dark:bg-[#1A201E]/80 border border-stone-200 dark:border-white/5 shadow-xl dark:shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-colors duration-200">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-white/5 bg-stone-100/50 dark:bg-[#121615]/50 transition-colors duration-200">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 dark:bg-[#4E8768]/10 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-[#5E9C76] transition-colors duration-200">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-200 font-display transition-colors duration-200">
                {t.modalTitle}
              </h2>
              {!isFinished && selectedExercises.length > 0 && (
                <p className="text-[11px] text-stone-500 dark:text-stone-400 transition-colors duration-200">
                  {t.step} {currentIndex + 1} {t.of} {selectedExercises.length}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isFinished ? (
            /* Celebration Screen */
            <div className="py-8 flex flex-col items-center text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="relative flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-50 dark:bg-[#4E8768]/20 border border-emerald-200 dark:border-emerald-800/40 shadow-sm dark:shadow-none transition-colors duration-200">
                <Award className="w-10 h-10 text-emerald-500 dark:text-[#5E9C76] animate-bounce" />
              </div>

              <div className="space-y-2 max-w-md">
                <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-200 tracking-tight font-display transition-colors duration-200">
                  {t.breakCompletedTitle}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed transition-colors duration-200">
                  {t.breakCompletedSub}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full max-w-sm pt-2">
                <div className="p-3 rounded-2xl bg-stone-100 dark:bg-[#121615]/60 border border-stone-200 dark:border-white/5 text-center transition-colors duration-200">
                  <span className="text-xs text-stone-500 block">{t.totalExercises}</span>
                  <span className="text-xl font-bold text-emerald-700 dark:text-[#5E9C76] font-display tabular-nums tracking-tighter transition-colors duration-200">
                    {selectedExercises.length}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-stone-100 dark:bg-[#121615]/60 border border-stone-200 dark:border-white/5 text-center transition-colors duration-200">
                  <span className="text-xs text-stone-500 block">{t.ergoPoints}</span>
                  <span className="text-xl font-bold text-amber-500 dark:text-amber-400 font-display tabular-nums tracking-tighter transition-colors duration-200">+10 {t.pts}</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="mt-4 px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#4E8768] dark:hover:bg-emerald-400 dark:text-stone-900 font-bold text-sm shadow-lg shadow-emerald-700/30 dark:shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95"
              >
                {t.returnToDesk}
              </button>
            </div>
          ) : (
            /* Active Exercise Content */
            exData && (
              <>
                {/* Visual Guide with animated movement */}
                <div className="relative">
                  <ExerciseVisual 
                    visualType={currentEx.visualType} 
                    isPaused={isPaused} 
                  />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors duration-200 ${categoryBadgeColors[currentEx.category] || 'bg-zinc-200 dark:bg-[#1A201E] text-stone-900 dark:text-stone-300'}`}>
                      {categoryNames[currentEx.category] || currentEx.category}
                    </span>
                  </div>

                  {/* Countdown Timer Overlay Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-[#1A201E]/90 border border-stone-200 dark:border-white/5 text-stone-900 dark:text-stone-200 font-display tabular-nums tracking-tighter font-bold text-sm shadow-sm transition-colors duration-200">
                    <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-500 dark:bg-[#4E8768] animate-pulse'}`} />
                    <span>{timerSeconds}{t.secondsLeft}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-zinc-200 dark:bg-[#1A201E]/80 rounded-full h-1.5 overflow-hidden transition-colors duration-200">
                  <div 
                    className="bg-emerald-500 dark:bg-[#4E8768] h-full rounded-full transition-all duration-300 ease-out" 
                    style={{ width: `${progressPercent}%` }} 
                  />
                </div>

                {/* Exercise Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 dark:text-stone-200 tracking-tight font-display transition-colors duration-200">
                      {exData.title}
                    </h3>
                    <p className="text-sm text-stone-900 dark:text-stone-300 mt-2 leading-relaxed transition-colors duration-200">
                      {exData.instructions}
                    </p>
                  </div>

                  {/* Ergonomic Benefits & Posture Cue */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-[#121615]/60 border border-stone-200 dark:border-white/5 space-y-1 transition-colors duration-200">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-[#5E9C76] transition-colors duration-200">
                        <ShieldCheck className="w-4 h-4" />
                        <span>{t.benefits}</span>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-normal transition-colors duration-200">
                        {exData.benefits}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-[#121615]/60 border border-stone-200 dark:border-white/5 space-y-1 transition-colors duration-200">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 transition-colors duration-200">
                        <Info className="w-4 h-4" />
                        <span>{t.postureTip}</span>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-normal transition-colors duration-200">
                        {exData.postureTip}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )
          )}
        </div>

        {/* Modal Footer Controls */}
        {!isFinished && (
          <div className="px-6 py-4 border-t border-stone-200 dark:border-white/5 bg-stone-100/60 dark:bg-[#121615]/60 flex items-center justify-between gap-3 transition-colors duration-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playSound('click', soundEnabled);
                  setIsPaused(!isPaused);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-[#1A201E] hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-stone-200 dark:border-transparent text-stone-900 dark:text-stone-200 text-xs font-semibold transition-colors duration-200 shadow-sm dark:shadow-none"
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                <span>{isPaused ? t.resumeExercise : t.pauseExercise}</span>
              </button>

              <button
                onClick={handleRestartCurrent}
                className="p-2 rounded-xl bg-white/90 dark:bg-[#1A201E]/60 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-stone-200 dark:border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-zinc-200 transition-colors duration-200 shadow-sm dark:shadow-none"
                title={t.resetWater}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#4E8768] dark:hover:bg-emerald-400 dark:text-stone-900 font-bold text-xs shadow-md shadow-emerald-700/20 dark:shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <span>
                {currentIndex < selectedExercises.length - 1 
                  ? t.nextExercise 
                  : t.finishBreak}
              </span>
              {currentIndex < selectedExercises.length - 1 ? (
                <ArrowRight className="w-4 h-4" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
