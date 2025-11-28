import React, { useState } from 'react';
import { JudgmentType, UserInput, CalculationResult, DayOfWeek } from './types';
import { performCalculation } from './utils';
import { generateAstrologicalJudgment } from './services/geminiService';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';

// Background stars effect
const StarsBackground = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white opacity-20 animate-pulse"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 3}px`,
          height: `${Math.random() * 3}px`,
          animationDuration: `${Math.random() * 3 + 2}s`
        }}
      />
    ))}
  </div>
);

const App: React.FC = () => {
  // Initialize state with smart defaults
  const [input, setInput] = useState<UserInput>(() => {
    const now = new Date();
    
    // 1. Determine Current Day of Week
    const dayIndex = now.getDay(); // 0 = Sun, 1 = Mon, etc.
    const daysMap = [
      DayOfWeek.SUNDAY,
      DayOfWeek.MONDAY,
      DayOfWeek.TUESDAY,
      DayOfWeek.WEDNESDAY,
      DayOfWeek.THURSDAY,
      DayOfWeek.FRIDAY,
      DayOfWeek.SATURDAY
    ];
    
    // 2. Determine "Yesterday" (Gregorian object)
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    
    // 3. Calculate Hijri Day for Yesterday
    // Using Intl.DateTimeFormat to convert the Gregorian 'yesterday' to Islamic Umm al-Qura calendar day
    let hijriDay = 1;
    try {
        // Use 'en-US' locale to ensure we get Western digits (0-9) for parsing
        const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
            day: 'numeric'
        });
        const formatted = formatter.format(yesterday);
        const parsed = parseInt(formatted, 10);
        if (!isNaN(parsed)) {
          hijriDay = parsed;
        }
    } catch (e) {
        console.warn("Hijri Date Calculation Error", e);
        // Fallback to 1 if calculation fails
        hijriDay = 1;
    }
    
    return {
      name: '',
      motherName: '',
      birthDate: '', // Initialize birthDate
      dayNumber: hijriDay, // Default to yesterday's HIJRI date number
      dayOfWeek: daysMap[dayIndex],
      judgmentType: JudgmentType.SICKNESS,
    };
  });

  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    if (!input.name || !input.motherName) return;

    setLoading(true);
    setAiResponse(null);
    setCalculationResult(null);

    try {
      // 1. Perform Local Math
      const result = performCalculation(
        input.name,
        input.motherName,
        input.birthDate, // Pass birthDate to calculation
        input.dayNumber,
        input.judgmentType
      );
      
      setCalculationResult(result);

      // 2. Call Gemini
      const textResponse = await generateAstrologicalJudgment(
        input.name,
        input.motherName,
        input.judgmentType,
        input.dayOfWeek,
        result
      );

      setAiResponse(textResponse);

    } catch (error: any) {
      console.error("Error in calculation flow:", error);
      if (error.message === "MISSING_API_KEY") {
        setAiResponse("عذراً، مفتاح الربط (API Key) غير موجود في النظام. إذا كنت تشغل التطبيق محلياً، تأكد من إضافة المفتاح في ملف .env");
      } else {
        setAiResponse("حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans text-right relative pb-20">
      <StarsBackground />
      
      <header className="pt-12 pb-8 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-amiri text-mystic-gold drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)] mb-2">
          الأبراج الفلكية
        </h1>
        <p className="text-mystic-accent font-kufi text-lg opacity-80">
          حاسبة الجُمَّل وكشف الطالع بالذكاء الاصطناعي
        </p>
      </header>

      <main className="container mx-auto px-4 max-w-4xl space-y-8">
        <InputForm 
          input={input} 
          setInput={setInput} 
          onCalculate={handleCalculate}
          isLoading={loading}
        />

        <ResultDisplay 
          result={calculationResult} 
          aiResponse={aiResponse} 
        />
      </main>

      <footer className="text-center text-gray-500 py-8 mt-8 text-sm font-kufi border-t border-white/5">
        <p>تحذير: هذا التطبيق للأغراض الترفيهية والبحثية في التراث فقط.</p>
        <p className="mt-2 text-xs opacity-50">Powered by Google Gemini 2.5 Flash</p>
      </footer>
    </div>
  );
};

export default App;
