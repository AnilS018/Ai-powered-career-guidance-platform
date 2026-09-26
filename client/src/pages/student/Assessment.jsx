import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  Brain,
  Zap,
  Target,
  AlertCircle,
  Loader2
} from 'lucide-react';

const STEP_TITLES = [
  'Interest Assessment',
  'Personality & Work Preferences',
  'Technical Competencies',
  'Aptitude & Logical Reasoning',
  'Communication & Professional Skills'
];

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const res = await api.getAssessmentQuestions();
      if (res.success && res.questions) {
        setQuestions(res.questions);
      }
    } catch (e) {
      console.error(e);
      setError('Unable to load assessment questions. Please make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const stepQuestions = questions.filter((q) => q.step === currentStep);

  const handleOptionSelect = (question, option) => {
    setAnswers((prev) => ({
      ...prev,
      [question._id]: {
        questionId: question._id,
        category: question.category,
        selectedOptionText: option.text,
        score: option.score,
        affinityDomain: option.affinityDomain,
      },
    }));
  };

  const handleNext = () => {
    const unanswered = stepQuestions.find((q) => !answers[q._id]);
    if (unanswered) {
      setError('Please answer all questions before proceeding to the next step.');
      return;
    }
    setError('');
    setCurrentStep((prev) => Math.min(5, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setError('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    const unanswered = stepQuestions.find((q) => !answers[q._id]);
    if (unanswered) {
      setError('Please answer all questions before submitting.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const answersArray = Object.values(answers);
      const res = await api.submitAssessment(answersArray);
      if (res.success) {
        navigate('/assessment/results');
      }
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-xs text-slate-500">Preparing assessment questionnaire...</p>
      </div>
    );
  }

  const progressPercentage = Math.round(((currentStep - 1) / 5) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Step Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-3 py-1 rounded-full">
            Step {currentStep} of 5
          </span>
          <span className="text-xs font-bold text-slate-500">
            {progressPercentage}% Completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        <div className="pt-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {STEP_TITLES[currentStep - 1]}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Choose the option that genuinely reflects your habits, instincts, and preferences.
          </p>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Questions List for Current Step */}
      <div className="space-y-6">
        {stepQuestions.map((q, idx) => {
          const selectedAnswer = answers[q._id]?.selectedOptionText;

          return (
            <div
              key={q._id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4"
            >
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {q.question}
                  </h3>
                  {q.description && (
                    <p className="text-xs text-slate-500 mt-0.5">{q.description}</p>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2.5 pt-1 pl-10">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswer === opt.text;

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleOptionSelect(q, opt)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-indigo-50/80 border-indigo-500 text-indigo-950 font-semibold shadow-xs ring-1 ring-indigo-500/20'
                          : 'bg-slate-50/50 hover:bg-slate-100/70 border-slate-200/70 text-slate-700'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className="text-xs sm:text-sm leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handlePrev}
            className="px-6 py-3 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-bold text-xs shadow-xs transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>
        ) : (
          <div />
        )}

        {currentStep < 5 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
          >
            <span>Next Step ({currentStep + 1} of 5)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Submit & View Results</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Assessment;
