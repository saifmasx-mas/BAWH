// ==========================================
// نافذة التواصل والمساهمة الأدبية (Contact Modal)
// ==========================================

import React, { useState } from 'react';
import { X, Send, Feather, CheckCircle, Mail, MessageSquare, Phone, MapPin, ExternalLink } from 'lucide-react';
import { BLOG_CONTACT_INFO } from '../data/blogData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'شعر ملتزم',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', topic: 'شعر ملتزم', message: '' });
      onClose();
    }, 2800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#FBF9F5] border border-[#DDD0B8] rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* رأس النافذة */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8DEC9] mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#8C2D38] text-white flex items-center justify-center">
              <Feather className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-amiri text-[#1F1916]">تواصل مع هيئة تحرير «بوح»</h3>
              <p className="text-xs text-[#7A6C5E]">نرحب بالمساهمات الشعرية والدراسات النقدية الرصينة</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6D5E53] hover:text-[#8C2D38] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* بطاقات التواصل المباشر */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5 p-3 rounded-xl bg-[#F4EDE0] border border-[#E2D6C0]">
          <a
            href={BLOG_CONTACT_INFO.phoneHref}
            className="p-2 rounded-lg bg-[#FAF7F0] hover:bg-white border border-[#E0D3BC] text-center flex flex-col items-center justify-center transition-colors group"
          >
            <Phone className="w-4 h-4 text-[#8C2D38] mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] text-[#7A6C5E]">الهاتف / واتساب</span>
            <span className="text-xs font-bold text-[#2C2420] dir-ltr font-sans">{BLOG_CONTACT_INFO.phoneDisplay}</span>
          </a>

          <a
            href={BLOG_CONTACT_INFO.emailHref}
            className="p-2 rounded-lg bg-[#FAF7F0] hover:bg-white border border-[#E0D3BC] text-center flex flex-col items-center justify-center transition-colors group"
          >
            <Mail className="w-4 h-4 text-[#8C2D38] mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] text-[#7A6C5E]">البريد الإلكتروني</span>
            <span className="text-[11px] font-bold text-[#2C2420] dir-ltr font-sans truncate max-w-full px-1">{BLOG_CONTACT_INFO.email}</span>
          </a>

          <div className="p-2 rounded-lg bg-[#FAF7F0] border border-[#E0D3BC] text-center flex flex-col items-center justify-center">
            <MapPin className="w-4 h-4 text-[#8C2D38] mb-1" />
            <span className="text-[10px] text-[#7A6C5E]">المقر الرئيسي</span>
            <span className="text-xs font-bold text-[#2C2420] font-tajawal">{BLOG_CONTACT_INFO.address}</span>
          </div>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h4 className="text-xl font-bold font-amiri text-[#1E1815]">بوركت يمينك!</h4>
            <p className="text-sm text-[#5B4E44]">
              وصلت رسالتك إلى ديوان تحرير بوح، وسيتواصل معك المحرر الثقافي في أقرب وقت.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#483B32] mb-1">الاسم الكريم</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="مثال: د. زيد اليماني"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE0] border border-[#D8CCB5] text-sm text-[#271F1B] focus:outline-hidden focus:border-[#8C2D38] font-cairo"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#483B32] mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="yourname@domain.com"
                dir="ltr"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE0] border border-[#D8CCB5] text-sm text-[#271F1B] focus:outline-hidden focus:border-[#8C2D38] text-right font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#483B32] mb-1">محور المساهمة</label>
              <select
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE0] border border-[#D8CCB5] text-sm text-[#271F1B] focus:outline-hidden focus:border-[#8C2D38] font-cairo"
              >
                <option value="شعر ملتزم">قصيدة في الشعر الملتزم</option>
                <option value="نقد أدبي">دراسة أو مقال في النقد الأدبي</option>
                <option value="مقامة أدبية">مقامة أدبية مستحدثة</option>
                <option value="ميزان القصيد">بحث في علم العروض والقوافي</option>
                <option value="اقتراح أو استفسار">اقتراح عام أو استفسار</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#483B32] mb-1">نص المساهمة أو الرسالة</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="اكتب خلاصة المقال أو أبيات القصيدة..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE0] border border-[#D8CCB5] text-sm text-[#271F1B] focus:outline-hidden focus:border-[#8C2D38] font-cairo"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#8C2D38] hover:bg-[#731F29] text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>إرسال المساهمة إلى هيئة التحرير</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
