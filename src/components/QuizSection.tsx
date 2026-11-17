import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, ChevronRight, BookOpen, Sparkles } from 'lucide-react';

export const QuizSection: React.FC = () => {
  // Current active question index
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // User answers record: { [questionId: number]: 'A' | 'B' | 'C' | 'D' }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  // Whether the quiz has been completed
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  // Toggle show all answers sheet at bottom
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(true);

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const userChoice = selectedAnswers[currentQ?.id];

  const handleSelectOption = (letter: 'A' | 'B' | 'C' | 'D') => {
    if (userChoice) return; // already answered this question

    const isCorrect = letter === currentQ.correctLetter;
    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playWrong();
    }

    const nextAnswers = {
      ...selectedAnswers,
      [currentQ.id]: letter,
    };
    setSelectedAnswers(nextAnswers);

    // If this was the last question, celebrate
    if (Object.keys(nextAnswers).length === QUIZ_QUESTIONS.length) {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  // Score calculations
  const totalAnswered = Object.keys(selectedAnswers).length;
  const correctCount = Object.entries(selectedAnswers).filter(([id, ans]) => {
    const q = QUIZ_QUESTIONS.find(item => item.id === Number(id));
    return q && q.correctLetter === ans;
  }).length;

  const scorePercentage = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  // Level badge based on score
  const getBadgeTitle = (pct: number) => {
    if (pct === 100) return 'Leyenda Absoluta CR7 (Nivel Balón de Oro)';
    if (pct >= 80) return 'Goleador Galáctico del Bernabéu';
    if (pct >= 60) return 'Promesa Estrella de Old Trafford';
    return 'Novato de la Academia de Madeira';
  };

  return (
    <section className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>Trivia & Desafío de Conocimiento</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          Sesión de Preguntas sobre Cristiano Ronaldo
        </h2>
        <p className="text-sm text-neutral-400 mt-1">
          Pon a prueba tu conocimiento sobre la historia, trofeos, récords y lujos del Bicho. Debajo de cada pregunta tienes las opciones en formato A, B, C, D con su respectiva solución explicada.
        </p>
      </div>

      {/* Progress & Score Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex flex-col">
          <span className="text-xs text-neutral-400">Progreso</span>
          <span className="text-xl font-bold font-mono-num text-white">
            {currentIndex + 1} / {QUIZ_QUESTIONS.length}
          </span>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex flex-col">
          <span className="text-xs text-neutral-400">Aciertos</span>
          <span className="text-xl font-bold font-mono-num text-emerald-400">
            {correctCount}
          </span>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex flex-col">
          <span className="text-xs text-neutral-400">Efectividad</span>
          <span className="text-xl font-bold font-mono-num text-amber-400">
            {scorePercentage}%
          </span>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-400">Reiniciar</span>
            <div className="text-xs font-semibold text-neutral-300">Nueva ronda</div>
          </div>
          <button
            onClick={handleRestartQuiz}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white"
            title="Reiniciar Trivia"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Quiz Card */}
      {!isCompleted ? (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 shadow-xl mb-10">
          
          {/* Question Header */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-4 pb-3 border-b border-neutral-800">
            <span className="font-mono text-amber-400 font-bold">
              Pregunta #{currentQ.id}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
              Dificultad: {currentQ.difficulty}
            </span>
          </div>

          {/* Question Text */}
          <h3 className="text-lg sm:text-xl font-bold text-white leading-snug mb-6">
            {currentQ.question}
          </h3>

          {/* ABC Options Underneath the Question (ABCAJITO) */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((opt) => {
              const isSelected = userChoice === opt.letter;
              const isCorrectAnswer = opt.letter === currentQ.correctLetter;
              const hasAnswered = !!userChoice;

              let buttonStyle = 'bg-neutral-950 border-neutral-800 text-neutral-200 hover:border-neutral-600 hover:bg-neutral-800/80';
              let badgeStyle = 'bg-neutral-800 text-neutral-300 border-neutral-700';

              if (hasAnswered) {
                if (isCorrectAnswer) {
                  buttonStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-100 shadow-md shadow-emerald-900/20';
                  badgeStyle = 'bg-emerald-500 text-black border-emerald-400 font-black';
                } else if (isSelected && !isCorrectAnswer) {
                  buttonStyle = 'bg-red-950/70 border-red-500 text-red-200';
                  badgeStyle = 'bg-red-500 text-white border-red-400 font-black';
                } else {
                  buttonStyle = 'bg-neutral-950/50 border-neutral-800/60 text-neutral-500 opacity-60';
                  badgeStyle = 'bg-neutral-900 text-neutral-500 border-neutral-800';
                }
              }

              return (
                <button
                  key={opt.letter}
                  type="button"
                  onClick={() => handleSelectOption(opt.letter)}
                  disabled={hasAnswered}
                  className={`w-full p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all ${buttonStyle} disabled:cursor-default`}
                >
                  {/* Distinct ABC Letter Box */}
                  <span className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${badgeStyle}`}>
                    {opt.letter}
                  </span>

                  {/* Option Text */}
                  <span className="text-sm font-medium leading-relaxed flex-1">
                    {opt.text}
                  </span>

                  {/* Status Indicator Icon */}
                  {hasAnswered && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {hasAnswered && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation Box */}
          {userChoice && (
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 mb-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 mb-1">
                {userChoice === currentQ.correctLetter ? (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    ¡CORRECTO! Opción [{currentQ.correctLetter}]
                  </span>
                ) : (
                  <span className="text-xs font-bold text-red-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    INCORRECTO. La respuesta correcta era la opción [{currentQ.correctLetter}]
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
            <button
              onClick={handlePrevQuestion}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Anterior
            </button>

            {currentIndex < QUIZ_QUESTIONS.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <span>{userChoice ? 'Siguiente Pregunta' : 'Saltar'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsCompleted(true)}
                className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <span>Ver Resultados Finales</span>
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Results Card */
        <div className="rounded-2xl border border-amber-500/40 bg-neutral-900 p-8 text-center mb-10 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            ¡Has completado la Trivia CR7!
          </h3>

          <p className="text-base text-amber-400 font-bold mt-1">
            {getBadgeTitle(scorePercentage)}
          </p>

          <p className="text-sm text-neutral-300 mt-2 max-w-md mx-auto">
            Acertaste {correctCount} de {QUIZ_QUESTIONS.length} preguntas con un porcentaje de efectividad del {scorePercentage}%.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
            >
              Jugar de Nuevo
            </button>
            <button
              onClick={() => { setIsCompleted(false); setCurrentIndex(0); }}
              className="px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors"
            >
              Revisar Pregunta por Pregunta
            </button>
          </div>
        </div>
      )}

      {/* SOLUCIONARIO COMPLETO Y LISTADO ABC ABAJITO (Requested by user) */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Solucionario Completo: Guía ABC de Respuestas
            </h4>
          </div>
          <button
            onClick={() => setShowAnswerKey(!showAnswerKey)}
            className="text-xs text-amber-400 hover:underline"
          >
            {showAnswerKey ? 'Ocultar ABC' : 'Mostrar ABC'}
          </button>
        </div>

        {showAnswerKey && (
          <div className="space-y-4 pt-2">
            <p className="text-xs text-neutral-400">
              Aquí tienes la lista completa de preguntas con su respectiva opción correcta (A, B, C o D) y la justificación histórica:
            </p>

            <div className="space-y-3">
              {QUIZ_QUESTIONS.map((q) => {
                const correctOption = q.options.find(o => o.letter === q.correctLetter);
                return (
                  <div
                    key={q.id}
                    className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-left"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {q.correctLetter}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-neutral-200">
                          {q.id}. {q.question}
                        </div>
                        <div className="text-xs text-amber-300 font-medium mt-1">
                          Respuesta [{q.correctLetter}]: {correctOption?.text}
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </section>
  );
};
