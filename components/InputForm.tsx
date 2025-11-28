import React, { useEffect, useState } from 'react';
import { JudgmentType, DayOfWeek, UserInput } from '../types';
import { DAYS_OF_WEEK } from '../constants';

interface InputFormProps {
  input: UserInput;
  setInput: React.Dispatch<React.SetStateAction<UserInput>>;
  onCalculate: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ input, setInput, onCalculate, isLoading }) => {
  const [currentDateString, setCurrentDateString] = useState<string>('');
  
  // Local state for split date fields
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');

  useEffect(() => {
    // Sync local state with input.birthDate if needed (e.g. on load)
    if (input.birthDate) {
      const parts = input.birthDate.split('-');
      if (parts.length === 3) {
        setDay(parts[0]);
        setMonth(parts[1]);
        setYear(parts[2]);
      }
    }
  }, []); // Run once on mount

  useEffect(() => {
    // Update main input state whenever parts change
    if (day && month && year) {
      // Format: DD-MM-YYYY
      setInput(prev => ({ ...prev, birthDate: `${day}-${month}-${year}` }));
    } else {
       setInput(prev => ({ ...prev, birthDate: '' }));
    }
  }, [day, month, year, setInput]);

  useEffect(() => {
    // Function to update the displayed date/time
    const updateTime = () => {
      const now = new Date();
      
      // Hijri Date
      const hijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(now);

      // Gregorian Date
      const gregorianDate = new Intl.DateTimeFormat('ar-EG', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(now);

      setCurrentDateString(`${gregorianDate} | الموافق ${hijriDate}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (field: keyof UserInput, value: string | number) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  // Base input classes ensuring text-base (16px) to prevent iOS auto-zoom
  const inputBaseClasses = "w-full bg-mystic-dark/80 border border-mystic-purple rounded-lg px-4 py-3 text-base text-white focus:outline-none focus:border-mystic-gold transition-colors";

  return (
    <div className="bg-mystic-purple/20 border border-mystic-purple/50 rounded-2xl p-4 md:p-6 backdrop-blur-sm shadow-xl">
      <h2 className="text-2xl font-kufi font-bold text-mystic-gold mb-2 text-center">
        إدخال البيانات
      </h2>
      
      {/* Current Time Display */}
      <div className="text-center text-blue-200/70 text-xs md:text-sm font-kufi mb-6 pb-4 border-b border-mystic-purple/30 dir-rtl">
        {currentDateString}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 font-kufi">
        {/* Name */}
        <div className="space-y-2">
          <label className="block text-gray-300 text-sm">اسم الشخص (السائل)</label>
          <input
            type="text"
            value={input.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={inputBaseClasses}
            placeholder="مثال: أحمد"
          />
        </div>

        {/* Mother Name */}
        <div className="space-y-2">
          <label className="block text-gray-300 text-sm">اسم الأم</label>
          <input
            type="text"
            value={input.motherName}
            onChange={(e) => handleChange('motherName', e.target.value)}
            className={inputBaseClasses}
            placeholder="مثال: زينب"
          />
        </div>

        {/* Birth Date - Split Fields */}
        <div className="space-y-2 md:col-span-2">
          <label className="block text-gray-300 text-sm">تاريخ الميلاد (للبرج الشمسي)</label>
          <div className="flex gap-2">
            {/* Year */}
            <div className="flex-1">
               <input
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                placeholder="السنة"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={`${inputBaseClasses} text-center`}
              />
            </div>
            {/* Month */}
             <div className="flex-1">
               <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className={`${inputBaseClasses} appearance-none text-center`}
              >
                <option value="">الشهر</option>
                <option value="1">1 (يناير)</option>
                <option value="2">2 (فبراير)</option>
                <option value="3">3 (مارس)</option>
                <option value="4">4 (أبريل)</option>
                <option value="5">5 (مايو)</option>
                <option value="6">6 (يونيو)</option>
                <option value="7">7 (يوليو)</option>
                <option value="8">8 (أغسطس)</option>
                <option value="9">9 (سبتمبر)</option>
                <option value="10">10 (أكتوبر)</option>
                <option value="11">11 (نوفمبر)</option>
                <option value="12">12 (ديسمبر)</option>
              </select>
            </div>
            {/* Day */}
            <div className="flex-1">
               <input
                type="number"
                min="1"
                max="31"
                placeholder="اليوم"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className={`${inputBaseClasses} text-center`}
              />
            </div>
          </div>
          <p className="text-xs text-gray-400/80 mr-1 text-right">
             (اليوم - الشهر - السنة)
          </p>
        </div>

        {/* Day Number */}
        <div className="space-y-2">
          <label className="block text-gray-300 text-sm">
            ما مضى من الشهر الهجري (عدد)
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="30"
              value={input.dayNumber}
              onChange={(e) => handleChange('dayNumber', parseInt(e.target.value) || 0)}
              className={inputBaseClasses}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
              هجري
            </div>
          </div>
          <p className="text-xs text-gray-400/80 mr-1">
            * هذا هو تاريخ يوم أمس الهجري تلقائياً
          </p>
        </div>

        {/* Day of Week */}
        <div className="space-y-2">
          <label className="block text-gray-300 text-sm">اليوم في الأسبوع</label>
          <select
            value={input.dayOfWeek}
            onChange={(e) => handleChange('dayOfWeek', e.target.value)}
            className={`${inputBaseClasses} appearance-none`}
          >
            {DAYS_OF_WEEK.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        {/* Judgment Type */}
        <div className="space-y-2 md:col-span-2">
          <label className="block text-gray-300 text-sm">نوع الحكم المطلوب</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
            {Object.values(JudgmentType).map((type) => (
              <button
                key={type}
                onClick={() => handleChange('judgmentType', type)}
                className={`px-2 py-3 md:px-4 md:py-2 rounded-lg border transition-all duration-300 text-sm md:text-base ${
                  input.judgmentType === type
                    ? 'bg-mystic-gold text-mystic-dark border-mystic-gold font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'bg-transparent text-gray-400 border-mystic-purple hover:border-mystic-accent hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center pb-safe">
        <button
          onClick={onCalculate}
          disabled={!input.name || !input.motherName || isLoading}
          className="group relative px-6 py-4 md:px-8 bg-gradient-to-r from-mystic-purple to-mystic-accent rounded-full text-white font-bold text-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto active:scale-95"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
          <span className="relative flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري المعالجة...
              </>
            ) : 'احسب واستخرج الحكم'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default InputForm;