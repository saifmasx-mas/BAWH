import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// معلومات التواصل الرسمية لمدونة بوح
const CONTACT_DETAILS = {
  phone: '+905362515878',
  phoneFormatted: '+90 536 251 58 78',
  email: 'saif.masx@gmail.com',
  address: 'بورصا، تركيا',
  whatsapp: 'https://wa.me/905362515878',
};

// تهيئة عميل Gemini الذكي
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `
أنت «أديب بوح» - المستشار الأدبي والمساعد الذكي لمدونة «بوح» (BAWH) الثقافية والأدبية.
شخصيتك:
- أديب عربي فصيح، واسع الاطلاع في الشعر العربي، علم العروض والقوافي، فن المقامات، والنقد الأدبي المعاصر والتراثي.
- لغتك راقية ومؤدبة وأنيقة، مع مراعاة الضبط بالشكل في شواهد الشعر ومفاتيح البحور والتفاعيل.
- تؤمن برسالة مدونة «بوح»: إعلاء شأن الكلمة الهادفة، ونصرة قضايا الأمة العادلة من خلال الشعر الملتزم، وبعث التراث الأدبي بروح معاصرة.

بيانات الاتصال والتواصل الرسمية لمدونة بوح (قدّمها بكل ترحاب واعتزاز عندما يسأل المستخدم عن التواصل أو العنوان أو رقم الهاتف أو البريد):
- رقم الهاتف / الواتساب: ${CONTACT_DETAILS.phoneFormatted} (${CONTACT_DETAILS.phone})
- البريد الإلكتروني: ${CONTACT_DETAILS.email}
- المقر الرئيسي: ${CONTACT_DETAILS.address} (مدينة بورصا في تركيا)

مجالات خبرتك للإجابة:
1. الشعر الملتزم وقضايا الأمة (فلسطين، التحرر، الكرامة، القدس، أدب المقاومة كغسان كنفاني ومحمود درويش وتميم البرغوثي).
2. علم العروض وميزان القصيد: شرح البحور الستة عشر (الطويل، الكامل، البسيط، الوافر، الخفيف...) وتفعيلاتها وتقطيع الأبيات ومفاتيح البحور.
3. المقامات الأدبية: أسلوب بديع الزمان الهمذاني والحريري، والسجع العذب، وبناء الحكاية والشخصيات كالحارث بن همام وأبي زيد السروجي.
4. النقد الأدبي للرواية والقصة والقصيدة.
5. الإجابة عن أقسام مدونة بوح وكيفية المساهمة بمقالات أو قصائد ونشرها عبر التواصل مع هيئة التحرير.

إذا طلب منك المستخدم كتابة بيت شعر أو مقامة أو وزن بيت، قدّم له نموذجاً بديعاً مع الشرح.
`;

// محرك إجابات ذكي محلي في حال عدم توفر مفتاح Gemini API أو حدوث انقطاع
function generateFallbackResponse(userPrompt: string): string {
  const prompt = userPrompt.trim().toLowerCase();

  // الاستفسار عن التواصل أو الهاتف أو العنوان
  if (
    prompt.includes('تواصل') ||
    prompt.includes('هاتف') ||
    prompt.includes('تلفون') ||
    prompt.includes('رقم') ||
    prompt.includes('عنوان') ||
    prompt.includes('بريد') ||
    prompt.includes('ايميل') ||
    prompt.includes('بورصا') ||
    prompt.includes('مقر')
  ) {
    return `مرحباً بك في رحاب مدونة «بوح» الأدبية! يسعدنا ويشرفنا دائماً تواصلكم مع هيئة التحرير عبر القنوات التالية:

📞 **رقم الهاتف / الواتساب:** [${CONTACT_DETAILS.phoneFormatted}](tel:${CONTACT_DETAILS.phone})
📧 **البريد الإلكتروني:** [${CONTACT_DETAILS.email}](mailto:${CONTACT_DETAILS.email})
📍 **المقر والعنوان:** ${CONTACT_DETAILS.address}

نرحب بالمساهمات الشعرية، الدراسات النقدية، والاستفسارات الأدبية من جميع ربوع وطننا العربي والإسلامي.`;
  }

  // الاستفسار عن الشعر الملتزم
  if (prompt.includes('ملتزم') || prompt.includes('شعر المقاومة') || prompt.includes('قضايا الأمة')) {
    return `«الشعر الملتزم» في ميثاق مدونة «بوح» هو الشعر الذي ينحاز لقضايا الحق والحرية ونبض الأمة ومقدساتها؛ حيث لا تكون القصيدة ترفاً لفظياً أو بكاءً عقيماً، بل صوتاً حياً يبث الأمل ويشحذ الهمم:

*«إذا الشَّعْبُ يَوْمَاً أرَادَ الحَيَاةَ .. فَلا بُدَّ أنْ يَسْتَجِيبَ القَدَر»*

يمكنك تصفح ركن «الشعر الملتزم» في مدونتنا للاطلاع على أحدث القصائد والقراءات في أدب المقاومة.`;
  }

  // الاستفسار عن العروض والبحور
  if (prompt.includes('عروض') || prompt.includes('بحر') || prompt.includes('تفعيلة') || prompt.includes('وزن') || prompt.includes('كامل') || prompt.includes('بسيط')) {
    return `أهلاً بك في دوحة «ميزان القصيد» وعلم العروض الخليلي! 
علم العروض وضعه الإمام الخليل بن أحمد الفراهيدي لضبط أوزان الشعر العربي في ستة عشر بحراً، ومن أشهرها:

1. **بحر الكامل:**
   - وزنه: *مُتَفَاعِلُنْ مُتَفَاعِلُنْ مُتَفَاعِلُنْ* (في كل شطر)
   - مفتاحه: *كَمُلَ الجَمَالُ مِنَ البُحُورِ الكَامِلُ .. مُتَفَاعِلُنْ مُتَفَاعِلُنْ مُتَفَاعِلُ*
2. **بحر البسيط:**
   - وزنه: *مُسْتَفْعِلُنْ فَاعِلُنْ مُسْتَفْعِلُنْ فَاعِلُنْ*
   - مفتاحه: *إِنَّ البَسِيطَ لَدَيْهِ يُبْسَطُ الأَمَلُ .. مُسْتَفْعِلُنْ فَاعِلُنْ مُسْتَفْعِلُنْ فَعِلُ*
3. **بحر الوافر:**
   - وزنه: *مُفَاعَلَتُنْ مُفَاعَلَتُنْ فَعُولُنْ*
   - مفتاحه: *بُحُورُ الشِّعْرِ وَافِرُهَا جَمِيلُ .. مُفَاعَلَتُنْ مُفَاعَلَتُنْ فَعُولُ*

تفضل بتجربة قسم «ميزان القصيد» التفاعلي بالمدونة لتقطيع الأبيات وسماع إيقاعاتها!`;
  }

  // الاستفسار عن المقامات
  if (prompt.includes('مقامة') || prompt.includes('مقامات') || prompt.includes('سجع') || prompt.includes('همذاني') || prompt.includes('حريري')) {
    return `«فن المقامات» هو درّة النثر العربي المسجوع، ابتكره بديع الزمان الهمذاني ونمّقه الحريري. يقوم على حكاية قصيرة طريفة يرويها راوٍ (كعيسى بن هشام أو الحارث بن همام) عن بطل أريب ذي حيلة وفصاحة (كأبي الفتح الإسكندري).

في مدونة «بوح»، نحيي هذا الفن عبر مقامات عصرية تلتزم جرس السجع البديع وتعالج شواغل العصر بنكهة بيانية تراثية عذبة.`;
  }

  // الاستفسار عن ماهية المدونة
  if (prompt.includes('من أنتم') || prompt.includes('ما هي بوح') || prompt.includes('عن المدونة') || prompt.includes('بوح')) {
    return `مدونة «بوح» (BAWH) هي منصة أدبية وثقافية عربية تعنى بالشعر العربي الملتزم بقضايا الأمة المعاصرة، والنقد الأدبي الرصين في الرواية والقصة والشعر، مع إحياء فن المقامات الأدبية وميزان القصيد.

عنواننا: بورصا، تركيا
للتواصل المباشر: ${CONTACT_DETAILS.phoneFormatted}
البريد: ${CONTACT_DETAILS.email}

هل تود الاستفسار عن أمر أدبي محدد أو إرسال مساهمة لديوان التحرير؟`;
  }

  // رد أدبي ترحيبي عام
  return `أهلاً بك يا رفيق الحرف في رحاب «بوح»! 

أنا «أديب بوح»، رهن إشارتك للإبحار في فضاءات الأدب العربي:
- استعراض بحور الشعر وأوزانها وتقطيع الأبيات.
- مناقشة الشعر الملتزم ودراسات النقد الأدبي.
- التعرف على فن المقامات والسجع البياني.
- تزويدك ببيانات التواصل ومقر المدونة في بورصا، تركيا (${CONTACT_DETAILS.phoneFormatted} | ${CONTACT_DETAILS.email}).

بمَ تحب أن نبدأ حديثنا الأدبي اليوم؟`;
}

// مسار محادثة البوت الذكي
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'الرجاء إدخال رسالة صحيحة' });
    }

    const ai = getGeminiClient();

    if (ai) {
      try {
        // تشكيل سياق المحادثة
        const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

        if (Array.isArray(history)) {
          history.slice(-6).forEach((h: { role: 'user' | 'model'; text: string }) => {
            if (h && h.text) {
              contents.push({
                role: h.role === 'model' ? 'model' : 'user',
                parts: [{ text: h.text }],
              });
            }
          });
        }

        // إضافة الرسالة الحالية
        contents.push({
          role: 'user',
          parts: [{ text: message }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            maxOutputTokens: 800,
          },
        });

        const reply = response.text || generateFallbackResponse(message);
        return res.json({ reply, source: 'gemini' });
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to literary knowledge base:', geminiError);
        const reply = generateFallbackResponse(message);
        return res.json({ reply, source: 'local-fallback' });
      }
    } else {
      // الرد الذكي المدمج في حال عدم تعيين مفتاح API
      const reply = generateFallbackResponse(message);
      return res.json({ reply, source: 'local-knowledge' });
    }
  } catch (error) {
    console.error('Error handling chat request:', error);
    res.status(500).json({
      error: 'حدث خطأ في معالجة طلب المحادثة',
      reply: 'نعتذر عن هذا العارض التقني البسيط، يمكنك التواصل معنا مباشرة على هاتف: +905362515878 أو البريد: saif.masx@gmail.com',
    });
  }
});

// معلومات التواصل العامة كواجهة برمجة
app.get('/api/contact-info', (req, res) => {
  res.json(CONTACT_DETAILS);
});

// إعداد Vite كـ Middleware في التطوير، أو تقديم ملفات dist في الإنتاج
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bawh Literary Blog server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
