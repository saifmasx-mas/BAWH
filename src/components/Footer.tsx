// ==========================================
// مكون التذييل وقائمة الختام (Footer Component)
// ==========================================

import React, { useState } from 'react';
import { Feather, Mail, Send, Check, Heart, ExternalLink, Phone, MapPin, MessageCircle } from 'lucide-react';
import { NAV_ITEMS, CATEGORIES_DATA, BLOG_CONTACT_INFO } from '../data/blogData';

interface FooterProps {
  onOpenContact: () => void;
  onSelectCategory?: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onSelectCategory }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <footer id="footer" aria-label="تذييل مدونة بوح" className="bg-[#241E1A] text-[#D8CEC4] pt-16 pb-12 border-t-4 border-[#8C2D38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* قسم النشرة البريدية الرئيسي (Newsletter) */}
        <div className="bg-[#2E2722] border border-[#443831] rounded-2xl p-6 sm:p-10 mb-14 text-center sm:text-right flex flex-col lg:flex-row items-center justify-between gap-8 shadow-md">
          <div className="max-w-xl">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-400 text-xs font-bold uppercase mb-2 tracking-wider">
              <Mail className="w-4 h-4" />
              <span>نشرة بوح الأسبوعية</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-amiri text-white mb-2">
              انضم إلى ديوان «بوح» الثقافي
            </h3>
            <p className="text-xs sm:text-sm text-[#B4A79A] font-tajawal leading-relaxed">
              تصلك صباح كل خميس مختارات من أحدث ما كتب في الشعر الملتزم، وقراءات نقدية وازنة، ومقامات طريفة تثري ذائقتك الأدبية.
            </p>
          </div>

          {/* نموذج الاشتراك */}
          <div className="w-full sm:max-w-md">
            {isSubscribed ? (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-[#8C2D38]/40 border border-[#8C2D38] text-white text-xs font-semibold justify-center">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>أهلاً بك في ديوان بوح! تم تسجيل بريدك بنجاح.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="أدخل بريدك الإلكتروني..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  dir="ltr"
                  className="px-4 py-3 rounded-xl bg-[#1C1714] border border-[#4D4037] text-white placeholder-[#8A7C6E] text-xs sm:text-sm focus:outline-hidden focus:border-[#C29B38] text-right w-full font-sans"
                />
                <button
                  type="submit"
                  id="btn-newsletter-subscribe"
                  className="px-6 py-3 rounded-xl bg-[#8C2D38] hover:bg-[#A33644] text-white font-bold text-xs sm:text-sm transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>اشتراك</span>
                </button>
              </form>
            )}
            <span className="text-[11px] text-[#85766A] mt-2 block text-center sm:text-right">
              لا نرسل إعلانات مزعجة. يمكنك إلغاء الاشتراك في أي وقت.
            </span>
          </div>
        </div>

        {/* شبكة الروابط والمعلومات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#3D332C]">
          
          {/* العمود الأول: هوية المدونة */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#8C2D38] text-amber-100 flex items-center justify-center border border-[#A83D4A]">
                <Feather className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold font-amiri text-white block">بَـوْح</span>
                <span className="text-[10px] tracking-widest text-amber-400 uppercase font-sans">BAWH MAGAZINE</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#A89A8E] font-tajawal leading-relaxed">
              منصة أدبية وثقافية عربية تعيد الاعتبار لرسالية الكلمة، وتجمع بين فصاحة التراث وأسئلة الواقع المعاصر في ظلال العزة والحرية.
            </p>
          </div>

          {/* العمود الثاني: أروقة المدونة */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-[#443831] font-cairo">
              أروقة المدونة
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#BDB0A3]">
              {CATEGORIES_DATA.map((c) => (
                <li key={c.id}>
                  <a
                    href="#categories"
                    onClick={() => onSelectCategory && onSelectCategory(c.title)}
                    className="hover:text-amber-300 transition-colors inline-block"
                  >
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الثالث: روابط سريعة */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-[#443831] font-cairo">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#BDB0A3]">
              {NAV_ITEMS.map((nav) => (
                <li key={nav.id}>
                  <a
                    href={nav.href}
                    className="hover:text-amber-300 transition-colors inline-block"
                  >
                    {nav.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-right"
                >
                  أرسل لنا مساهمتك الأدبية
                </button>
              </li>
            </ul>
          </div>

          {/* العمود الرابع: بيانات التواصل والمقر */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-[#443831] font-cairo flex items-center justify-between">
              <span>بيانات التواصل والمقر</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </h4>
            
            <ul className="space-y-3 text-xs sm:text-sm text-[#D8CEC4] mb-5 font-tajawal">
              <li>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C29B38] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-[#A89A8E] block">المقر الرئيسي:</span>
                    <span className="font-semibold text-white">{BLOG_CONTACT_INFO.address}</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#C29B38] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-[#A89A8E] block">الهاتف / واتساب:</span>
                    <a
                      href={BLOG_CONTACT_INFO.phoneHref}
                      dir="ltr"
                      className="font-bold text-amber-200 hover:text-white transition-colors inline-block font-sans"
                    >
                      {BLOG_CONTACT_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#C29B38] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-[#A89A8E] block">البريد الإلكتروني:</span>
                    <a
                      href={BLOG_CONTACT_INFO.emailHref}
                      dir="ltr"
                      className="text-amber-200 hover:text-white transition-colors inline-block font-sans break-all"
                    >
                      {BLOG_CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[11px] text-[#8C7E72] block mb-2 font-cairo">تابعنا عبر المنصات:</span>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {['منصة إكس', 'تلغرام الأدبي', 'يوتيوب الثقافي', 'واتساب'].map((social, idx) => (
                  <a
                    key={idx}
                    href={social === 'واتساب' ? BLOG_CONTACT_INFO.whatsappUrl : '#social'}
                    target={social === 'واتساب' ? '_blank' : undefined}
                    rel={social === 'واتساب' ? 'noopener noreferrer' : undefined}
                    onClick={social !== 'واتساب' ? (e) => e.preventDefault() : undefined}
                    className="px-2.5 py-1 rounded-md bg-[#2F2722] hover:bg-[#8C2D38] text-[#D8CEC4] hover:text-white transition-colors border border-[#483C34]"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* شريط حقوق النشر والختام */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7C70]">
          <p id="copyright-text">
            © 2026 مدونة بوح الأدبية. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>الكلمة ميثاق .. والحرف نبض الأمة</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
