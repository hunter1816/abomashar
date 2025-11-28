import { GoogleGenAI } from "@google/genai";
import { CalculationResult, JudgmentType } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateAstrologicalJudgment = async (
  name: string,
  motherName: string,
  judgmentType: JudgmentType,
  dayName: string,
  result: CalculationResult
): Promise<string> => {
  try {
    const ai = getClient();
  
    let isqatDesc = "";
    if (result.isqatType === 12) {
      isqatDesc = `البيت الفلكي الدال: ${result.planetOrHouse} (رقم ${result.finalNumber}). وكوكبه الحاكم هو ${result.rulingPlanet}.`;
    } else {
      isqatDesc = `الكوكب الحاكم مباشرة: ${result.planetOrHouse} (رقم ${result.finalNumber}).`;
    }

    const prompt = `
    أنت خبير في علم الفلك الإسلامي القديم والزيارج وحساب الجمل.
    لديك المعطيات التالية لمسألة فلكية (استخدمها للتحليل ولكن لا تذكرها في نص الإجابة):
    
    [بيانات مخفية للتحليل]
    - السائل: ${name} (طبع الاسم: ${result.zodiacSign} / ${result.element})
    - الأم: ${motherName}
    - المسألة: ${judgmentType}
    - الوقت: ${dayName}، منزلة القمر: ${result.moonPhase}
    - البرج الشمسي (الميلاد): ${result.birthZodiacSign ? `${result.birthZodiacSign} (${result.birthElement})` : "غير متوفر"}
    - النتيجة الحسابية النهائية: ${isqatDesc}
    - حظوظ الكوكب الحاكم (${result.rulingPlanet}): ${result.dignities ? `شرف: ${result.dignities.exaltation}، هبوط: ${result.dignities.fall}` : "لا يوجد"}

    المطلوب:
    قدم حكماً فلكياً مفصلاً بأسلوب تراثي رصين (مشابه لكتب أبي معشر الفلكي) يشرح دلالة هذه النتيجة.
    
    🛑 تعليمات هامة جداً للصياغة (اقرأها جيداً):
    1. **لا تبدأ الرد بتكرار البيانات** (لا تكتب: "اسم السائل كذا ومجموع الجمل كذا..."). المستخدم يرى هذه الأرقام أمامه بالفعل.
    2. **ابدأ مباشرة بتفسير الحكم**: مثلاً ابدأ بـ "دلّت الحسابات الفلكية ووضع الكوكب [اسم الكوكب] على..." أو "يشير طالعك في هذه المسألة إلى...".
    3. ركز فوراً على **الدلالة والنتيجة**.
    4. قارن بين طبع الاسم (الروحاني) وطبع الميلاد (الشمسي) وتأثيرهما على النتيجة.
    5. اذكر النصيحة العملية والروحانية في النهاية.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    // Check if the response contains text. If blocked or empty, throw an error.
    if (!response.text) {
      throw new Error("NO_CONTENT_GENERATED");
    }

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};