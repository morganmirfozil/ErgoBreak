import React from 'react';

export const ExerciseVisual = ({ visualType, isPaused = false }) => {
  // Animated SVG illustrations tailored to biomechanical ergonomic movements
  return (
    <div className="relative w-full h-48 md:h-56 rounded-2xl bg-zinc-100/80 dark:bg-[#121615]/80 border border-stone-200 dark:border-white/5 flex items-center justify-center overflow-hidden shadow-inner transition-colors duration-200">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Grid texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}
      />

      {/* Visual Renderings */}
      {visualType === 'eye-focus' && (
        <svg viewBox="0 0 200 120" className="w-44 h-32 text-emerald-400">
          <ellipse cx="100" cy="60" rx="60" ry="32" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="100" cy="60" r="18" fill="rgba(16, 185, 129, 0.15)" stroke="currentColor" strokeWidth="2" />
          <circle 
            cx="100" 
            cy="60" 
            r="8" 
            fill="#10b981" 
            className={!isPaused ? "animate-ping" : ""}
            style={{ animationDuration: '3s' }}
          />
          {/* 20ft focus distance rays */}
          <line x1="100" y1="15" x2="100" y2="5" stroke="#34d399" strokeWidth="2" strokeDasharray="2 2" />
          <line x1="145" y1="30" x2="155" y2="20" stroke="#34d399" strokeWidth="2" strokeDasharray="2 2" />
          <line x1="55" y1="30" x2="45" y2="20" stroke="#34d399" strokeWidth="2" strokeDasharray="2 2" />
        </svg>
      )}

      {visualType === 'eye-palming' && (
        <svg viewBox="0 0 200 120" className="w-44 h-32 text-amber-400">
          {/* Eye arches */}
          <path d="M55 55 Q75 42 95 55" fill="none" stroke="#71717a" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M105 55 Q125 42 145 55" fill="none" stroke="#71717a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Warm glowing cupped hands */}
          <path 
            d="M45 75 C45 45, 60 35, 80 40 C95 45, 95 75, 75 80 Z" 
            fill="rgba(245, 158, 11, 0.2)" 
            stroke="currentColor" 
            strokeWidth="2"
            className={!isPaused ? "animate-pulse" : ""}
          />
          <path 
            d="M155 75 C155 45, 140 35, 120 40 C105 45, 105 75, 125 80 Z" 
            fill="rgba(245, 158, 11, 0.2)" 
            stroke="currentColor" 
            strokeWidth="2"
            className={!isPaused ? "animate-pulse" : ""}
          />
          {/* Thermal heat waves */}
          <path d="M70 30 Q75 25 80 30" fill="none" stroke="#f59e0b" strokeWidth="1.5" className="animate-bounce" />
          <path d="M120 30 Q125 25 130 30" fill="none" stroke="#f59e0b" strokeWidth="1.5" className="animate-bounce" />
        </svg>
      )}

      {visualType === 'eye-rolls' && (
        <svg viewBox="0 0 200 120" className="w-44 h-32 text-emerald-400">
          <ellipse cx="100" cy="60" rx="50" ry="28" fill="none" stroke="#52525b" strokeWidth="2" />
          {/* Circular orbit track */}
          <circle cx="100" cy="60" r="22" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          {/* Moving pupil */}
          <g className={!isPaused ? "origin-[100px_60px] animate-spin" : ""} style={{ animationDuration: '4s' }}>
            <circle cx="100" cy="38" r="7" fill="#10b981" />
            <circle cx="100" cy="38" r="3" fill="#ffffff" />
          </g>
        </svg>
      )}

      {visualType === 'neck-tilt' && (
        <svg viewBox="0 0 200 120" className="w-44 h-32 text-emerald-400">
          {/* Torso & Shoulders */}
          <path d="M60 105 L80 90 L120 90 L140 105" fill="none" stroke="#52525b" strokeWidth="3" strokeLinecap="round" />
          {/* Spine stem */}
          <line x1="100" y1="90" x2="100" y2="65" stroke="#71717a" strokeWidth="3" strokeDasharray="3 3" />
          {/* Tilting head */}
          <g className={!isPaused ? "origin-[100px_70px] animate-pulse" : ""}>
            <circle cx="100" cy="45" r="18" fill="rgba(16, 185, 129, 0.15)" stroke="currentColor" strokeWidth="2.5" />
            <path d="M86 42 Q100 48 114 42" stroke="#34d399" strokeWidth="1.5" fill="none" />
            {/* Tilt angle indicator */}
            <path d="M125 35 Q135 45 125 55" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="2 2" />
            <path d="M123 55 L127 57 L129 52" fill="none" stroke="#34d399" strokeWidth="2" />
          </g>
        </svg>
      )}

      {visualType === 'chin-tuck' && (
        <svg viewBox="0 0 200 120" className="w-44 h-32 text-emerald-400">
          {/* Torso profile */}
          <path d="M70 110 Q90 95 105 95" fill="none" stroke="#52525b" strokeWidth="3" strokeLinecap="round" />
          {/* Cervical spine vertebrae */}
          <circle cx="102" cy="85" r="3" fill="#71717a" />
          <circle cx="100" cy="72" r="3" fill="#71717a" />
          <circle cx="98" cy="59" r="3" fill="#71717a" />
          {/* Head profile */}
          <g className={!isPaused ? "animate-pulse" : ""}>
            <circle cx="95" cy="42" r="18" fill="rgba(16, 185, 129, 0.12)" stroke="currentColor" strokeWidth="2.5" />
            <path d="M110 40 L118 42 L112 48 L105 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* Horizontal retraction arrow */}
            <line x1="125" y1="48" x2="108" y2="48" stroke="#34d399" strokeWidth="2" strokeDasharray="3 2" />
            <path d="M112 44 L106 48 L112 52" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      )}

      {visualType === 'trapezius-stretch' && (
        <svg viewBox="0 0 200 120" className="w-44 h-32 text-emerald-400">
          <circle cx="100" cy="35" r="16" fill="none" stroke="#52525b" strokeWidth="2" />
          {/* Trapezius muscles highlighted */}
          <path 
            d="M100 50 L70 70 L80 95 L100 80 L120 95 L130 70 Z" 
            fill="rgba(16, 185, 129, 0.2)" 
            stroke="currentColor" 
            strokeWidth="2"
            className={!isPaused ? "animate-pulse" : ""}
          />
          {/* 45 degree stretch arrow */}
          <path d="M110 32 L125 20 M120 18 L126 19 L126 25" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {visualType === 'spine-twist' && (
        <svg viewBox="0 0 200 120" className="w-44 h-32 text-emerald-400">
          {/* Base Chair seat */}
          <line x1="60" y1="100" x2="140" y2="100" stroke="#52525b" strokeWidth="3" strokeLinecap="round" />
          {/* Torso rotated */}
          <circle cx="100" cy="30" r="14" fill="none" stroke="#71717a" strokeWidth="2" />
          <path d="M85 55 Q100 50 115 55 L110 95 Q100 90 90 95 Z" fill="rgba(16, 185, 129, 0.15)" stroke="currentColor" strokeWidth="2" />
          {/* Rotational dynamic arrows */}
          <path 
            d="M70 65 Q100 45 130 65" 
            fill="none" 
            stroke="#34d399" 
            strokeWidth="2.5" 
            strokeDasharray="4 3" 
            className={!isPaused ? "animate-pulse" : ""}
          />
          <path d="M126 58 L132 65 L125 69" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {visualType === 'pelvic-tilt' && (
        <svg viewBox="0 0 200 120" className="w-44 h-32 text-emerald-400">
          <circle cx="85" cy="35" r="13" fill="none" stroke="#52525b" strokeWidth="2" />
          {/* Flexible spinal column */}
          <path 
            d="M87 48 Q100 70 92 88" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            className={!isPaused ? "animate-pulse" : ""}
          />
          {/* Pelvis bowl tilting */}
          <path 
            d="M75 92 Q92 104 110 90" 
            fill="rgba(16, 185, 129, 0.25)" 
            stroke="#10b981" 
            strokeWidth="2.5"
            className={!isPaused ? "origin-[92px_95px] animate-pulse" : ""}
          />
          {/* Bi-directional tilt arrows */}
          <path d="M65 92 Q72 82 82 85" fill="none" stroke="#34d399" strokeWidth="1.5" />
          <path d="M120 92 Q112 82 102 85" fill="none" stroke="#34d399" strokeWidth="1.5" />
        </svg>
      )}

      {visualType === 'cat-cow' && (
        <svg viewBox="0 0 200 120" className="w-44 h-32 text-emerald-400">
          {/* Head & Neck */}
          <circle cx="80" cy="38" r="12" fill="none" stroke="#71717a" strokeWidth="2" />
          {/* Undulating spine curve */}
          <path 
            d="M85 50 Q120 30 115 85" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="3.5" 
            strokeLinecap="round"
            className={!isPaused ? "animate-pulse" : ""}
          />
          <path d="M115 85 L130 100" stroke="#52525b" strokeWidth="3" strokeLinecap="round" />
          {/* Expansion indicator */}
          <circle cx="108" cy="55" r="6" fill="rgba(16, 185, 129, 0.2)" stroke="#34d399" strokeWidth="1.5" />
        </svg>
      )}

      {visualType === 'scapular-pinch' && (
        <svg viewBox="0 0 200 120" className="w-44 h-32 text-emerald-400">
          <circle cx="100" cy="25" r="12" fill="none" stroke="#52525b" strokeWidth="2" />
          <line x1="100" y1="38" x2="100" y2="100" stroke="#3f3f46" strokeWidth="2" strokeDasharray="3 3" />
          {/* Two scapula wings pinching inward */}
          <path 
            d="M80 45 L68 70 L85 75 Z" 
            fill="rgba(16, 185, 129, 0.25)" 
            stroke="currentColor" 
            strokeWidth="2"
            className={!isPaused ? "animate-pulse" : ""}
          />
          <path 
            d="M120 45 L132 70 L115 75 Z" 
            fill="rgba(16, 185, 129, 0.25)" 
            stroke="currentColor" 
            strokeWidth="2"
            className={!isPaused ? "animate-pulse" : ""}
          />
          {/* Arrows pointing toward midline */}
          <line x1="62" y1="60" x2="74" y2="60" stroke="#34d399" strokeWidth="2" />
          <line x1="138" y1="60" x2="126" y2="60" stroke="#34d399" strokeWidth="2" />
        </svg>
      )}

      {visualType === 'shoulder-rolls' && (
        <svg viewBox="0 0 200 120" className="w-44 h-32 text-emerald-400">
          <circle cx="100" cy="35" r="14" fill="none" stroke="#52525b" strokeWidth="2" />
          {/* Torso */}
          <path d="M75 95 L85 65 L115 65 L125 95" fill="none" stroke="#52525b" strokeWidth="2.5" />
          {/* Left and right shoulder circular tracks */}
          <g className={!isPaused ? "origin-[70px_60px] animate-spin" : ""} style={{ animationDuration: '3s' }}>
            <circle cx="70" cy="60" r="14" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="70" cy="46" r="4" fill="#34d399" />
          </g>
          <g className={!isPaused ? "origin-[130px_60px] animate-spin" : ""} style={{ animationDuration: '3s' }}>
            <circle cx="130" cy="60" r="14" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="130" cy="46" r="4" fill="#34d399" />
          </g>
        </svg>
      )}

      {visualType === 'overhead-stretch' && (
        <svg viewBox="0 0 200 120" className="w-44 h-32 text-emerald-400">
          {/* Head & Torso */}
          <circle cx="100" cy="55" r="12" fill="none" stroke="#52525b" strokeWidth="2" />
          <line x1="100" y1="67" x2="100" y2="105" stroke="#52525b" strokeWidth="2.5" />
          {/* Arms reaching overhead with interlocked hands */}
          <path 
            d="M80 80 L75 50 L95 22 L100 18 L105 22 L125 50 L120 80" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={!isPaused ? "animate-pulse" : ""}
          />
          {/* Uplifting upward arrows */}
          <line x1="100" y1="12" x2="100" y2="2" stroke="#34d399" strokeWidth="2" />
          <path d="M96 6 L100 2 L104 6" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
};
