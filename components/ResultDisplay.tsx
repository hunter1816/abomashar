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
      <h1 className="text-4xl md:text-5xl font-amiri font-bold text-mystic-gold border-b-2 border-mystic-gold/30 pb-4 mb-8 mt-10 leading-relaxed" {...props} />
    ),
    // Sub Headers - Light Blue for contrast
    h2: ({ node, ...props }) => (
      <h2 className="text-3xl font-amiri font-bold text-blue-200 mb-6 mt-10 flex items-center gap-3 border-r-4 border-blue-400/50 pr-4 rounded-r-sm bg-gradient-to-l from-blue-900/30 to-transparent py-2" {...props} />
    ),
    // Smaller Headers - Accent Purple
    h3: ({ node, ...props }) => (
      <h3 className="text-2xl font-amiri font-bold text-mystic-accent mb-4 mt-8" {...props} />
    ),
    // Bold Text - Bright Amber with subtle glow background
    strong: ({ node, ...props }) => (
      <strong className="text-amber-300 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded mx-0.5 shadow-[0_0_12px_rgba(251,191,36,0.2)] border border-amber-500/20 text-xl" {...props} />
    ),
    // Paragraphs - Clear white text with good spacing
    p: ({ node, ...props }) => (
      <p className="mb-6 leading-loose text-white text-xl md:text-2xl font-kufi tracking-wide opacity-95" {...props} />
    ),
    // Lists - Better spacing
    ul: ({ node, ...props }) => (
      <ul className="list-disc pr-8 space-y-4 mb-8 marker:text-mystic-gold marker:text-2xl" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="list-decimal pr-8 space-y-4 mb-8 marker:text-mystic-gold marker:font-bold marker:text-xl" {...props} />
    ),
    li: ({ node, ...props }) => (
      <li className="pl-4 leading-relaxed text-gray-100 font-kufi text-xl" {...props} />
    ),
    // Blockquotes - Styled box
    blockquote: ({ node, ...props }) => (
      <blockquote className="border-r-8 border-mystic-gold bg-mystic-purple/10 pr-8 py-6 rounded-l-2xl my-8 italic text-gray-200 text-xl shadow-inner relative overflow-hidden font-amiri" {...props} />
    ),
  };

  if (!result) return null;

  return (
    <div className="space-y-10 animate-fade-in-up pb-24">
      {/* Numerical Analysis Card */}
      <div className="bg-mystic-dark/60 border border-mystic-gold/30 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl">
        <h3 className="text-2xl font-kufi text-mystic-gold mb-6 text-center border-b border-white/5 pb-4">التحليل الرقمي والطبائع</h3>
        
        {/* Sums Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center font-amiri text-lg mb-8">
          <div className="p-5 bg-mystic-purple/20 rounded-2xl border border-mystic-purple/30 flex flex-col justify-center items-center">
            <div className="text-gray-400 text-sm font-kufi mb-2">جمل الاسم</div>
            <div className="text-4xl font-bold text-white tracking-widest">{result.nameSum}</div>
          </div>
          <div className="p-5 bg-mystic-purple/20 rounded-2xl border border-mystic-purple/30 flex flex-col justify-center items-center">
            <div className="text-gray-400 text-sm font-kufi mb-2">جمل الأم</div>
            <div className="text-4xl font-bold text-white tracking-widest">{result.motherSum}</div>
          </div>
          <div className="p-5 bg-mystic-purple/20 rounded-2xl border border-mystic-purple/30 flex flex-col justify-center items-center ring-1 ring-mystic-gold/20">
            <div className="text-gray-400 text-sm font-kufi mb-2">المجموع الكلي</div>
            <div className="text-4xl font-bold text-amber-400 tracking-widest drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]">{result.totalSum}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Nature/Element Display (Calculated from Name) */}
          <div className="p-6 bg-gradient-to-br from-indigo-950 via-purple-950 to-mystic-dark border border-blue-500/30 rounded-3xl relative overflow-hidden group h-full flex flex-col shadow-lg">
             <div className="absolute top-0 right-0 bg-blue-600/20 text-blue-200 text-sm px-3 py-1.5 rounded-bl-xl font-kufi font-bold border-b border-l border-blue-500/20">حسب الاسم (روحاني)</div>
             
             <div className="flex-1 flex flex-row items-center justify-center gap-6 relative z-10 text-center my-4">
               <div className="p-4 bg-mystic-dark/50 rounded-full border-2 border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.4)] shrink-0">
                  <ZodiacSymbol signNumber={result.signNumber} className="w-16 h-16 text-blue-300" />
               </div>
               <div className="text-right">
                  <div className="text-blue-300/80 text-sm font-kufi mb-1">البرج الطالع</div>
                  <div className="text-4xl font-bold text-white font-amiri leading-none drop-shadow-md">{result.zodiacSign}</div>
               </div>
             </div>

             <div className="flex gap-4 text-base w-full justify-center border-t border-white/10 pt-4 mt-auto relative z-10 bg-black/10 rounded-xl pb-2">
               <div className="text-center px-4">
                  <span className="text-blue-400 block text-xs mb-1 font-kufi">العنصر</span>
                  <span className="text-white font-bold font-kufi">{result.element}</span>
               </div>
               <div className="w-px bg-white/10 my-1"></div>
               <div className="text-center px-4">
                  <span className="text-blue-400 block text-xs mb-1 font-kufi">الطبيعة</span>
                  <span className="text-white font-bold font-kufi">{result.quality}</span>
               </div>
             </div>
          </div>

          {/* Birth Sign Display (Calculated from Date) */}
          {result.birthZodiacSign ? (
            <div className="p-6 bg-gradient-to-br from-orange-950 via-red-950 to-mystic-dark border border-orange-500/30 rounded-3xl relative overflow-hidden group h-full flex flex-col shadow-lg">
               <div className="absolute top-0 right-0 bg-orange-600/20 text-orange-200 text-sm px-3 py-1.5 rounded-bl-xl font-kufi font-bold border-b border-l border-orange-500/20">حسب الميلاد (شمسي)</div>
               
               <div className="flex-1 flex flex-row items-center justify-center gap-6 relative z-10 text-center my-4">
                 <div className="p-4 bg-mystic-dark/50 rounded-full border-2 border-orange-400/30 shadow-[0_0_20px_rgba(249,115,22,0.4)] shrink-0">
                    <ZodiacSymbol signNumber={result.birthSignNumber || 1} className="w-16 h-16 text-orange-300" />
                 </div>
                 <div className="text-right">
                    <div className="text-orange-300/80 text-sm font-kufi mb-1">البرج الشمسي</div>
                    <div className="text-4xl font-bold text-white font-amiri leading-none drop-shadow-md">{result.birthZodiacSign}</div>
                 </div>
               </div>

               <div className="flex gap-4 text-base w-full justify-center border-t border-white/10 pt-4 mt-auto relative z-10 bg-black/10 rounded-xl pb-2">
                 <div className="text-center px-4">
                    <span className="text-orange-400 block text-xs mb-1 font-kufi">العنصر</span>
                    <span className="text-white font-bold font-kufi">{result.birthElement}</span>
                 </div>
                 <div className="w-px bg-white/10 my-1"></div>
                 <div className="text-center px-4">
                    <span className="text-orange-400 block text-xs mb-1 font-kufi">الطبيعة</span>
                    <span className="text-white font-bold font-kufi">{result.birthQuality}</span>
                 </div>
               </div>
            </div>
          ) : (
            <div className="p-6 bg-mystic-dark/20 border border-dashed border-white/10 rounded-3xl flex items-center justify-center text-gray-500 font-kufi text-lg text-center leading-relaxed">
              لم يتم إدخال تاريخ الميلاد
              <br/>
              لحساب البرج الشمسي
            </div>
          )}
        </div>

        {/* Main Result */}
        <div className="p-10 bg-gradient-to-br from-mystic-purple/50 via-mystic-accent/10 to-transparent rounded-3xl border border-mystic-gold/60 text-center relative overflow-hidden flex flex-col items-center shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
           <div className="text-gray-300 font-kufi text-base mb-4 relative z-10 uppercase tracking-[0.2em]">
             حكم الزيارج (الإسقاط على {result.isqatType})
           </div>
           
           <div className="text-9xl font-amiri font-bold text-mystic-gold drop-shadow-[0_4px_15px_rgba(212,175,55,0.6)] my-4 relative z-10">
                {result.finalNumber}
           </div>

           <div className="flex items-center justify-center gap-4 relative z-10 mb-6 bg-black/20 px-8 py-2 rounded-full border border-white/5 backdrop-blur-sm">
              {/* Show icon only if it's a Zodiac House result (12) */}
              {result.isqatType === 12 && (
                 <ZodiacSymbol signNumber={result.finalNumber} className="w-10 h-10 text-mystic-gold animate-pulse" />
              )}
              <div className="text-4xl text-white font-amiri">
                {result.isqatType === 7 ? 'الكوكب:' : 'البيت:'} <span className="text-amber-400 font-bold">{result.planetOrHouse}</span>
              </div>
           </div>
           
           {/* If House, show ruler */}
           {result.isqatType === 12 && (
             <div className="text-xl text-gray-200 mt-2 font-kufi relative z-10">
               يحكمه كوكب: <span className="text-mystic-accent font-bold text-2xl">{result.rulingPlanet}</span>
             </div>
           )}
        </div>

        {/* Moon Phase & Dignity Details */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-mystic-dark/40 rounded-2xl border border-white/10 flex flex-col items-center justify-center hover:bg-mystic-dark/60 transition-colors">
             <span className="text-gray-400 text-sm font-kufi mb-2">منزلة القمر الحالية</span>
             <span className="text-white font-amiri text-2xl font-bold">{result.moonPhase}</span>
          </div>
          
          {result.dignities && (
             <div className="p-5 bg-mystic-dark/40 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center hover:bg-mystic-dark/60 transition-colors">
               <span className="text-gray-400 text-sm font-kufi mb-3">حظوظ الكوكب ({result.rulingPlanet})</span>
               <div className="flex flex-wrap gap-4 text-base font-kufi justify-center">
                 <div className="bg-green-950/40 px-4 py-1.5 rounded-lg text-green-300 border border-green-500/30 shadow-sm">
                    شرف: <span className="font-bold text-white">{result.dignities.exaltation}</span>
                 </div>
                 <div className="bg-red-950/40 px-4 py-1.5 rounded-lg text-red-300 border border-red-500/30 shadow-sm">
                    هبوط: <span className="font-bold text-white">{result.dignities.fall}</span>
                 </div>
               </div>
             </div>
          )}
        </div>
      </div>

      {/* AI Interpretation Card */}
      {aiResponse && (
        <div className={`bg-mystic-dark border-2 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(212,175,55,0.1)] relative overflow-hidden animate-fade-in ${
            aiResponse.includes("⚠️") 
            ? "border-red-500/50 bg-red-950/10" 
            : "border-mystic-gold/60 bg-mystic-dark/95"
        }`}>
            {/* Decorative corner */}
            <div className={`absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 rounded-tr-3xl ${aiResponse.includes("⚠️") ? "border-red-500/30" : "border-mystic-gold/40"}`}></div>
            <div className={`absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 rounded-bl-3xl ${aiResponse.includes("⚠️") ? "border-red-500/30" : "border-mystic-gold/40"}`}></div>

            {!aiResponse.includes("⚠️") && (
                <h3 className="text-4xl md:text-5xl font-amiri text-center text-mystic-gold mb-12 pb-8 border-b border-white/10 drop-shadow-md">
                ⚡ الحكم الفلكي المستخرج ⚡
                </h3>
            )}
            
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