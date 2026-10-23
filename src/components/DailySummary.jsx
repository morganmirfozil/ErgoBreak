import React from 'react';
import { 
  Activity, 
  CheckCircle, 
  Droplet, 
  UserCheck, 
  Clock, 
  TrendingUp, 
  Award,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { calculateErgoScore } from '../utils/storage';

export const DailySummary = ({ t, stats }) => {
  const score = calculateErgoScore(stats);

  // Score tier & styling
  let scoreTier = t.scoreRatingPoor;
  let scoreColor = 'text-stone-600 dark:text-stone-400 transition-colors duration-200';
  let badgeColor = 'bg-zinc-200/80 dark:bg-[#1A201E]/80 text-stone-900 dark:text-stone-300 border-zinc-300 dark:border-white/5 transition-colors duration-200';
  let ringClass = 'stroke-zinc-500 dark:stroke-zinc-500 transition-colors duration-700 ease-out';

  if (score >= 90) {
    scoreTier = t.scoreRatingElite;
    scoreColor = 'text-emerald-700 dark:text-[#5E9C76] transition-colors duration-200';
    badgeColor = 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-[#5E9C76] border-emerald-300 dark:border-emerald-800/40 shadow-sm dark:shadow-none transition-colors duration-200';
    ringClass = 'stroke-emerald-500 dark:stroke-[#4E8768] transition-colors duration-700 ease-out';
  } else if (score >= 70) {
    scoreTier = t.scoreRatingGood;
    scoreColor = 'text-emerald-500 dark:text-[#5E9C76] transition-colors duration-200';
    badgeColor = 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-[#5E9C76] border-emerald-200 dark:border-emerald-800/40 transition-colors duration-200';
    ringClass = 'stroke-emerald-400 dark:stroke-[#4E8768] transition-colors duration-700 ease-out';
  } else if (score >= 40) {
    scoreTier = t.scoreRatingFair;
    scoreColor = 'text-amber-600 dark:text-amber-400 transition-colors duration-200';
    badgeColor = 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-600/40 transition-colors duration-200';
    ringClass = 'stroke-amber-500 dark:stroke-amber-600 transition-colors duration-700 ease-out';
  }

  // Circular gauge math for Ergo Score
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - score / 100);

  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-white/5 transition-colors duration-200">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-700 dark:text-[#5E9C76] transition-colors duration-200" />
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-200 tracking-tight transition-colors duration-200">
              {t.summaryTitle}
            </h2>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 transition-colors duration-200">
            {t.summarySubtitle}
          </p>
        </div>

        {/* Ergo Score Badge */}
        <div className="flex items-center gap-4 bg-zinc-100/70 dark:bg-[#121615]/70 p-2.5 rounded-2xl border border-stone-200 dark:border-white/5 transition-colors duration-200">
          {/* Circular mini gauge */}
          <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
            <svg className="w-14 h-14 transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r={radius / 2}
                className="stroke-zinc-200 dark:stroke-[#232B28] transition-colors duration-200"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="28"
                cy="28"
                r={radius / 2}
                strokeWidth="4"
                strokeDasharray={circumference / 2}
                strokeDashoffset={strokeDashoffset / 2}
                strokeLinecap="round"
                fill="transparent"
                className={ringClass}
              />
            </svg>
            <span className="absolute text-sm font-extrabold font-display tabular-nums tracking-tighter text-stone-900 dark:text-stone-200 transition-colors duration-200">
              {score}%
            </span>
          </div>

          <div className="pr-2">
            <span className="text-[10px] text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider block transition-colors duration-200">
              {t.ergoScore}
            </span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${badgeColor}`}>
              {scoreTier}
            </span>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-6">
        {/* Breaks Completed */}
        <div className="p-4 rounded-2xl bg-zinc-100/50 dark:bg-[#121615]/60 border border-stone-200 dark:border-white/5 flex flex-col justify-between space-y-3 transition-colors duration-200">
          <div className="flex items-center justify-between text-emerald-400">
            <CheckCircle className="w-5 h-5" />
            <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400">{t.target}: 4+</span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display tabular-nums tracking-tighter text-stone-900 dark:text-stone-200 transition-colors duration-200">
              {stats.breaksCompleted}
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 font-medium transition-colors duration-200">
              {t.statBreaks}
            </p>
          </div>
        </div>

        {/* Posture Checks */}
        <div className="p-4 rounded-2xl bg-zinc-100/50 dark:bg-[#121615]/60 border border-stone-200 dark:border-white/5 flex flex-col justify-between space-y-3 transition-colors duration-200">
          <div className="flex items-center justify-between text-teal-400">
            <UserCheck className="w-5 h-5" />
            <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400">{t.target}: 5+</span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display tabular-nums tracking-tighter text-stone-900 dark:text-stone-200 transition-colors duration-200">
              {stats.postureChecks}
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 font-medium transition-colors duration-200">
              {t.statPosture}
            </p>
          </div>
        </div>

        {/* Hydration */}
        <div className="p-4 rounded-2xl bg-zinc-100/50 dark:bg-[#121615]/60 border border-stone-200 dark:border-white/5 flex flex-col justify-between space-y-3 transition-colors duration-200">
          <div className="flex items-center justify-between text-sky-400">
            <Droplet className="w-5 h-5" />
            <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400">2000 ml</span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display tabular-nums tracking-tighter text-stone-900 dark:text-stone-200 transition-colors duration-200">
              {stats.waterMl}
              <span className="text-xs font-normal text-zinc-400 ml-1">ml</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 font-medium transition-colors duration-200">
              {t.statHydration}
            </p>
          </div>
        </div>

        {/* Focus Time */}
        <div className="p-4 rounded-2xl bg-zinc-100/50 dark:bg-[#121615]/60 border border-stone-200 dark:border-white/5 flex flex-col justify-between space-y-3 transition-colors duration-200">
          <div className="flex items-center justify-between text-amber-400">
            <Clock className="w-5 h-5" />
            <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400">{t.paced}</span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display tabular-nums tracking-tighter text-stone-900 dark:text-stone-200 transition-colors duration-200">
              {stats.focusMinutes}
              <span className="text-xs font-normal text-zinc-400 ml-1">{t.minutes}</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 font-medium transition-colors duration-200">
              {t.statFocusTime}
            </p>
          </div>
        </div>
      </div>

      {/* Clinical Ergonomic Insight Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 dark:from-emerald-950/30 via-white dark:via-zinc-900/60 to-zinc-50 dark:to-zinc-950/60 border border-emerald-200 dark:border-emerald-900/30 flex items-start sm:items-center gap-3 transition-colors duration-200">
        <div className="p-2 rounded-xl bg-emerald-50 dark:bg-[#4E8768]/10 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-[#5E9C76] flex-shrink-0 transition-colors duration-200">
          <Zap className="w-4 h-4" />
        </div>
        <p className="text-xs text-stone-900 dark:text-stone-300 leading-relaxed transition-colors duration-200">
          {t.scoreInsight}
        </p>
      </div>
    </section>
  );
};
