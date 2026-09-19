// ==========================================================
// قسم ميزان القصيد وعلم العروض (Poetic Meter Interactive Section)
// ==========================================================

import React, { useState } from 'react';
import { Scale, Music, Sparkles, BookOpen, Volume2, Info, ChevronLeft } from 'lucide-react';
import { POETIC_METERS_DATA } from '../data/blogData';
import { PoeticMeter } from '../types';

export const PoeticMeterSection: React.FC = () => {
  const [selectedMeter, setSelectedMeter] = useState<PoeticMeter>(POETIC_METERS_DATA[0]);
  const [activeBeat, setActiveBeat] = useState<number | null>(null);

  // تشغيل إيقاع بصري خفيف للتفعيلة لمحاكاة نغم العروض الخليلي
  const handleSimulateRhythm = () => {
    const parts = selectedMeter.pattern.split(' ');
    parts.forEach((_, idx) => {
      setTimeout(() => {
        setActiveBeat(idx);
      }, idx * 600);
    });
    setTimeout(() => {
      setActiveBeat(null);
    }, parts.length * 600 + 400);
  };

  return (
    <section
      id="meter-section"
      aria-label="ميزان القصيد وعلم العروض"
      className="py-16 sm:py-24 bg-[#FAF7F1] border-b border-[#E8DEC8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* رأس القسم */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8C2D38] tracking-wider uppercase mb-2">
            <Scale className="w-4 h-4 text-[#8C2D38]" />
            <span>علم العروض والقوافي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-amiri text-[#1F1916] mb-3">
            مِيزَانُ القَصِيدِ.. هَنْدَسَةُ النَّغَمِ العَرَبِي
          </h2>
          <p className="text-sm sm:text-base text-[#615247] font-tajawal">
            تعرّف على بحور الشعر العربي ومفاتيحها التراثية وتفاعيلها الموسيقية المستنبطة من عبقرية الخليل بن أحمد الفراهيدي.
          </p>
        </div>

        {/* الحاوية الرئيسية للميزان */}
        <div className="max-w-4xl mx-auto bg-[#F5EFE3] border border-[#DDD0B9] rounded-2xl p-6 sm:p-8 shadow-sm">
          
          {/* أزرار اختيار البحر الشعري */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 pb-6 border-b border-[#E3D7C1]">
            {POETIC_METERS_DATA.map((meter) => (
              <button
                key={meter.key}
                onClick={() => setSelectedMeter(meter)}
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                  selectedMeter.key === meter.key
                    ? 'bg-[#8C2D38] text-white shadow-xs scale-102'
                    : 'bg-[#EAE0CE] text-[#443830] hover:bg-[#DFD3BD]'
                }`}
              >
                {meter.name}
              </button>
            ))}
          </div>

          {/* لوحة عرض البحر المختار */}
          <div className="space-y-6">
            
            {/* التفاعيل مع النبض الإيقاعي */}
            <div className="bg-[#FAF8F3] border border-[#E1D5BF] rounded-xl p-5 sm:p-6 text-center">
              <div className="flex items-center justify-between text-xs text-[#7A6C5F] mb-3">
                <span className="font-bold text-[#8C2D38]">تفاعيل البحر (الوزن الإيقاعي):</span>
                <button
                  onClick={handleSimulateRhythm}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#EDE4D0] hover:bg-[#E2D5BD] text-[#3D322A] text-xs transition-colors cursor-pointer"
                  title="استمع إلى التوقيع البصري للإيقاع"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#8C2D38]" />
                  <span>محاكاة الإيقاع</span>
                </button>
              </div>

              {/* كلمات التفاعيل */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 py-3">
                {selectedMeter.pattern.split(' ').map((tafela, index) => (
                  <span
                    key={index}
                    className={`px-3.5 py-1.5 rounded-lg font-amiri text-lg sm:text-xl font-bold transition-all duration-300 ${
                      activeBeat === index
                        ? 'bg-[#8C2D38] text-white scale-110 shadow-md ring-2 ring-[#C29B38]'
                        : 'bg-[#EFE8D7] text-[#29221D]'
                    }`}
                  >
                    {tafela}
                  </span>
                ))}
              </div>
            </div>

            {/* مفتاح البحر والشاهد الشعري */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* مفتاح البحر الشعري (نظم الحفظ) */}
              <div className="bg-[#FAF8F3] border border-[#E1D5BF] rounded-xl p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8C2D38] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>مفتاح البحر (بيت الحفظ والتذكرة):</span>
                </div>
                <p className="text-base sm:text-lg font-amiri font-bold text-[#1E1815] leading-relaxed">
                  «{selectedMeter.keyVerse}»
                </p>
                <span className="text-[11px] text-[#7A6C5F] block mt-2">
                  نظمه صفي الدين الحلي ليسهل على الطالب استحضار الوزن فور تذكر الكلمات.
                </span>
              </div>

              {/* بيت الشاهد من عيون الشعر */}
              <div className="bg-[#FAF8F3] border border-[#E1D5BF] rounded-xl p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8C2D38] mb-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>شاهدٌ من روائع القصيد:</span>
                </div>
                <div className="font-amiri text-base sm:text-lg font-bold text-[#1E1815] leading-relaxed">
                  <p>«{selectedMeter.exampleVerse.first}</p>
                  <p className="mt-1">{selectedMeter.exampleVerse.second}»</p>
                </div>
                <div className="mt-2 text-xs text-[#706255] font-semibold">
                  القائل: {selectedMeter.exampleVerse.poet}
                </div>
              </div>

            </div>

            {/* الوصف والخصائص */}
            <div className="flex items-start gap-3 bg-[#EFE9DB] border border-[#DDD0BA] rounded-xl p-4 text-xs sm:text-sm text-[#54473C] leading-relaxed">
              <Info className="w-5 h-5 text-[#8C2D38] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#2C2420] font-semibold">طبيعة البحر ومقامه: </strong>
                {selectedMeter.description}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
