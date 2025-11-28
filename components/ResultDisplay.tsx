import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { CalculationResult } from '../types';
import ZodiacSymbol from './ZodiacIcons';

interface ResultDisplayProps {
  result: CalculationResult | null;
  aiResponse: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, aiResponse }) => {
  // Custom styling for Markdown elements to make important sections pop
  const markdownComponents: Components = {
    // Main Headers - Gold with underline
    h1: ({ node, ...props }) => (
      <h1 className="text-3xl font-amiri font-bold text-mystic-gold border-b border-mystic-gold/30 pb-3 mb-6 mt-8" {...props} />
    ),
    // Sub Headers - Light Blue for contrast
    h2: ({ node, ...props }) => (
      <h2 className="text-2xl font-amiri font-bold text-blue-300 mb-4 mt-8 flex items-center gap-2 border-r-4 border-blue-300/50 pr-3 rounded-r-sm bg-gradient-to-l from-blue-900/20 to-transparent py-1" {...props} />
    ),
    // Smaller Headers - Accent Purple
    h3: ({ node, ...props }) => (
      <h3 className="text-xl font-amiri font-bold text-mystic-accent mb-3 mt-6" {...props} />
    ),
    // Bold Text - Bright Amber with subtle glow background
    strong: ({ node, ...props }) => (
      <strong className="text-amber-300 font-bold bg-amber-500/10 px-1 py-0.5 rounded mx-0.5 shadow-[0_0_8px_rgba(251,191,36,0.15)] border border-amber-500/10" {...props} />
    ),
    // Paragraphs - Clear white text with good spacing
    p: ({ node, ...props }) => (
      <p className="mb-5 leading-loose text-gray-100 text-lg md:text-xl font-kufi" {...props} />
    ),
    // Lists - Better spacing
    ul: ({ node, ...props }) => (
      <ul className="list-disc pr-6 space-y-3 mb-6 marker:text-mystic-gold marker:text-xl" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="list-decimal pr-6 space-y-3 mb-6 marker:text-mystic-gold marker:font-bold" {...props} />
    ),
    li: ({ node, ...props }) => (
      <li className="pl-2 leading-relaxed text-gray-200 font-kufi text-lg" {...props} />
    ),
    // Blockquotes - Styled box
    blockquote: ({ node, ...props }) => (
      <blockquote className="border-r-4 border-mystic-gold bg-mystic-purple/10 pr-6 py-4 rounded-l-xl my-6 italic text-gray-300 shadow-inner relative overflow-hidden" {...props} />
    ),
  };

  if (!result) return null;

  return (
    <div className="space-y-8 animate-fade-in-up pb-20">
      {/* Numerical Analysis Card */}
      <div className="bg-mystic-dark/60 border border-mystic-gold/30 rounded-2xl p-6 backdrop-blur-md">
        <h3 className="text-xl font-kufi text-mystic-gold mb-4 text-center">التحليل الرقمي والطبائع</h3>
        
        {/* Sums Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center font-amiri text-lg mb-6">
          <div className="p-4 bg-mystic-purple/20 rounded-xl border border-mystic-purple/30">
            <div className="text-gray-400 text-sm font-kufi mb-1">جمل الاسم</div>
            <div className="text-2xl font-bold text-white">{result.nameSum}</div>
          </div>
          <div className="p-4 bg-mystic-purple/20 rounded-xl border border-mystic-purple/30">
            <div className="text-gray-400 text-sm font-kufi mb-1">جمل الأم</div>
            <div className="text-2xl font-bold text-white">{result.motherSum}</div>
          </div>
          <div className="p-4 bg-mystic-purple/20 rounded-xl border border-mystic-purple/30">
            <div className="text-gray-400 text-sm font-kufi mb-1">المجموع الكلي</div>
            <div className="text-2xl font-bold text-white">{result.totalSum}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Nature/Element Display (Calculated from Name) */}
          <div className="p-6 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-mystic-dark border border-blue-500/30 rounded-2xl relative overflow-hidden group h-full flex flex-col">
             <div className="absolute top-0 right-0 bg-blue-500/20 text-blue-200 text-xs px-2 py-1 rounded-bl-lg font-kufi">حسب الاسم (روحاني)</div>
             
             <div className="flex-1 flex flex-row items-center justify-center gap-5 relative z-10 text-center my-2">
               <div className="p-3 bg-mystic-dark/50 rounded-full border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.3)] shrink-0">
                  <ZodiacSymbol signNumber={result.signNumber} className="w-12 h-12 text-blue-200" />
               </div>
               <div className="text-right">
                  <div className="text-blue-300 text-xs font-kufi mb-1">البرج الطالع</div>
                  <div className="text-3xl font-bold text-white font-amiri leading-none">{result.zodiacSign}</div>
               </div>
             </div>

             <div className="flex gap-4 text-sm w-full justify-center border-t border-white/10 pt-3 mt-auto relative z-10">
               <div className="text-center px-2">
                  <span className="text-blue-400 block text-xs mb-1">العنصر</span>
                  <span className="text-white font-bold">{result.element}</span>
               </div>
               <div className="w-px bg-white/10"></div>
               <div className="text-center px-2">
                  <span className="text-blue-400 block text-xs mb-1">الطبيعة</span>
                  <span className="text-white font-bold">{result.quality}</span>
               </div>
             </div>
          </div>

          {/* Birth Sign Display (Calculated from Date) */}
          {result.birthZodiacSign ? (
            <div className="p-6 bg-gradient-to-br from-orange-900/40 via-red-900/40 to-mystic-dark border border-orange-500/30 rounded-2xl relative overflow-hidden group h-full flex flex-col">
               <div className="absolute top-0 right-0 bg-orange-500/20 text-orange-200 text-xs px-2 py-1 rounded-bl-lg font-kufi">حسب الميلاد (شمسي)</div>
               
               <div className="flex-1 flex flex-row items-center justify-center gap-5 relative z-10 text-center my-2">
                 <div className="p-3 bg-mystic-dark/50 rounded-full border border-orange-400/30 shadow-[0_0_15px_rgba(249,115,22,0.3)] shrink-0">
                    <ZodiacSymbol signNumber={result.birthSignNumber || 1} className="w-12 h-12 text-orange-200" />
                 </div>
                 <div className="text-right">
                    <div className="text-orange-300 text-xs font-kufi mb-1">البرج الشمسي</div>
                    <div className="text-3xl font-bold text-white font-amiri leading-none">{result.birthZodiacSign}</div>
                 </div>
               </div>

               <div className="flex gap-4 text-sm w-full justify-center border-t border-white/10 pt-3 mt-auto relative z-10">
                 <div className="text-center px-2">
                    <span className="text-orange-400 block text-xs mb-1">العنصر</span>
                    <span className="text-white font-bold">{result.birthElement}</span>
                 </div>
                 <div className="w-px bg-white/10"></div>
                 <div className="text-center px-2">
                    <span className="text-orange-400 block text-xs mb-1">الطبيعة</span>
                    <span className="text-white font-bold">{result.birthQuality}</span>
                 </div>
               </div>
            </div>
          ) : (
            <div className="p-6 bg-mystic-dark/20 border border-white/5 rounded-2xl flex items-center justify-center text-gray-500 font-kufi text-sm text-center">
              لم يتم إدخال تاريخ الميلاد
              <br/>
              لحساب البرج الشمسي
            </div>
          )}
        </div>

        {/* Main Result */}
        <div className="p-8 bg-gradient-to-br from-mystic-purple/40 to-mystic-accent/20 rounded-2xl border border-mystic-gold/50 text-center relative overflow-hidden flex flex-col items-center">
           <div className="text-gray-300 font-kufi text-sm mb-2 relative z-10 uppercase tracking-widest">
             حكم الزيارج (الإسقاط على {result.isqatType})
           </div>
           
           <div className="text-8xl font-amiri font-bold text-mystic-gold drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] my-2 relative z-10">
                {result.finalNumber}
           </div>

           <div className="flex items-center justify-center gap-3 relative z-10 mb-4">
              {/* Show icon only if it's a Zodiac House result (12) */}
              {result.isqatType === 12 && (
                 <ZodiacSymbol signNumber={result.finalNumber} className="w-8 h-8 text-mystic-gold" />
              )}
              <div className="text-3xl text-white font-amiri">
                {result.isqatType === 7 ? 'الكوكب:' : 'البيت:'} <span className="text-mystic-gold font-bold">{result.planetOrHouse}</span>
              </div>
           </div>
           
           {/* If House, show ruler */}
           {result.isqatType === 12 && (
             <div className="text-lg text-gray-300 mt-1 font-kufi relative z-10 bg-black/20 px-4 py-1 rounded-full border border-white/5">
               يحكمه كوكب: <span className="text-mystic-gold font-bold">{result.rulingPlanet}</span>
             </div>
           )}
        </div>

        {/* Moon Phase & Dignity Details */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-mystic-dark/40 rounded-xl border border-white/10 flex flex-col items-center justify-center hover:bg-mystic-dark/60 transition-colors">
             <span className="text-gray-400 text-xs font-kufi mb-2">منزلة القمر الحالية</span>
             <span className="text-white font-amiri text-xl">{result.moonPhase}</span>
          </div>
          
          {result.dignities && (
             <div className="p-4 bg-mystic-dark/40 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center hover:bg-mystic-dark/60 transition-colors">
               <span className="text-gray-400 text-xs font-kufi mb-2">حظوظ الكوكب ({result.rulingPlanet})</span>
               <div className="flex gap-4 text-sm font-kufi">
                 <div className="bg-green-900/30 px-3 py-1 rounded text-green-200 border border-green-500/20">
                    شرف: <span className="font-bold">{result.dignities.exaltation}</span>
                 </div>
                 <div className="bg-red-900/30 px-3 py-1 rounded text-red-200 border border-red-500/20">
                    هبوط: <span className="font-bold">{result.dignities.fall}</span>
                 </div>
               </div>
             </div>
          )}
        </div>
      </div>

      {/* AI Interpretation Card */}
      {aiResponse && (
        <div className="bg-mystic-dark/90 border-2 border-mystic-gold/60 rounded-2xl p-6 md:p-10 shadow-[0_0_30px_rgba(212,175,55,0.15)] relative overflow-hidden animate-fade-in">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-mystic-gold/40 rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-mystic-gold/40 rounded-bl-xl"></div>

            <h3 className="text-3xl md:text-4xl font-amiri text-center text-mystic-gold mb-10 pb-6 border-b border-white/10">
              ⚡ الحكم الفلكي المستخرج ⚡
            </h3>
            
            <div className="text-right dir-rtl">
               <ReactMarkdown components={markdownComponents}>
                 {aiResponse}
               </ReactMarkdown>
            </div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;