export enum JudgmentType {
  ABSENT = 'الغائب',
  SICKNESS = 'المرض',
  MARRIAGE = 'الزواج', // Added for completeness, maps to Houses usually
  NEED = 'الحاجة',
}

export interface DignityInfo {
  domicile: string[];   // بيوت الحكم
  exaltation: string;   // شرف
  detriment: string[];  // وبال
  fall: string;         // هبوط
}

export interface CalculationResult {
  nameSum: number;
  motherSum: number;
  totalSum: number;
  finalNumber: number; // The result of modulo (based on judgment type)
  isqatType: number; // 7 or 12
  planetOrHouse: string;
  
  // New fields for Nature/Disposition (always Isqat 12 based on Name)
  signNumber: number;
  zodiacSign: string;
  element: string; // ناري، ترابي...
  quality: string; // حار جاف...

  // New fields for Birth Sign (Sun Sign)
  birthSignNumber?: number;
  birthZodiacSign?: string;
  birthElement?: string;
  birthQuality?: string;

  moonPhase: string;
  dignities?: DignityInfo;
  rulingPlanet?: string; // The planet associated with the result (direct or via house)
}

export interface UserInput {
  name: string;
  motherName: string;
  birthDate: string; // YYYY-MM-DD
  dayNumber: number; // Day of the lunar month passed
  dayOfWeek: string;
  judgmentType: JudgmentType;
}

export enum DayOfWeek {
  SUNDAY = 'الأحد',
  MONDAY = 'الاثنين',
  TUESDAY = 'الثلاثاء',
  WEDNESDAY = 'الأربعاء',
  THURSDAY = 'الخميس',
  FRIDAY = 'الجمعة',
  SATURDAY = 'السبت',
}