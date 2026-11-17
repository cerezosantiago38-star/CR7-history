import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';
import { Volume2, VolumeX, RotateCcw, Sparkles, Trophy, Award, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

interface GameStats {
  goals: number;
  shots: number;
  currentStreak: number;
  bestStreak: number;
}

type ShotType = 'knuckleball' | 'curled' | 'power';
type GoalkeeperDifficulty = 'amateur' | 'pro' | 'legend';

export const GameSection: React.FC = () => {
  // Game states
  const [stats, setStats] = useState<GameStats>({
    goals: 0,
    shots: 0,
    currentStreak: 0,
    bestStreak: 0,
  });

  // Player position (X coordinate on pitch, -100 to 100)
  const [cr7X, setCr7X] = useState<number>(0);
  
  // Aim coordinates inside the goal (-85 to 85 horizontally, 15 to 85 vertically)
  const [targetX, setTargetX] = useState<number>(35);
  const [targetY, setTargetY] = useState<number>(65);

  // Shot properties
  const [shotPower, setShotPower] = useState<number>(85); // 50 to 100
  const [shotType, setShotType] = useState<ShotType>('knuckleball');
  const [difficulty, setDifficulty] = useState<GoalkeeperDifficulty>('pro');

  // Animation states
  const [isShooting, setIsShooting] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [lastOutcome, setLastOutcome] = useState<{
    result: 'goal' | 'saved' | 'post' | 'out';
    message: string;
    speedKmH: number;
  } | null>(null);

  // Ball physics animation state
  const [ballState, setBallState] = useState<{
    x: number; // percentage (-100 to 100)
    y: number; // 0 to 100
    scale: number;
    rotation: number;
    visible: boolean;
  }>({
    x: 0,
    y: 15,
    scale: 1,
    rotation: 0,
    visible: true,
  });

  // Goalkeeper state
  const [keeperPos, setKeeperPos] = useState<{
    x: number; // -70 to 70
    y: number; // height offset
    diving: 'idle' | 'dive-left' | 'dive-right' | 'jump-high' | 'dive-low-left' | 'dive-low-right';
    isSaved: boolean;
  }>({
    x: 0,
    y: 0,
    diving: 'idle',
    isSaved: false,
  });

  // Sound toggle
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());

  // Idle keeper gentle patrol when not shooting
  useEffect(() => {
    if (isShooting) return;
    const interval = setInterval(() => {
      setKeeperPos(prev => {
        // Subtle anticipatory drift
        const delta = (Math.random() - 0.5) * 16;
        const newX = Math.max(-25, Math.min(25, prev.x + delta));
        return { ...prev, x: newX, diving: 'idle', isSaved: false };
      });
    }, 700);
    return () => clearInterval(interval);
  }, [isShooting]);

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleResetStats = () => {
    setStats({
      goals: 0,
      shots: 0,
      currentStreak: 0,
      bestStreak: 0,
    });
    setLastOutcome(null);
  };

  // Execute CR7 Free Kick / Penalty
  const executeShot = useCallback(() => {
    if (isShooting) return;

    setIsShooting(true);
    setLastOutcome(null);
    setShowCelebration(false);

    // Whistle sound
    soundManager.playWhistle();

    // Start with CR7 breathing and run-up sequence
    setTimeout(() => {
      // Impact kick
      soundManager.playKick();

      // Calculate shot speed
      const speedKmH = Math.round(92 + (shotPower * 0.35) + (shotType === 'power' ? 12 : 0));

      // Calculate goalkeeper reaction based on difficulty and aim
      // Goalkeeper dive reaction
      let keeperReactionDelay = 220;
      let keeperAccuracy = 0.65; // chance to dive to correct side

      if (difficulty === 'amateur') {
        keeperReactionDelay = 340;
        keeperAccuracy = 0.45;
      } else if (difficulty === 'legend') {
        keeperReactionDelay = 140;
        keeperAccuracy = 0.85;
      }

      // Keeper dive destination
      const diveToCorrectSide = Math.random() < keeperAccuracy;
      const targetSideSign = targetX >= 0 ? 1 : -1;
      const keeperDiveX = diveToCorrectSide
        ? targetSideSign * (Math.abs(targetX) * 0.95 + (Math.random() * 10 - 5))
        : -targetSideSign * (40 + Math.random() * 30);

      // Determine shot trajectory with curve/wobble
      const finalBallX = targetX;
      const finalBallY = targetY;

      // Animate ball flight (total duration ~600ms)
      const startTime = performance.now();
      const flightDuration = 650 - (shotPower * 2);

      // Animate keeper dive
      setTimeout(() => {
        let diveAnim: typeof keeperPos.diving = 'dive-right';
        if (keeperDiveX < -15) {
          diveAnim = finalBallY > 55 ? 'dive-left' : 'dive-low-left';
        } else if (keeperDiveX > 15) {
          diveAnim = finalBallY > 55 ? 'dive-right' : 'dive-low-right';
        } else {
          diveAnim = 'jump-high';
        }

        setKeeperPos({
          x: keeperDiveX,
          y: finalBallY > 50 ? 20 : 0,
          diving: diveAnim,
          isSaved: false,
        });
      }, keeperReactionDelay);

      // Animation frame loop for ball
      const animateBall = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(1, elapsed / flightDuration);

        // Curvature math
        let curveOffset = 0;
        if (shotType === 'curled') {
          // Arc curve
          curveOffset = Math.sin(progress * Math.PI) * (cr7X > 0 ? -18 : 18);
        } else if (shotType === 'knuckleball') {
          // Unpredictable wobble
          curveOffset = Math.sin(progress * Math.PI * 4) * 6 * (1 - progress);
        }

        const currentX = cr7X + (finalBallX - cr7X) * progress + curveOffset;
        const currentY = 15 + (finalBallY - 15) * progress;
        const currentScale = 1 - (progress * 0.55); // Ball scales down as it moves into the distance

        setBallState({
          x: currentX,
          y: currentY,
          scale: currentScale,
          rotation: progress * 720,
          visible: true,
        });

        if (progress < 1) {
          requestAnimationFrame(animateBall);
        } else {
          // Ball arrived at goal line! Evaluate outcome
          evaluateOutcome(finalBallX, finalBallY, keeperDiveX, speedKmH);
        }
      };

      requestAnimationFrame(animateBall);
    }, 450); // Run-up time
  }, [isShooting, shotPower, shotType, difficulty, targetX, targetY, cr7X]);

  // Outcome resolution
  const evaluateOutcome = (
    ballX: number,
    ballY: number,
    keeperX: number,
    speedKmH: number
  ) => {
    // Goal dimensions: X between -75 and 75, Y between 10 and 85
    const isInsideGoal = Math.abs(ballX) <= 72 && ballY >= 12 && ballY <= 82;
    const isHittingPost = (Math.abs(Math.abs(ballX) - 73) <= 4 && ballY <= 84) || (Math.abs(ballY - 83) <= 3 && Math.abs(ballX) <= 75);

    // Distance between keeper hands and ball
    const keeperDistance = Math.abs(ballX - keeperX);
    const keeperSaved = isInsideGoal && keeperDistance <= 22;

    if (keeperSaved) {
      soundManager.playSave();
      setKeeperPos(prev => ({ ...prev, isSaved: true }));
      setLastOutcome({
        result: 'saved',
        message: '¡PARADÓN DEL ARQUERO! Mano cambiada milagrosa a mano cambiada.',
        speedKmH,
      });
      setStats(prev => ({
        ...prev,
        shots: prev.shots + 1,
        currentStreak: 0,
      }));
    } else if (isHittingPost) {
      soundManager.playPostHit();
      setLastOutcome({
        result: 'post',
        message: '¡AL PALO! El disparo estremeció el poste y rebotó fuera.',
        speedKmH,
      });
      setStats(prev => ({
        ...prev,
        shots: prev.shots + 1,
        currentStreak: 0,
      }));
    } else if (isInsideGoal) {
      soundManager.playGoal();
      triggerConfetti();
      setShowCelebration(true);
      setLastOutcome({
        result: 'goal',
        message: '¡¡¡GOOOOOOOLAAAAZO DE CRISTIANO RONALDO!!! ¡¡SIIIUUU!!',
        speedKmH,
      });
      setStats(prev => {
        const nextStreak = prev.currentStreak + 1;
        return {
          goals: prev.goals + 1,
          shots: prev.shots + 1,
          currentStreak: nextStreak,
          bestStreak: Math.max(prev.bestStreak, nextStreak),
        };
      });
    } else {
      setLastOutcome({
        result: 'out',
        message: '¡FUERA! El disparo se marchó desviado de los tres palos.',
        speedKmH,
      });
      setStats(prev => ({
        ...prev,
        shots: prev.shots + 1,
        currentStreak: 0,
      }));
    }

    // Reset ball for next attempt after brief pause
    setTimeout(() => {
      setIsShooting(false);
      setBallState({
        x: cr7X,
        y: 15,
        scale: 1,
        rotation: 0,
        visible: true,
      });
      setKeeperPos({
        x: 0,
        y: 0,
        diving: 'idle',
        isSaved: false,
      });
    }, 2400);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#EAB308', '#EF4444', '#10B981', '#FFFFFF'],
      });
    } catch {
      // Fallback safe
    }
  };

  // Keyboard shortcut for shooting
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isShooting) {
        e.preventDefault();
        executeShot();
      } else if (e.code === 'ArrowLeft' && !isShooting) {
        setCr7X(prev => Math.max(-70, prev - 10));
      } else if (e.code === 'ArrowRight' && !isShooting) {
        setCr7X(prev => Math.min(70, prev + 10));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [executeShot, isShooting]);

  const accuracy = stats.shots > 0 ? Math.round((stats.goals / stats.shots) * 100) : 0;

  return (
    <section className="relative w-full max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Header section */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Simulador Interactivo de Penaltis & Tiros Libres</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            CR7 Arena: Desafío de Gol al Portero
          </h2>
          <p className="text-sm text-neutral-400 mt-1 max-w-xl">
            Mueve la posición de Cristiano Ronaldo en el campo, ajusta el ángulo a la portería, elige el tipo de tiro y bate al arquero rival con su legendario festejo «¡SIIIUUU!».
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-900 text-xs font-medium text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
            title="Activar/Desactivar sonido de estadio"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            <span>{isMuted ? 'Silenciado' : 'Efectos Activos'}</span>
          </button>

          <button
            onClick={handleResetStats}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60 text-xs font-medium text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 transition-colors"
            title="Reiniciar estadísticas del juego"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Scoreboard HUD */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3 flex flex-col">
          <span className="text-xs text-neutral-400 font-medium">Goles Anotados</span>
          <span className="text-2xl font-bold font-mono-num text-amber-400">{stats.goals}</span>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3 flex flex-col">
          <span className="text-xs text-neutral-400 font-medium">Tiros Totales</span>
          <span className="text-2xl font-bold font-mono-num text-neutral-200">{stats.shots}</span>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3 flex flex-col">
          <span className="text-xs text-neutral-400 font-medium">Efectividad</span>
          <span className="text-2xl font-bold font-mono-num text-emerald-400">{accuracy}%</span>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3 flex flex-col">
          <span className="text-xs text-neutral-400 font-medium">Racha Actual</span>
          <span className="text-2xl font-bold font-mono-num text-blue-400">🔥 {stats.currentStreak}</span>
        </div>
        <div className="col-span-2 sm:col-span-1 bg-neutral-900/80 border border-neutral-800 rounded-xl p-3 flex flex-col">
          <span className="text-xs text-neutral-400 font-medium">Mejor Racha</span>
          <span className="text-2xl font-bold font-mono-num text-purple-400">⚡ {stats.bestStreak}</span>
        </div>
      </div>

      {/* Main Pitch Stadium Container */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-linear-to-b from-neutral-950 via-slate-950 to-neutral-900 shadow-2xl">
        
        {/* Stadium Stands & Floodlights ambient header */}
        <div className="h-16 w-full bg-linear-to-b from-neutral-900 to-neutral-950 border-b border-neutral-800/80 flex items-center justify-between px-6 relative overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-neutral-300 uppercase">
              Estádio Santiago Bernabéu · Minuto 90+3
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs text-neutral-400">
            <span>Árbitro listo</span>
            <span>·</span>
            <span>Barrera colocada</span>
            <span>·</span>
            <span className="text-amber-400 font-semibold">Tiro decisivo</span>
          </div>
        </div>

        {/* 3D Perspective Pitch Canvas Area */}
        <div className="relative h-[380px] sm:h-[460px] w-full overflow-hidden select-none bg-linear-to-b from-emerald-950/70 via-emerald-900/90 to-emerald-800">
          
          {/* Turf Stripes pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0,0,0,0.3) 40px, rgba(0,0,0,0.3) 80px)'
            }}
          />

          {/* Penalty Box Line Markings */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 sm:w-3/5 h-48 border-x-2 border-b-2 border-white/30 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/5 h-20 border-x-2 border-b-2 border-white/30 pointer-events-none" />
          {/* Penalty Spot */}
          <div className="absolute top-44 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white/70 shadow-sm pointer-events-none" />
          {/* Penalty Arc */}
          <div className="absolute top-44 left-1/2 -translate-x-1/2 w-32 h-16 rounded-b-full border-b-2 border-dashed border-white/25 pointer-events-none" />

          {/* Goal Post Frame */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[74%] sm:w-[62%] h-36 border-t-8 border-x-8 border-neutral-100 rounded-t-sm shadow-2xl bg-neutral-900/35 backdrop-blur-[1px]">
            {/* Goal Netting Mesh Pattern */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
                backgroundSize: '12px 12px',
              }}
            />

            {/* Click/Tap inside the goal to set aim */}
            <div
              onClick={(e) => {
                if (isShooting) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const clickY = e.clientY - rect.top;
                // Convert to percentage
                const pctX = ((clickX / rect.width) * 160) - 80;
                const pctY = ((rect.height - clickY) / rect.height) * 80 + 10;
                setTargetX(Math.max(-75, Math.min(75, Math.round(pctX))));
                setTargetY(Math.max(15, Math.min(85, Math.round(pctY))));
              }}
              className="absolute inset-0 cursor-crosshair z-10"
              title="Haz clic dentro de la portería para apuntar tu disparo"
            >
              {/* Aiming Reticle Indicator */}
              <div
                className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75 flex items-center justify-center"
                style={{
                  left: `${((targetX + 80) / 160) * 100}%`,
                  bottom: `${((targetY - 10) / 80) * 100}%`,
                }}
              >
                <div className="w-7 h-7 rounded-full border-2 border-amber-400 bg-amber-400/20 flex items-center justify-center animate-pulse">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                </div>
              </div>
            </div>

            {/* Goalkeeper (Arquero) */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none transition-transform duration-200 ease-out z-20"
              style={{
                transform: `translateX(calc(-50% + ${keeperPos.x * 2.2}px)) translateY(${keeperPos.diving === 'jump-high' ? '-24px' : '0px'}) rotate(${keeperPos.diving.includes('left') ? '-25deg' : keeperPos.diving.includes('right') ? '25deg' : '0deg'})`,
              }}
            >
              {/* Goalkeeper character SVG / Silhouette */}
              <div className="relative flex flex-col items-center">
                {/* Keeper Gloves extended */}
                <div className="flex justify-between w-14 -mb-1">
                  <div className={`w-3.5 h-3.5 rounded-full bg-amber-400 border border-black shadow-sm ${keeperPos.diving.includes('left') ? '-translate-y-2' : ''}`} />
                  <div className={`w-3.5 h-3.5 rounded-full bg-amber-400 border border-black shadow-sm ${keeperPos.diving.includes('right') ? '-translate-y-2' : ''}`} />
                </div>
                {/* Keeper Head */}
                <div className="w-6 h-6 rounded-full bg-amber-200 border border-amber-900 shadow-xs" />
                {/* Keeper Body (Neon Green / Cyan Keeper Kit) */}
                <div className="w-10 h-14 bg-linear-to-b from-cyan-500 to-cyan-600 rounded-t-lg border border-black/40 flex items-center justify-center shadow-md">
                  <span className="text-[9px] font-black text-black tracking-tight">1</span>
                </div>
                {/* Shorts & Legs */}
                <div className="flex gap-1 w-9">
                  <div className="w-3.5 h-7 bg-neutral-900 rounded-b-sm border-t border-cyan-400" />
                  <div className="w-3.5 h-7 bg-neutral-900 rounded-b-sm border-t border-cyan-400" />
                </div>
                {/* Save aura if saved */}
                {keeperPos.isSaved && (
                  <div className="absolute -top-3 px-2 py-0.5 rounded-md bg-red-600 text-[10px] font-bold text-white shadow-lg animate-bounce">
                    ¡ATAJADO!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Flying Ball */}
          <div
            className="absolute left-1/2 pointer-events-none z-30 transition-all duration-75"
            style={{
              bottom: `${ballState.y}%`,
              transform: `translateX(calc(-50% + ${ballState.x * 2.2}px)) scale(${ballState.scale}) rotate(${ballState.rotation}deg)`,
              opacity: ballState.visible ? 1 : 0,
            }}
          >
            {/* Realistic Soccer Ball */}
            <div className="w-8 h-8 rounded-full bg-white border-2 border-neutral-900 shadow-xl flex items-center justify-center relative overflow-hidden">
              <div className="w-3 h-3 bg-neutral-900 rounded-xs rotate-45" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-neutral-900 rounded-xs rotate-12" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-neutral-900 rounded-xs -rotate-12" />
            </div>
          </div>

          {/* Cristiano Ronaldo Player on Pitch (Moveable) */}
          <div
            className="absolute bottom-4 left-1/2 pointer-events-none transition-all duration-150 z-20"
            style={{
              transform: `translateX(calc(-50% + ${cr7X * 2.2}px)) ${isShooting ? 'translateY(-10px) scale(0.96)' : ''}`,
            }}
          >
            {/* Player Shadow */}
            <div className="w-20 h-5 bg-black/50 rounded-full blur-xs mx-auto mb-1" />

            {/* CR7 Character Graphic */}
            <div className="relative flex flex-col items-center">
              {/* Head with styled hair */}
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-amber-100 border border-amber-900/60 shadow-xs relative">
                  {/* Styled fade hair */}
                  <div className="absolute -top-1 left-0 right-0 h-3 bg-neutral-900 rounded-t-full" />
                </div>
              </div>

              {/* Athletic Torso with #7 Jersey (Portugal Red or Madrid White style) */}
              <div className="w-12 h-14 bg-linear-to-b from-red-600 to-red-700 rounded-t-lg border-x-2 border-red-800 shadow-md flex flex-col items-center justify-center relative">
                <span className="text-[11px] font-black text-amber-300 tracking-tighter">RONALDO</span>
                <span className="text-sm font-black text-amber-300 -mt-1">7</span>
                {/* Arm left */}
                <div className={`absolute -left-2 top-2 w-2.5 h-8 bg-amber-100 rounded-full border border-neutral-800/20 ${isShooting ? '-rotate-45' : 'rotate-12'}`} />
                {/* Arm right */}
                <div className={`absolute -right-2 top-2 w-2.5 h-8 bg-amber-100 rounded-full border border-neutral-800/20 ${isShooting ? 'rotate-45' : '-rotate-12'}`} />
              </div>

              {/* Shorts & Legs in iconic wide stance */}
              <div className="relative flex justify-between w-14">
                {/* Left Leg */}
                <div className={`flex flex-col items-center transition-transform ${isShooting ? 'translate-y-1' : '-rotate-12'}`}>
                  <div className="w-4 h-6 bg-emerald-800 rounded-b-xs" />
                  <div className="w-3.5 h-8 bg-amber-100 rounded-b-xs" />
                  <div className="w-4 h-3 bg-red-600 rounded-b-xs border-t border-white" />
                  <div className="w-5 h-2.5 bg-neutral-900 rounded-xs" />
                </div>
                {/* Right Kicking Leg */}
                <div className={`flex flex-col items-center transition-transform ${isShooting ? '-translate-y-3 rotate-30 scale-110' : 'rotate-12'}`}>
                  <div className="w-4 h-6 bg-emerald-800 rounded-b-xs" />
                  <div className="w-3.5 h-8 bg-amber-100 rounded-b-xs" />
                  <div className="w-4 h-3 bg-red-600 rounded-b-xs border-t border-white" />
                  <div className="w-5 h-2.5 bg-neutral-900 rounded-xs" />
                </div>
              </div>

              {/* Name Tag */}
              <div className="mt-1 px-2 py-0.5 bg-neutral-950/80 border border-neutral-700 rounded text-[10px] font-bold text-amber-400">
                CR7
              </div>
            </div>
          </div>

          {/* Celebration Overlay Popup upon Goal */}
          {showCelebration && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center z-40 animate-in fade-in zoom-in duration-200">
              <div className="text-center p-6 bg-neutral-950/95 border-2 border-amber-500 rounded-2xl shadow-2xl max-w-sm mx-4">
                <span className="text-4xl sm:text-5xl font-black text-amber-400 tracking-wider drop-shadow-md">
                  ¡¡¡SIIIUUU!!!
                </span>
                <p className="text-white text-base sm:text-lg font-bold mt-2">
                  ¡Golazo de Cristiano Ronaldo!
                </p>
                <p className="text-xs text-neutral-300 mt-1">
                  Balón al fondo de la red con una velocidad de {lastOutcome?.speedKmH} km/h.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-amber-400 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Racha de goles: {stats.currentStreak}</span>
                </div>
              </div>
            </div>
          )}

          {/* Outcome banner in-game */}
          {lastOutcome && !showCelebration && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xl border bg-neutral-950/90 text-white border-neutral-700 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2">
                <span>{lastOutcome.message}</span>
                <span className="text-neutral-400 font-mono">({lastOutcome.speedKmH} km/h)</span>
              </div>
            </div>
          )}
        </div>

        {/* Tactical Interactive Control Board */}
        <div className="p-4 sm:p-6 bg-neutral-900 border-t border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Column 1: Cristiano Position Movement (Mobible Player) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  1. Posición de Cristiano en el Campo
                </label>
                <span className="text-xs text-neutral-400 font-mono">
                  {cr7X < -10 ? 'Perfil Izquierdo' : cr7X > 10 ? 'Perfil Derecho' : 'Centro Frontal'}
                </span>
              </div>

              {/* Slider to move player horizontally */}
              <input
                type="range"
                min="-60"
                max="60"
                value={cr7X}
                onChange={(e) => setCr7X(Number(e.target.value))}
                disabled={isShooting}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              {/* Quick Position Step Buttons */}
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setCr7X(prev => Math.max(-60, prev - 20))}
                  disabled={isShooting}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 border border-neutral-700 disabled:opacity-50"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Izquierda</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCr7X(0)}
                  disabled={isShooting}
                  className="py-1.5 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 border border-neutral-700 disabled:opacity-50"
                >
                  Centro
                </button>
                <button
                  type="button"
                  onClick={() => setCr7X(prev => Math.min(60, prev + 20))}
                  disabled={isShooting}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 border border-neutral-700 disabled:opacity-50"
                >
                  <span>Derecha</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Column 2: Shot Style & Power */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  2. Estilo de Golpeo & Potencia
                </label>
                <span className="text-xs text-amber-400 font-mono font-bold">{shotPower}%</span>
              </div>

              {/* Shot style selector */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-950 rounded-lg border border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShotType('knuckleball')}
                  disabled={isShooting}
                  className={`py-1 text-[11px] font-semibold rounded transition-colors ${shotType === 'knuckleball' ? 'bg-amber-500 text-black shadow-sm' : 'text-neutral-400 hover:text-white'}`}
                >
                  Folha Seca
                </button>
                <button
                  type="button"
                  onClick={() => setShotType('curled')}
                  disabled={isShooting}
                  className={`py-1 text-[11px] font-semibold rounded transition-colors ${shotType === 'curled' ? 'bg-amber-500 text-black shadow-sm' : 'text-neutral-400 hover:text-white'}`}
                >
                  Colocación
                </button>
                <button
                  type="button"
                  onClick={() => setShotType('power')}
                  disabled={isShooting}
                  className={`py-1 text-[11px] font-semibold rounded transition-colors ${shotType === 'power' ? 'bg-amber-500 text-black shadow-sm' : 'text-neutral-400 hover:text-white'}`}
                >
                  Bomba
                </button>
              </div>

              {/* Power Slider */}
              <input
                type="range"
                min="50"
                max="100"
                value={shotPower}
                onChange={(e) => setShotPower(Number(e.target.value))}
                disabled={isShooting}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>

            {/* Column 3: Goalkeeper Level & Fire Action */}
            <div className="space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  3. Nivel del Arquero Rival
                </label>
                <span className="text-[11px] text-neutral-400">
                  {difficulty === 'amateur' ? 'Fácil' : difficulty === 'pro' ? 'Equilibrado' : 'Modo Neuer'}
                </span>
              </div>

              {/* Difficulty selector */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDifficulty('amateur')}
                  disabled={isShooting}
                  className={`flex-1 py-1 text-xs rounded-md border text-center transition-colors ${difficulty === 'amateur' ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-semibold' : 'border-neutral-800 bg-neutral-950 text-neutral-400'}`}
                >
                  Novato
                </button>
                <button
                  type="button"
                  onClick={() => setDifficulty('pro')}
                  disabled={isShooting}
                  className={`flex-1 py-1 text-xs rounded-md border text-center transition-colors ${difficulty === 'pro' ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-semibold' : 'border-neutral-800 bg-neutral-950 text-neutral-400'}`}
                >
                  Semi-Pro
                </button>
                <button
                  type="button"
                  onClick={() => setDifficulty('legend')}
                  disabled={isShooting}
                  className={`flex-1 py-1 text-xs rounded-md border text-center transition-colors ${difficulty === 'legend' ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-semibold' : 'border-neutral-800 bg-neutral-950 text-neutral-400'}`}
                >
                  Leyenda
                </button>
              </div>

              {/* Primary Shoot Button */}
              <button
                type="button"
                onClick={executeShot}
                disabled={isShooting}
                className="w-full py-3 px-4 rounded-xl bg-linear-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>{isShooting ? '¡Cristiano ejecutando...!' : '¡DISPARAR COMO CR7!'}</span>
                <span className="hidden sm:inline-block text-[10px] font-normal opacity-75">(Espacio)</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Quick guide tips */}
      <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-neutral-400 px-2 gap-2">
        <div className="flex items-center gap-2">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Consejo: Haz clic en cualquier rincón de la red para apuntar a la escuadra o al poste contrario.</span>
        </div>
        <span className="text-neutral-400">Atajos: Flechas ◄ / ► para mover a CR7 · Barra Espaciadora para chutar</span>
      </div>
    </section>
  );
};
