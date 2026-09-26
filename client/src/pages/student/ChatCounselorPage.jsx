import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  HelpCircle,
  Loader2
} from 'lucide-react';

const SUGGESTIONS = [
  'Which career is suitable for me based on my skills?',
  'What skills should I learn next for AI/ML?',
  'How can I improve my resume for campus placements?',
  'What high-impact projects should I build to stand out?',
  'How do I prepare for technical coding interviews?'
];

const ChatCounselorPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am your AI Career Counselor. Whether you are curious about high-paying career trajectories, resume ATS optimization, project portfolio building, or interview strategy, I am here to help. What's on your mind today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const loadChatHistory = async () => {
    try {
      const res = await api.getChatHistory();
      if (res.success && res.messages && res.messages.length > 0) {
        setMessages(res.messages);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSend = async (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || loading) return;

    const userMsg = { sender: 'user', text: query, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await api.sendChatMessage(query);
      if (res.success && res.reply) {
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: res.reply, timestamp: new Date() }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: "I encountered a network timeout reaching the AI server. Please make sure the backend is active.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    try {
      await api.clearChatHistory();
      setMessages([
        {
          sender: 'ai',
          text: "Chat cleared! How can I guide you on your career journey today?",
          timestamp: new Date()
        }
      ]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 flex items-center justify-center shadow-xs">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              AI Career Counselor
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            </h1>
            <p className="text-xs text-slate-500">
              Interactive personalized mentorship & guidance
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClear}
          className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors flex items-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-200/80 p-6 overflow-y-auto space-y-4 shadow-xs">
        {messages.map((msg, i) => {
          const isAi = msg.sender === 'ai';

          return (
            <div
              key={i}
              className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
            >
              {isAi && (
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-4 rounded-2xl leading-relaxed whitespace-pre-line text-xs sm:text-sm shadow-xs ${
                  isAi
                    ? 'bg-slate-50 text-slate-800 border border-slate-200/70 rounded-tl-sm'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-sm shadow-md shadow-indigo-600/20'
                }`}
              >
                {msg.text}
              </div>

              {!isAi && (
                <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 items-center text-slate-500 text-xs">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
              <span>Counselor is synthesizing advice...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
          Suggested:
        </span>
        {SUGGESTIONS.map((s, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(s)}
            className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 text-slate-600 border border-slate-200/80 transition-colors font-medium shadow-xs"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="bg-white p-2 sm:p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask anything about career roadmap, skills, interview prep, or project ideas..."
          className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-xl border border-transparent focus:outline-none focus:bg-slate-50"
        />
        <button
          type="submit"
          disabled={loading || !inputMessage.trim()}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
};

export default ChatCounselorPage;
