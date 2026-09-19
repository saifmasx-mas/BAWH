// ==========================================
// قسم الترحيب والأبطال (Hero Section)
// ==========================================

import React, { useState } from 'react';
import { Feather, BookOpen, Compass, Copy, Check, Quote, Sparkles } from 'lucide-react';
import { VERSE_OF_THE_DAY } from '../data/blogData';

interface HeroSectionProps {
  onExploreClick: () => void;
  onMeterClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onMeterClick }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyVerse = () => {
    const textToCopy = `«${VERSE_OF_THE_DAY.first} .. ${VERSE_OF_THE_DAY.second}» - ${VERSE_OF_THE_DAY.poet} (${VERSE_OF_THE_DAY.bahr}) - منقول عن مدونة بوح الأدبية`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="hero"
      aria-label="قسم الترحيب بهوية مدونة بوح"
      className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-[#FBF9F5] via-[#F6F2E9] to-[#FBF9F5] border-b border-[#E8DEC8]"
    >
      {/* خلفية زخرفية ناعمة تحاكي الأوراق التراثية القديمة */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply bg-[radial-gradient(#D6C6AA_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* هالة إضاءة دافئة غير متطفلة */}
      <div className="absolute top-1/4 right-1/2 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#EAD8BA]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          
          {/* شارة الهوية الثقافية */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFE8D8] border border-[#D9CBB0] text-[#782832] text-xs font-semibold mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A37E2C]" />
            <span>منصة الكلمة الصادقة والنقد الملتزم</span>
            <span className="w-1 h-1 rounded-full bg-[#A37E2C]" />
            <span className="text-[#64564C]">منذ 2026</span>
          </div>

          {/* العنوان الرئيسي الهادر المعبر عن هوية المدونة */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-amiri text-[#1F1916] tracking-tight leading-tight md:leading-[1.25] mb-6">
            بَــوْح.. <span className="text-[#8C2D38]">صَوْتُ الأُمَّـةِ</span> وَنَبْـضُ قَلَمِهَا
          </h1>

          {/* النبذة المختصرة والمؤثرة عن رسالة ورؤية المدونة */}
          <p className="text-lg sm:text-xl text-[#52463D] font-cairo leading-relaxed mb-8 max-w-2xl mx-auto">
            منصة ريادية تُعنى بالشعر العربي الصامد في وجه الانكسار، والغوص النقدي الرصين في عوالم
            الرواية والقصة، وإحياء رونق <strong className="text-[#8C2D38] font-semibold">«المقامات الأدبية»</strong> بأصالة اللسان ورهافة البلاغة وهندسة <strong className="text-[#8C2D38] font-semibold">«ميزان القصيد»</strong>.
          </p>

          {/* أزرار الدعوة للعمل (Call to Action) */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-14">
            <button
              onClick={onExploreClick}
              id="hero-btn-explore"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#8C2D38] text-white font-medium text-sm hover:bg-[#731F29] shadow-md shadow-[#8C2D38]/20 transition-all hover:translate-y-[-1px] cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>استكشف المقالات والدراسات</span>
            </button>

            <button
              onClick={onMeterClick}
              id="hero-btn-meter"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#EFE9DB] text-[#2C2420] border border-[#D5C6A9] font-medium text-sm hover:bg-[#E5DDCB] transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#8C2D38]" />
              <span>ميزان القصيد وعلم العروض</span>
            </button>
          </div>

        </div>

        {/* بطاقة "بيت اليوم" الأدبي المميز */}
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl bg-[#F8F5EE] border border-[#DFD4BF] p-6 sm:p-8 shadow-xs overflow-hidden">
            
            {/* شريط علوي صغير للبطاقة */}
            <div className="flex items-center justify-between border-b border-[#E6DCC9] pb-3 mb-5">
              <div className="flex items-center gap-2">
                <Quote className="w-4 h-4 text-[#8C2D38]" />
                <span className="text-xs font-bold text-[#8C2D38] tracking-wider font-cairo">
                  شَاهِدُ اليَوْمِ الأدَبِي
                </span>
                <span className="text-xs text-[#8A7C6E] hidden sm:inline-block">| {VERSE_OF_THE_DAY.bahr}</span>
              </div>

              {/* زر نسخ البيت الشعري */}
              <button
                onClick={handleCopyVerse}
                id="btn-copy-daily-verse"
                className="inline-flex items-center gap-1.5 text-xs text-[#6B5D52] hover:text-[#8C2D38] transition-colors bg-[#EFE8D6] px-2.5 py-1 rounded-md cursor-pointer"
                title="نسخ البيت الشعري"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-medium">تم النسخ بنجاح</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ البيت</span>
                  </>
                )}
              </button>
            </div>

            {/* عرض شطري البيت الشعري بتنسيق تراثي فاخر */}
            <div className="py-2 text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-amiri font-bold text-[#1C1613] leading-relaxed mb-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
                <span className="text-[#1C1613] relative">
                  «{VERSE_OF_THE_DAY.first}
                </span>
                <span className="text-[#A37E2C] hidden sm:inline">✤</span>
                <span className="text-[#1C1613]">
                  {VERSE_OF_THE_DAY.second}»
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-[#7D6E61]">
                <Feather className="w-3.5 h-3.5 text-[#8C2D38]" />
                <span className="font-semibold text-[#4A3D33]">{VERSE_OF_THE_DAY.poet}</span>
              </div>
            </div>

            {/* حاشية بلاغية للبيت */}
            <p className="mt-4 pt-3 border-t border-[#EAE1CF] text-xs sm:text-sm text-[#6C5E53] text-center font-tajawal">
              {VERSE_OF_THE_DAY.explanation}
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};
