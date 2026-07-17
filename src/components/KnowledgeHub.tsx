import React, { useState } from "react";
import { TECH_ARTICLES, FAQS } from "../data";
import { HelpCircle, ChevronDown, ChevronUp, FileText, Search, Tag, BookOpen } from "lucide-react";

export default function KnowledgeHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaqId((prev) => (prev === id ? null : id));
  };

  const filteredArticles = TECH_ARTICLES.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory ? art.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const categories = ["Engineering", "Safety", "IoT", "B2B Strategy"];

  return (
    <section className="bg-slate-950 text-slate-100 py-16 px-6 border-b border-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs text-sky-400 font-mono uppercase tracking-widest block mb-2">
            Engineering Thought Leadership
          </span>
          <h2 className="text-3xl font-sans font-bold text-white tracking-tight">
            Elevator Technology Reference Library
          </h2>
          <p className="text-slate-400 font-sans font-light mt-2 text-sm leading-relaxed">
            Technical breakdowns of vertical climate control, wireless communications, and predictive edge computing, designed to assist architects, building consultants, and facilities inspectors.
          </p>
        </div>

        {/* Categories / Search bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-slate-900/30 border border-slate-900 p-4 rounded-xl">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide transition-all ${
                selectedCategory === null
                  ? "bg-sky-500 text-slate-950 font-semibold"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              All Library
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide transition-all ${
                  selectedCategory === cat
                    ? "bg-sky-500 text-slate-950 font-semibold"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specifications..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8.5 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
            <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
          </div>
        </div>

        {/* Technical Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {filteredArticles.length === 0 ? (
            <div className="col-span-3 text-center py-8">
              <span className="text-xs text-slate-500 font-mono">No technical articles match your parameters.</span>
            </div>
          ) : (
            filteredArticles.map((art) => (
              <article key={art.id} className="bg-slate-900/35 border border-slate-900 hover:border-slate-800/80 p-5 rounded-xl flex flex-col justify-between space-y-4 transition-all">
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-sky-400 bg-sky-950/40 border border-sky-900/30 px-2 py-0.5 rounded">
                      {art.category}
                    </span>
                    <span className="text-slate-500">{art.readTime}</span>
                  </div>

                  <h3 className="text-sm font-sans font-bold text-white tracking-tight leading-tight hover:text-sky-400 transition-colors cursor-pointer">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans font-light line-clamp-3">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-900/80">
                  <div className="text-[10px] text-slate-400 font-sans">
                    <strong className="text-slate-200 font-normal">Author:</strong> {art.author}
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {art.tags.map((t) => (
                      <span key={t} className="text-[9px] font-mono text-slate-500">
                        #{t.toLowerCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* FAQs section with structured semantics */}
        <div className="bg-slate-900/20 border border-slate-900 rounded-2xl p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
          <div className="text-center md:text-left border-b border-slate-900 pb-4">
            <span className="text-xs text-sky-400 font-mono uppercase tracking-widest block mb-1">
              B2B Frequently Asked Questions
            </span>
            <h3 className="text-xl font-sans font-bold text-white tracking-tight">
              Safety Codes, Compliance & Specifications FAQ
            </h3>
          </div>

          <div className="divide-y divide-slate-900">
            {FAQS.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div key={faq.id} className="py-4 first:pt-0 last:pb-0">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex justify-between items-center text-left text-xs font-sans font-bold text-slate-200 hover:text-white transition-colors cursor-pointer py-1.5"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-sky-500 shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 ml-4" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="pl-6.5 pr-2.5 pt-3 text-[11px] text-slate-400 font-sans font-light leading-relaxed animate-fade-in">
                      <span className="text-[10px] text-sky-400 font-mono uppercase tracking-widest block font-bold mb-1.5">
                        Category: {faq.category}
                      </span>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
