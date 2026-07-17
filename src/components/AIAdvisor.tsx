import React, { useState, useRef, useEffect } from "react";
import { Bot, User, Send, Loader2, ArrowRight, ShieldCheck, Key } from "lucide-react";

interface AIAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIAdvisor({ isOpen, onClose }: AIAdvisorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am Elevatech's B2B Technical Advisor. I can guide you through our specialized elevator engineering add-on solutions—such as our zero-liquid condensation Dry AC, wireless millimeter-wave CCTV links, and non-intrusive edge-computing fleet IoT gateway. How can I assist you with your building logistics today?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const quickPrompts = [
    "Explain how Dry AC handles condensation without drains.",
    "Why do CAT6 cables fail and how does wireless CCTV fix it?",
    "Are your IoT sensors compatible with Kone or Otis lifts?",
    "How does Elevatech establish digital B2B authority?"
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/advisor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg]
        }),
      });

      const data = await response.json();
      
      if (response.status === 503) {
        // API key missing error
        setApiKeyMissing(true);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.fallbackResponse || "I am currently offline. Please configure your GEMINI_API_KEY."
          }
        ]);
      } else if (response.ok && data.response) {
        setApiKeyMissing(false);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I encountered an issue analyzing your technical specifications. Standard solutions apply."
          }
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Communication error with Elevatech core. Standard technical data applies."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-0 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      {/* Tap out-of-bounds to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      {/* Slide-out Sidebar Chat Console */}
      <div className="w-full sm:max-w-xl h-full sm:h-[90vh] bg-slate-900 border-l border-slate-800 sm:border border-slate-800 sm:rounded-2xl flex flex-col shadow-2xl relative">
        
        {/* Chat Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 rounded-t-none sm:rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/10 border border-sky-400/20 rounded-xl text-sky-400 shrink-0">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-sans font-bold text-white tracking-wide">
                Elevatech Systems AI Advisor
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                  Consulting Active
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-mono text-xs px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        {/* API Key Status Alert */}
        {apiKeyMissing && (
          <div className="bg-sky-950/20 border-b border-sky-900/30 px-5 py-2.5 flex items-start gap-2 text-[11px] text-slate-400 font-sans leading-relaxed">
            <Key className="w-4 h-4 text-sky-400 shrink-0 mt-0.5 animate-bounce" />
            <div>
              <span>
                Running in <strong>offline consultation mode</strong> (No GEMINI_API_KEY detected in secrets). Interactive smart capabilities are limited to pre-engineered fallback solutions.
              </span>
            </div>
          </div>
        )}

        {/* Chat Messages Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 max-w-[85%] ${
                m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div className={`p-2 h-8 w-8 rounded-full shrink-0 flex items-center justify-center border ${
                m.role === "user"
                  ? "bg-slate-800 border-slate-700 text-sky-400"
                  : "bg-sky-500/15 border-sky-500/10 text-sky-400"
              }`}>
                {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`rounded-2xl px-4 py-3 text-xs leading-relaxed font-sans ${
                m.role === "user"
                  ? "bg-sky-600 text-white rounded-tr-none"
                  : "bg-slate-950 border border-slate-850 text-slate-300 rounded-tl-none font-light"
              }`}>
                {m.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 mr-auto max-w-[85%]">
              <div className="p-2 h-8 w-8 rounded-full shrink-0 flex items-center justify-center border bg-sky-500/15 border-sky-500/10 text-sky-400">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-950 border border-slate-850 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-500 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Advisor is calculating vertical tolerances...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions Panel */}
        {messages.length === 1 && (
          <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/20">
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block mb-2 font-bold">
              Suggested B2B Queries
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  className="flex items-center justify-between text-left text-[11px] text-slate-300 bg-slate-900 hover:bg-slate-850 border border-slate-800/60 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:text-sky-400 group"
                >
                  <span className="font-light">{p}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Input Field */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 rounded-b-none sm:rounded-b-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage(inputValue);
              }}
              placeholder="Ask about Dry AC, wireless CCTV, IoT, or compliance..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-sans"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 disabled:bg-slate-800 disabled:text-slate-600 rounded-lg shrink-0 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 text-center">
            <span className="text-[10px] text-slate-500 font-mono tracking-wide">
              Compliance-vetted technical parameters. No core circuits altered.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
