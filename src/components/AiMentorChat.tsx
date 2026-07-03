import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, LearnerProgress } from '../types/academy';
import { COURSES } from '../data/courses';
import { Bot, User, Send, Sparkles, X, Minimize2 } from 'lucide-react';

interface AiMentorChatProps {
  learnerProgress: LearnerProgress;
  activeCourseId?: string;
  activeLessonTitle?: string;
  activeLabTitle?: string;
  onClose?: () => void;
}

export const AiMentorChat: React.FC<AiMentorChatProps> = ({
  learnerProgress,
  activeCourseId,
  activeLessonTitle,
  activeLabTitle,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      role: "model",
      text: "Greetings! I am your NDN Analytics AI Mentor (Virtual Assistant to MSc Desmond Nkefua). How can I assist you with your course concepts, practical labs, or capstone projects today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeCourse = COURSES.find(c => c.id === activeCourseId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { id: `user-${Date.now()}`, role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          context: {
            studentName: learnerProgress.studentName,
            courseTitle: activeCourse?.title,
            lessonTitle: activeLessonTitle,
            labTitle: activeLabTitle,
            completedLessonsCount: learnerProgress.completedLessonIds.length
          }
        })
      });

      const data = await response.json();
      const botReplyText = data.reply || "I am processing your query. Please refer to course docs.";

      setMessages(prev => [...prev, { id: `model-${Date.now()}`, role: "model", text: botReplyText }]);
    } catch (e) {
      console.error("AI Chat Error:", e);
      setMessages(prev => [...prev, {
        id: `model-${Date.now()}`,
        role: "model",
        text: "NDN AI Mentor Gateway is currently processing. You can also consult the NDN Analytics course documentation!"
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
      {/* Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 p-0.5">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
              <Bot className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">NDN AI Mentor</h4>
            <p className="text-[10px] text-cyan-400">Context-Aware Learning Assistant</p>
          </div>
        </div>

        {onClose && (
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
              m.role === 'user'
                ? 'bg-cyan-500 text-slate-950 font-medium rounded-br-none'
                : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
            }`}>
              <pre className="font-sans whitespace-pre-wrap">{m.text}</pre>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start text-xs text-slate-400 animate-pulse">
            <span>AI Mentor is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a technical question about your course..."
          className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
