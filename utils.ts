import { JUMMAL_TABLE, PLANET_MAPPING, HOUSE_MAPPING, HOUSE_RULERS, PLANETARY_DIGNITIES, ZODIAC_PROPERTIES } from './constants';
import { CalculationResult, JudgmentType } from './types';

/**
 * Normalizes Arabic text and calculates the Jummal sum.
 */
export const calculateJummal = (name: string): number => {
  let total = 0;
  // Keep only Arabic letters roughly
  const cleanedName = name.replace(/[^\u0600-\u06FF]/g, '');

  for (const char of cleanedName) {
    let charNormalized = char;
    
    // Normalize Alif variations to 'ا'
    if (['آ', 'أ', 'إ'].includes(char)) {
      charNormalized = 'ا';
    }

    if (JUMMAL_TABLE[charNormalized]) {
      total += JUMMAL_TABLE[charNormalized];
    }
  }
  return total;
};

/**
 * Calculates the Arabic Moon Phase based on day number (1-30).
 */
export const calculateMoonPhase = (day: number): string => {
  if (day >= 1 && day <= 3) return "محاق/هلال (بداية الشهر)";
  if (day >= 4 && day <= 10) return "تربيع أول (تزايد النور)";
  if (day >= 11 && day <= 12) return "أحدب متزايد";
  if (day >= 13 && day <= 15) return "بدر كامل (اكتمال النور)";
  if (day >= 16 && day <= 20) return "أحدب متناقص";
  if (day >= 21 && day <= 27) return "تربيع ثاني (تراجع النور)";
  return "محاق (نهاية الشهر - احتراق)";
};

/**
 * Calculates the Sun Sign based on Date String (DD-MM-YYYY).
 * Returns the sign number (1 for Aries ... 12 for Pisces)
 */
export const calculateSunSign = (dateString: string): number | null => {
  if (!dateString) return null;
  
  // Expect format: DD-MM-YYYY
  // Treat as fixed text: Day then Month then Year
  const parts = dateString.split('-');
  if (parts.length !== 3) return null;
  
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  // year would be parts[2] but strictly not needed for sign only

  if (isNaN(month) || isNaN(day)) return null;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 1; // Aries
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 2; // Taurus
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 3; // Gemini
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 4; // Cancer
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 5; // Leo
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 6; // Virgo
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 7; // Libra
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 8; // Scorpio
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 9; // Sagittarius
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 10; // Capricorn
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 11; // Aquarius
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 12; // Pisces
  
  return null;
};

/**
 * Applies the Isqat (Modulo) rule and gathers Dignities.
 */
export const performCalculation = (
  name: string,
  motherName: string,
  birthDate: string,
  dayNumber: number,
  judgmentType: JudgmentType
): CalculationResult => {
  const nameSum = calculateJummal(name);
  const motherSum = calculateJummal(motherName);
  const totalSum = nameSum + motherSum + dayNumber;

  // Determine Isqat Type (12 for Houses, 7 for Planets)
  const isqatType = judgmentType === JudgmentType.SICKNESS ? 7 : 12;

  let finalNumber = totalSum % isqatType;
  if (finalNumber === 0) finalNumber = isqatType;

  let planetOrHouse = '';
  let rulingPlanet = '';

  if (isqatType === 7) {
    // Result is directly a Planet
    planetOrHouse = PLANET_MAPPING[finalNumber] || 'مجهول';
    rulingPlanet = planetOrHouse;
  } else {
    // Result is a House, need to find its Ruler
    planetOrHouse = HOUSE_MAPPING[finalNumber] || 'مجهول';
    rulingPlanet = HOUSE_RULERS[finalNumber] || 'مجهول';
  }

  // --- Determine Nature/Disposition via Name (Zairaja) (Always Isqat 12) ---
  let signNumber = totalSum % 12;
  if (signNumber === 0) signNumber = 12;
  const zodiacSign = HOUSE_MAPPING[signNumber] || 'مجهول';
  const properties = ZODIAC_PROPERTIES[signNumber] || { element: 'مجهول', quality: 'مجهول' };

  // --- Determine Sun Sign via Birth Date ---
  let birthSignNumber: number | undefined;
  let birthZodiacSign: string | undefined;
  let birthElement: string | undefined;
  let birthQuality: string | undefined;

  const calculatedBirthSign = calculateSunSign(birthDate);
  if (calculatedBirthSign) {
    birthSignNumber = calculatedBirthSign;
    birthZodiacSign = HOUSE_MAPPING[calculatedBirthSign];
    const birthProps = ZODIAC_PROPERTIES[calculatedBirthSign];
    birthElement = birthProps?.element;
    birthQuality = birthProps?.quality;
  }

  // Get Moon Phase
  const moonPhase = calculateMoonPhase(dayNumber);

  // Get Dignities for the Ruling Planet
  const dignities = PLANETARY_DIGNITIES[rulingPlanet] || undefined;

  return {
    nameSum,
    motherSum,
    totalSum,
    finalNumber,
    isqatType,
    planetOrHouse,
    
    // Name-based nature
    signNumber,
    zodiacSign,
    element: properties.element,
    quality: properties.quality,

    // Birth-based nature
    birthSignNumber,
    birthZodiacSign,
    birthElement,
    birthQuality,

    moonPhase,
    rulingPlanet,
    dignities
  };
};