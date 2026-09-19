// ==========================================
// مكون الترويسة وشريط التصفح (Header & Navbar)
// ==========================================

import React, { useState, useEffect } from 'react';
import { Feather, Menu, X, Search, Sparkles, BookOpen, Phone, Mail, MapPin } from 'lucide-react';
import { NAV_ITEMS, BLOG_CONTACT_INFO } from '../data/blogData';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenContact: () => void;
  onSelectCategory?: (categoryName: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenContact, onSelectCategory }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // استشعار التمرير لإضفاء ظل خفيف على شريط التصفح
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, label: string) => {
    setIsMobileMenuOpen(false);
    if (href === '#footer' || label === 'تواصل معنا') {
      onOpenContact();
      return;
    }
    
    // التمرير السلس إلى القسم المطلوب
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBF9F5]/95 backdrop-blur-md shadow-xs border-b border-[#E2D7C3]'
          : 'bg-[#FBF9F5] border-b border-[#EDE6D8]'
      }`}
    >
      {/* شريط الإعلان الأدبي العلوي الخفيف */}
      <div className="bg-[#2C2420] text-[#E7DFD5] text-[11px] sm:text-xs py-1.5 px-4 tracking-wide border-b border-[#443831]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <span className="inline-flex items-center gap-1.5 text-amber-300 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>مدونة فكرية وأدبية تعنى بالشعر العربي الملتزم ونقد السرد والمقامات</span>
          </span>
          <div className="flex items-center gap-4 text-[#D5C9BD] font-tajawal text-[11px]">
            <span className="hidden md:inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>{BLOG_CONTACT_INFO.address}</span>
            </span>
            <span className="hidden md:inline text-[#55463D]">|</span>
            <a
              href={BLOG_CONTACT_INFO.phoneHref}
              className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 font-sans dir-ltr font-semibold"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{BLOG_CONTACT_INFO.phoneDisplay}</span>
            </a>
            <span className="text-[#55463D]">|</span>
            <a
              href={BLOG_CONTACT_INFO.emailHref}
              className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 font-sans"
              title={BLOG_CONTACT_INFO.email}
            >
              <Mail className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">{BLOG_CONTACT_INFO.email}</span>
              <span className="sm:hidden">راسلنا</span>
            </a>
          </div>
        </div>
      </div>

      {/* الشريط الرئيسي */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* شعار المدونة (BAWH - بوح) */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              id="brand-logo-link"
              className="group flex items-center gap-3 focus:outline-hidden"
              aria-label="الصفحة الرئيسية لمدونة بوح"
            >
              {/* أيقونة الشعار بطابع ختم الخط العربي */}
              <div className="w-12 h-12 rounded-xl bg-[#8C2D38] text-amber-100 flex items-center justify-center shadow-md shadow-[#8C2D38]/15 border border-[#A83D4A] group-hover:bg-[#731F29] transition-colors">
                <Feather className="w-6 h-6 transform group-hover:-rotate-12 transition-transform duration-300" />
              </div>
              
              {/* النص والعنوان */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-amiri text-[#2C2420] tracking-tight group-hover:text-[#8C2D38] transition-colors">
                    بَـوْح
                  </span>
                  <span className="text-xs font-semibold tracking-widest text-[#8C2D38] uppercase font-sans">
                    BAWH
                  </span>
                </div>
                <span className="text-[11px] text-[#786C62] -mt-1 font-tajawal">
                  مدونة الأدب الملتزم وفن المقامات
                </span>
              </div>
            </a>
          </div>

          {/* روابط التصفح للشاشات المتوسطة والكبيرة */}
          <nav id="desktop-navbar" className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="التصفح الرئيسي">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href, item.label)}
                className="px-3.5 py-2 text-sm font-medium text-[#4A3F37] hover:text-[#8C2D38] hover:bg-[#F1ECE1] rounded-lg transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* الأزرار الجانبية (بحث، تواصل، وزر الجوال) */}
          <div className="flex items-center gap-2.5">
            {/* زر البحث السريع */}
            <button
              onClick={onOpenSearch}
              id="btn-search-trigger"
              className="p-2.5 text-[#5C5046] hover:text-[#8C2D38] hover:bg-[#F1ECE1] rounded-lg transition-colors cursor-pointer"
              title="بحث في نصوص ومقالات المدونة"
              aria-label="بحث في المدونة"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* زر تواصل معنا السريع */}
            <button
              onClick={onOpenContact}
              id="btn-quick-contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#8C2D38] text-white text-xs font-semibold rounded-lg hover:bg-[#731F29] shadow-xs transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>مساهمة أدبية</span>
            </button>

            {/* زر القائمة للشاشات الصغيرة */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="btn-mobile-menu-toggle"
              className="lg:hidden p-2.5 text-[#2C2420] hover:bg-[#F1ECE1] rounded-lg transition-colors cursor-pointer"
              aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* قائمة الجوال المنسدلة */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#FBF9F5] border-t border-[#E8DFC9] px-4 pt-3 pb-6 shadow-xl animate-fadeIn"
        >
          <div className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href, item.label)}
                className="w-full text-right px-4 py-2.5 rounded-lg text-sm font-medium text-[#2C2420] hover:bg-[#F2ECE0] hover:text-[#8C2D38] transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-[#EDE4D2] mt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full text-center py-2.5 bg-[#8C2D38] text-white text-sm font-semibold rounded-lg shadow-xs cursor-pointer"
              >
                شاركنا بقصيدة أو مقال نقدي
              </button>

              {/* بطاقة معلومات التواصل السريع للجوال */}
              <div className="mt-2 p-3 bg-[#F2ECE0] rounded-xl border border-[#DFD5C0] text-xs space-y-2 text-[#4A3D33] font-tajawal">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#8C2D38]" />
                  <span>المقر: {BLOG_CONTACT_INFO.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#8C2D38]" />
                  <a href={BLOG_CONTACT_INFO.phoneHref} className="font-bold text-[#8C2D38] dir-ltr font-sans">
                    {BLOG_CONTACT_INFO.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#8C2D38]" />
                  <a href={BLOG_CONTACT_INFO.emailHref} className="text-[#8C2D38] font-sans break-all">
                    {BLOG_CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
