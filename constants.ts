import { DayOfWeek, DignityInfo } from "./types";

// جدول الأبجدية الروحانية (حساب الجُمَّل الكبير)
export const JUMMAL_TABLE: Record<string, number> = {
  'ا': 1, 'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'و': 6, 'ز': 7, 'ح': 8, 'ط': 9,
  'ي': 10, 'ك': 20, 'ل': 30, 'م': 40, 'ن': 50, 'س': 60, 'ع': 70, 'ف': 80,
  'ص': 90, 'ق': 100, 'ر': 200, 'ش': 300, 'ت': 400, 'ث': 500, 'خ': 600,
  'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000,
  'ة': 5,
  'ى': 10,
  'ء': 1,
  'ئ': 10,
  'ؤ': 6
};

// Mapping remainder (1-7) to Planets
export const PLANET_MAPPING: Record<number, string> = {
  1: "الشمس",
  2: "القمر",
  3: "المريخ",
  4: "عطارد",
  5: "المشتري",
  6: "الزهرة",
  7: "زحل"
};

// Mapping remainder (1-12) to Zodiac Houses/Signs
export const HOUSE_MAPPING: Record<number, string> = {
  1: "الحمل",
  2: "الثور",
  3: "الجوزاء",
  4: "السرطان",
  5: "الأسد",
  6: "العذراء",
  7: "الميزان",
  8: "العقرب",
  9: "القوس",
  10: "الجدي",
  11: "الدلو",
  12: "الحوت"
};

// Mapping Signs (1-12) to Element and Quality
export const ZODIAC_PROPERTIES: Record<number, { element: string, quality: string }> = {
  1: { element: "ناري", quality: "حار جاف" },
  2: { element: "ترابي", quality: "بارد جاف" },
  3: { element: "هوائي", quality: "حار رطب" },
  4: { element: "مائي", quality: "بارد رطب" },
  5: { element: "ناري", quality: "حار جاف" },
  6: { element: "ترابي", quality: "بارد جاف" },
  7: { element: "هوائي", quality: "حار رطب" },
  8: { element: "مائي", quality: "بارد رطب" },
  9: { element: "ناري", quality: "حار جاف" },
  10: { element: "ترابي", quality: "بارد جاف" },
  11: { element: "هوائي", quality: "حار رطب" },
  12: { element: "مائي", quality: "بارد رطب" }
};

// Mapping Houses (1-12) to their Ruling Planet for dignity calculations
export const HOUSE_RULERS: Record<number, string> = {
  1: "المريخ", // Aries
  2: "الزهرة", // Taurus
  3: "عطارد", // Gemini
  4: "القمر", // Cancer
  5: "الشمس", // Leo
  6: "عطارد", // Virgo
  7: "الزهرة", // Libra
  8: "المريخ", // Scorpio (Traditional)
  9: "المشتري", // Sagittarius
  10: "زحل",   // Capricorn
  11: "زحل",   // Aquarius (Traditional)
  12: "المشتري" // Pisces (Traditional)
};

// Essential Dignities for the 7 Classical Planets
export const PLANETARY_DIGNITIES: Record<string, DignityInfo> = {
  "الشمس": {
    domicile: ["الأسد"],
    exaltation: "الحمل",
    detriment: ["الدلو"],
    fall: "الميزان"
  },
  "القمر": {
    domicile: ["السرطان"],
    exaltation: "الثور",
    detriment: ["الجدي"],
    fall: "العقرب"
  },
  "المريخ": {
    domicile: ["الحمل", "العقرب"],
    exaltation: "الجدي",
    detriment: ["الميزان", "الثور"],
    fall: "السرطان"
  },
  "عطارد": {
    domicile: ["الجوزاء", "العذراء"],
    exaltation: "العذراء",
    detriment: ["القوس", "الحوت"],
    fall: "الحوت"
  },
  "المشتري": {
    domicile: ["القوس", "الحوت"],
    exaltation: "السرطان",
    detriment: ["الجوزاء", "العذراء"],
    fall: "الجدي"
  },
  "الزهرة": {
    domicile: ["الثور", "الميزان"],
    exaltation: "الحوت",
    detriment: ["العقرب", "الحمل"],
    fall: "العذراء"
  },
  "زحل": {
    domicile: ["الجدي", "الدلو"],
    exaltation: "الميزان",
    detriment: ["السرطان", "الأسد"],
    fall: "الحمل"
  }
};

export const DAYS_OF_WEEK = Object.values(DayOfWeek);