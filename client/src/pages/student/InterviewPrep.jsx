import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
  Headphones,
  Sparkles,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Award,
  Zap,
  RotateCcw,
  MessageSquare,
  Clock,
  Loader2
} from 'lucide-react';

const CATEGORIES = [
  'Technical Questions',
  'HR Questions',
  'Coding Questions',
  'SQL Questions',
  'Python Questions',
  'AI/ML Questions',
  'Project Questions'
];

const InterviewPrep = () => {
  const [selectedCategory, setSelectedCategory] = useState('Technical Questions');
  const [session, setSession] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await api.getInterviewHistory();
      if (res.success && res.sessions) {
        setHistory(res.sessions);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartInterview = async () => {
    setLoading(true);
    setEvaluation(null);
    setCompleted(false);
    setStudentAnswer('');
    try {
      const res = await api.startInterview(selectedCategory);
      if (res.success) {
        setSession({
          id: res.sessionId,
          category: res.category,
          totalQuestions: res.totalQuestions,
          currentIndex: res.currentIndex,
        });
        setCurrentQuestion(res.currentQuestion);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!studentAnswer.trim() || !session) return;

    setSubmitting(true);
    try {
      const res = await api.submitInterviewAnswer({
        sessionId: session.id,
        answer: studentAnswer,
      });

      if (res.success) {
        setEvaluation(res.evaluation);
        if (res.isCompleted) {
          setCompleted(true);
          await loadHistory();
        } else {
          setSession((prev) => ({ ...prev, currentIndex: res.currentIndex }));
          setCurrentQuestion(res.nextQuestion);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    setEvaluation(null);
    setStudentAnswer('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-indigo-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-cyan-300 text-xs font-semibold">
            <Headphones className="w-3.5 h-3.5 text-cyan-400" />
            <span>Simulated AI Mock Interview</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display">
            Interactive Interview Preparation
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Practice realistic HR, technical, and domain-specific questions one by one. Receive instant AI scoring, structure analysis, and sample model answers.
          </p>
        </div>

        {!session && (
          <button
            type="button"
            onClick={handleStartInterview}
            disabled={loading}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2 shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Start Practice Interview</span>
          </button>
        )}
      </div>

      {/* CATEGORY SELECTOR (when not in active interview) */}
      {!session && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-display">
            Select an Interview Category to Practice:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`p-4 rounded-2xl border text-xs font-bold transition-all text-left flex flex-col justify-between h-24 ${
                  selectedCategory === cat
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-950 shadow-sm ring-1 ring-indigo-500/20'
                    : 'bg-slate-50/50 hover:bg-slate-100 border-slate-200/70 text-slate-700'
                }`}
              >
                <span>{cat}</span>
                <span className="text-[10px] text-slate-400 font-medium">3-4 Questions</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ACTIVE INTERVIEW QUESTION SIMULATOR */}
      {session && !completed && currentQuestion && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-800 bg-indigo-100 px-3 py-1 rounded-md">
                {session.category}
              </span>
              <span className="text-xs font-medium text-slate-500">
                Question {session.currentIndex + 1} of {session.totalQuestions}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSession(null)}
              className="text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Exit Session
            </button>
          </div>

          {/* Question Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Interviewer Question:
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              &ldquo;{currentQuestion.question}&rdquo;
            </h3>
            {currentQuestion.hint && (
              <p className="text-xs text-indigo-700 font-medium pt-1">
                Tip / Hint: {currentQuestion.hint}
              </p>
            )}
          </div>

          {/* Previous Evaluation if already submitted */}
          {evaluation ? (
            <div className="space-y-4 p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">
                  AI Evaluation & Feedback
                </span>
                <span className="text-xs font-bold text-indigo-800 bg-indigo-100 px-2.5 py-1 rounded-md">
                  Score: {evaluation.score} / 10
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {evaluation.feedback}
              </p>

              <div className="space-y-1 text-xs text-slate-600">
                <strong className="text-slate-800 block">Recommended Answer Framework:</strong>
                <p>{evaluation.suggestedStructure}</p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
                >
                  <span>Proceed to Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Answer Input Form */
            <form onSubmit={handleSubmitAnswer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Your Spoken or Written Answer:
                </label>
                <textarea
                  rows={6}
                  required
                  value={studentAnswer}
                  onChange={(e) => setStudentAnswer(e.target.value)}
                  placeholder="Structure your answer clearly. E.g. 'In my experience, ... For example, in a recent project ... As a result ...'"
                  className="w-full text-xs sm:text-sm p-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  disabled={submitting || !studentAnswer.trim()}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-indigo-600/25 transition-all flex items-center gap-2"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Submit Response for AI Review</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* COMPLETED INTERVIEW STATE */}
      {completed && (
        <div className="bg-white rounded-3xl border border-indigo-200 p-8 shadow-xl text-center space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto shadow-xs">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 font-display">
            Mock Interview Completed!
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Great practice session. You've earned the <strong>Interview Ace</strong> achievement badge in your progress dashboard!
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleStartInterview}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20"
            >
              Practice Another Category
            </button>
          </div>
        </div>
      )}

      {/* PAST INTERVIEW PRACTICE HISTORY */}
      {history.length > 0 && !session && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-display">
            Previous Practice Sessions
          </h3>
          <div className="space-y-3">
            {history.slice(0, 5).map((h) => (
              <div
                key={h._id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-800">{h.category}</div>
                  <div className="text-[11px] text-slate-400">
                    {new Date(h.createdAt).toLocaleDateString()} &bull; {h.questions?.length} Questions
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-md">
                    Avg Score: {h.averageScore || '7.5'}/10
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPrep;
