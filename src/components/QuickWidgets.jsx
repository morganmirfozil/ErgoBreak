import React, { useState, useEffect, useRef } from 'react';
import { 
  Droplet, 
  RotateCcw, 
  UserCheck, 
  Eye, 
  Check, 
  Sparkles, 
  Compass, 
  Plus,
  Play,
  RotateCw
} from 'lucide-react';
import { playSound } from '../utils/sound';

export const QuickWidgets = ({ 
  t, 
  soundEnabled, 
  waterMl, 
  onAddWater, 
  onResetWater, 
  onPostureCheck, 
  postureCount 
}) => {
  // --- POSTURE RESET STATE ---
  const [isPostureAligning, setIsPostureAligning] = useState(false);
  const [postureFeedback, setPostureFeedback] = useState(false);

  const handlePostureClick = () => {
    playSound('posture', soundEnabled);
    setIsPostureAligning(true);
    onPostureCheck();

    // 5-second posture realignment breathing cue
    setTimeout(() => {
      setIsPostureAligning(false);
      setPostureFeedback(true);
      setTimeout(() => setPostureFeedback(false), 3000);
    }, 5000);
  };

  // --- 20-20-20 EYE BREAK QUICK TRIGGER STATE ---
  const [eyeCountdown, setEyeCountdown] = useState(0);
  const [eyeCompletedFeedback, setEyeCompletedFeedback] = useState(false);
  const eyeIntervalRef = useRef(null);

  const handleStartEyeBreak = () => {
    playSound('chime', soundEnabled);
    setEyeCountdown(20);
    setEyeCompletedFeedback(false);
  };

  useEffect(() => {
    if (eyeCountdown > 0) {
      eyeIntervalRef.current = setInterval(() => {
        setEyeCountdown(prev => {
          if (prev <= 1) {
            clearInterval(eyeIntervalRef.current);
            playSound('chime', soundEnabled);
            setEyeCompletedFeedback(true);
            setTimeout(() => setEyeCompletedFeedback(false), 4000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (eyeIntervalRef.current) clearInterval(eyeIntervalRef.current);
    }

    return () => {
      if (eyeIntervalRef.current) clearInterval(eyeIntervalRef.current);
    };
  }, [eyeCountdown, soundEnabled]);

  // Water calculations
  const waterGoal = 2000;
  const waterPercent = Math.min(100, Math.round((waterMl / waterGoal) * 100));

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-stone-900 dark:text-stone-200 flex items-center gap-2 transition-colors duration-200">
          <Compass className="w-4 h-4 text-emerald-700 dark:text-[#5E9C76] transition-colors duration-200" />
          <span>{t.widgetsTitle}</span>
        </h2>
        <span className="text-xs text-stone-500 dark:text-stone-400 transition-colors duration-200">{t.microHabits}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. HYDRATION TRACKER */}
        <div className="relative glass-panel rounded-3xl p-5 border border-zinc-800 flex flex-col justify-between overflow-hidden">
          {/* Liquid Visual Tank */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-white/5 transition-colors duration-200">
            <div className="flex items-center gap-2 text-sky-500 dark:text-sky-400 font-semibold text-xs transition-colors duration-200">
              <Droplet className="w-4 h-4 fill-sky-500/20 dark:fill-sky-400/20" />
              <span>{t.hydrationTitle}</span>
            </div>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 font-mono transition-colors duration-200">
              {waterMl} / {waterGoal} ml
            </span>
          </div>

          <div className="my-4 flex items-center gap-4">
            {/* Visual Glass Cylinder with Liquid Level */}
            <div className="relative w-16 h-28 rounded-2xl bg-zinc-100 dark:bg-[#121615]/80 border border-zinc-300 dark:border-white/5 overflow-hidden flex flex-col justify-end shadow-inner flex-shrink-0 transition-colors duration-200">
              {/* Water Fill with gradient and wave */}
              <div 
                className="w-full bg-gradient-to-t from-sky-600 via-sky-400 to-cyan-300 transition-all duration-700 ease-out relative"
                style={{ height: `${waterPercent}%` }}
              >
                {/* Surface shine */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/90/40" />
              </div>

              {/* Milliliter tick marks */}
              <div className="absolute inset-0 flex flex-col justify-between p-1.5 pointer-events-none opacity-40">
                <div className="border-b border-white text-[8px] text-white">2.0L</div>
                <div className="border-b border-white text-[8px] text-white">1.0L</div>
                <div className="border-b border-white text-[8px] text-white">0.5L</div>
              </div>
            </div>

            {/* Stats & Feedback */}
            <div className="flex-1 space-y-1">
              <div className="text-2xl font-black font-display tabular-nums tracking-tighter text-stone-900 dark:text-stone-200 transition-colors duration-200">
                {waterPercent}%
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 transition-colors duration-200">
                {waterPercent >= 100 ? (
                  <span className="text-emerald-700 dark:text-[#5E9C76] font-medium flex items-center gap-1 transition-colors duration-200">
                    <Check className="w-3.5 h-3.5" />
                    {t.waterComplete}
                  </span>
                ) : (
                  `${Math.max(0, waterGoal - waterMl)} ml ${t.remaining}`
                )}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => {
                playSound('water', soundEnabled);
                onAddWater(250);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold text-xs shadow-md shadow-sky-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.addWater}</span>
            </button>
            <button
              onClick={() => {
                playSound('click', soundEnabled);
                onResetWater();
              }}
              className="p-2 rounded-xl bg-white/90 dark:bg-[#1A201E] hover:bg-stone-100 dark:hover:bg-zinc-700 border border-stone-200 dark:border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-zinc-200 transition-all duration-200 shadow-sm dark:shadow-none"
              title={t.resetWater}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. POSTURE RESET */}
        <div className="relative glass-panel rounded-3xl p-5 border border-zinc-800 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-[#5E9C76] font-semibold text-xs transition-colors duration-200">
              <UserCheck className="w-4 h-4" />
              <span>{t.postureTitle}</span>
            </div>
            <span className="text-[11px] text-emerald-700/90 dark:text-[#5E9C76] font-mono font-semibold transition-colors duration-200">
              {postureCount} {t.postureChecksToday}
            </span>
          </div>

          <div className="my-3 space-y-2">
            {isPostureAligning ? (
              /* Active breathing/realigning guide */
              <div className="py-2 flex flex-col items-center justify-center text-center space-y-2">
                <div className="relative w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center animate-breathe">
                  <UserCheck className="w-7 h-7 text-emerald-300" />
                </div>
                <p className="text-xs text-emerald-300 font-semibold animate-pulse">
                  {t.postureActive}
                </p>
                <p className="text-[11px] text-zinc-400 max-w-[200px] leading-tight">
                  {t.postureInhale}
                </p>
              </div>
            ) : postureFeedback ? (
              /* Success confirmation */
              <div className="py-4 flex flex-col items-center justify-center text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-emerald-400">
                  {t.postureDone}
                </p>
              </div>
            ) : (
              /* Normal prompt state */
              <div className="space-y-2">
                <p className="text-xs text-stone-900 dark:text-stone-300 leading-relaxed transition-colors duration-200">
                  {t.postureCue}
                </p>
                <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-[#121615]/50 border border-stone-200 dark:border-white/5 text-[11px] text-stone-600 dark:text-stone-400 flex items-center gap-2 transition-colors duration-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 flex-shrink-0" />
                  <span>{t.postureDecompress}</span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handlePostureClick}
            disabled={isPostureAligning}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${
              isPostureAligning
                ? 'bg-zinc-100 dark:bg-[#1A201E] text-zinc-400 dark:text-stone-500 cursor-not-allowed border border-stone-200 dark:border-transparent'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#4E8768] dark:hover:bg-emerald-400 dark:text-stone-900 shadow-emerald-700/20 dark:shadow-emerald-500/20 hover:scale-[1.02] active:scale-95'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{isPostureAligning ? t.postureActive : t.postureButton}</span>
          </button>
        </div>

        {/* 3. 20-20-20 EYE BREAK */}
        <div className="relative glass-panel rounded-3xl p-5 border border-zinc-800 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-xs transition-colors duration-200">
              <Eye className="w-4 h-4" />
              <span>{t.eyeBreakTitle}</span>
            </div>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 transition-colors duration-200">{t.eyeRule}</span>
          </div>

          <div className="my-3 space-y-2">
            {eyeCountdown > 0 ? (
              /* Active 20-second Eye Rest Countdown */
              <div className="py-2 flex flex-col items-center justify-center text-center space-y-2">
                <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-400 font-display tabular-nums tracking-tighter font-bold text-xl shadow-glow-amber">
                  <span>{eyeCountdown}</span>
                </div>
                <p className="text-xs text-amber-300 font-semibold">
                  {t.eyeBreakActive}
                </p>
                <p className="text-[11px] text-zinc-400 max-w-[200px] leading-tight">
                  {t.eyeFocusDist}
                </p>
              </div>
            ) : eyeCompletedFeedback ? (
              /* Done Feedback */
              <div className="py-4 flex flex-col items-center justify-center text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Check className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-amber-400">
                  {t.eyeBreakDone}
                </p>
              </div>
            ) : (
              /* Instructions */
              <div className="space-y-2">
                <p className="text-xs text-stone-900 dark:text-stone-300 leading-relaxed transition-colors duration-200">
                  {t.eyeBreakInstruction}
                </p>
                <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-[#121615]/50 border border-stone-200 dark:border-white/5 text-[11px] text-stone-600 dark:text-stone-400 flex items-center gap-2 transition-colors duration-200">
                  <Eye className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400 flex-shrink-0" />
                  <span>{t.eyePrevents}</span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleStartEyeBreak}
            disabled={eyeCountdown > 0}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${
              eyeCountdown > 0
                ? 'bg-zinc-100 dark:bg-[#1A201E] text-zinc-400 dark:text-stone-500 cursor-not-allowed border border-stone-200 dark:border-transparent'
                : 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-amber-500/20 hover:scale-[1.02] active:scale-95'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{eyeCountdown > 0 ? `${eyeCountdown}${t.secondsRemaining}` : t.startEyeBreak}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
