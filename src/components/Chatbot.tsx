// ==========================================
// مساعد «أديب بوح» الذكي (Literary Chatbot)
// ==========================================

import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  RotateCcw,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Feather,
  ChevronDown
} from 'lucide-react';
import { BLOG_CONTACT_INFO } from '../data/blogData';
import { ChatMessage } from '../types';

interface ChatbotProps {
  onOpenContactModal?: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-init-1',
    sender: 'assistant',
    text: `أهلاً بك يا رفيق الحرف في رحاب «بوح»! 🌿
أنا **«أديب بوح»**، مستشارك الأدبي الذكي. 

يسعدني أن أحاورك في:
• موازين الشعر وعلم العروض والبحور الستة عشر.
• قضايا الشعر الملتزم وأدب المقاومة.
• فن المقامات، السجع البياني، والنقد الأدبي.
• الإجابة عن أي استفسار حول المدونة أو تزويدك ببيانات التواصل ومقرنا في بورصا.

بمَ ترغب أن نبدأ؟ يمكنك الاختيار من المقترحات أدناه أو كتابة سؤالك مباشرة:`,
    timestamp: 'الآن',
    suggestedPrompts: [
      '📞 ما هي أرقام وبيانات التواصل؟',
      '⚖️ اشرح لي بحر الكامل ومفتاحه',
      '📜 ما هو مفهوم الشعر الملتزم؟',
      '✒️ حدثني عن فن المقامات',
    ],
  },
];

export const Chatbot: React.FC<ChatbotProps> = ({ onOpenContactModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // التمرير التلقائي لأسفل المحادثة
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen]);

  // التركيز على حقل الإدخال عند فتح المحادثة
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized]);

  // نغمة خفيفة عند استلام الرد (Web Audio API)
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // تجاهل إذا لم تدعم البيئة الصوت
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // إعداد تاريخ المحادثة الموجز للسياق
      const history = messages.slice(-5).map((m) => ({
        role: m.sender === 'user' ? ('user' as const) : ('model' as const),
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const botReply = data.reply || 'أهلاً بك! يمكنك تكرار السؤال أو تصفح مقالات المدونة.';

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: botReply,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: query.includes('تواصل') || query.includes('هاتف')
          ? ['⚖️ اشرح لي بحر الوافر', '📜 ما هو الشعر الملتزم؟']
          : ['📞 بيانات التواصل ومقر المدونة', '✒️ اكتب لي مطلع مقامة'],
      };

      setMessages((prev) => [...prev, botMsg]);
      playChime();
    } catch (err) {
      console.error('Chat error:', err);
      // في حال تعذر الاتصال، نقدم رداً أدبياً مباشراً مع بيانات التواصل
      const fallbackReply = `يا رفيق الكلمة، نرحب باستفسارك دائماً! يمكنك مراسلتنا أو الاتصال بنا مباشرة:
      
📞 **الهاتف والواتساب:** [${BLOG_CONTACT_INFO.phoneDisplay}](${BLOG_CONTACT_INFO.phoneHref})
📧 **البريد الإلكتروني:** [${BLOG_CONTACT_INFO.email}](${BLOG_CONTACT_INFO.emailHref})
📍 **المقر:** ${BLOG_CONTACT_INFO.address}`;

      const fallbackMsg: ChatMessage = {
        id: `bot-fallback-${Date.now()}`,
        sender: 'assistant',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  // تنسيق النص الأدبي وتلوين الشواهد والروابط
  const formatText = (content: string) => {
    // تقطيع الفقرات
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // شواهد شعرية بين نجوم أو أقواس
      if (line.trim().startsWith('*') && line.trim().endsWith('*')) {
        return (
          <p key={idx} className="my-2 p-2 bg-[#F3ECE0] border-r-2 border-[#8C2D38] text-[#781E28] font-amiri text-base font-bold text-center rounded-sm">
            {line.replace(/\*/g, '')}
          </p>
        );
      }
      return (
        <span key={idx} className="block mb-1.5 leading-relaxed">
          {line}
        </span>
      );
    });
  };

  return (
    <>
      {/* زر إطلاق البوت العائم (Floating Action Button) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 bg-[#2C2420] text-amber-200 text-xs py-1.5 px-3 rounded-full shadow-lg border border-[#C29B38]/40 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-tajawal">استشر «أديب بوح» في الشعر والأدب</span>
          </div>
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
          }}
          id="btn-open-chatbot"
          aria-label="فتح محادثة أديب بوح"
          className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-[#8C2D38] to-[#A33644] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center border-2 border-[#D4AF37] cursor-pointer"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
          ) : (
            <>
              <Bot className="w-7 h-7" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 border-2 border-[#2C2420] rounded-full animate-ping" />
              )}
              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 border-2 border-[#2C2420] rounded-full" />
              )}
            </>
          )}
        </button>
      </div>

      {/* نافذة المحادثة (Chat Window) */}
      {isOpen && (
        <div
          id="chatbot-window"
          className={`fixed z-50 transition-all duration-300 bottom-22 left-4 sm:left-6 w-[94vw] sm:w-[420px] bg-[#FBF9F5] rounded-2xl shadow-2xl border border-[#DDD0B8] flex flex-col overflow-hidden ${
            isMinimized ? 'h-16' : 'h-[580px] max-h-[82vh]'
          }`}
          style={{ boxShadow: '0 20px 45px -10px rgba(44, 36, 32, 0.35)' }}
        >
          {/* رأس نافذة المحادثة */}
          <div className="bg-[#2C2420] text-white px-4 py-3.5 flex items-center justify-between border-b border-[#4D3F37]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#8C2D38] border border-[#C29B38] flex items-center justify-center text-amber-200">
                  <Feather className="w-4 h-4" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#2C2420]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm font-amiri text-white tracking-wide">
                    أديب بوح الذكي
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-[#8C2D38] text-amber-200 font-sans">
                    AI أدبي
                  </span>
                </div>
                <p className="text-[11px] text-[#C4B6A8] font-tajawal">
                  مستشار في الشعر والعروض وبلاغة الأدب
                </p>
              </div>
            </div>

            {/* أدوات التحكم العلوية */}
            <div className="flex items-center gap-1 text-[#D8CEC4]">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? 'كتم التنبيهات الصوتية' : 'تفعيل التنبيهات الصوتية'}
                className="p-1.5 hover:text-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-50" />}
              </button>

              <button
                onClick={handleResetChat}
                title="إعادة بدء المحادثة"
                className="p-1.5 hover:text-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'توسيع' : 'تصغير'}
                className="p-1.5 hover:text-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="إغلاق المحادثة"
                className="p-1.5 hover:text-[#E25C6A] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* شريط الإسناد السريع للتواصل الرسمي المباشر */}
              <div className="bg-[#F2EADA] px-3.5 py-2 border-b border-[#E5DBC7] flex items-center justify-between text-xs text-[#5C4D41]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8C2D38]" />
                  <span className="font-semibold text-[11px]">مقرنا: {BLOG_CONTACT_INFO.address}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <a
                    href={BLOG_CONTACT_INFO.phoneHref}
                    className="flex items-center gap-1 text-[#8C2D38] hover:underline font-semibold dir-ltr font-sans"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{BLOG_CONTACT_INFO.phoneDisplay}</span>
                  </a>
                  <span className="text-[#C5B7A5]">|</span>
                  <a
                    href={BLOG_CONTACT_INFO.emailHref}
                    className="flex items-center gap-1 text-[#8C2D38] hover:underline font-semibold font-sans"
                    title={BLOG_CONTACT_INFO.email}
                  >
                    <Mail className="w-3 h-3" />
                    <span className="hidden sm:inline">راسلنا</span>
                  </a>
                </div>
              </div>

              {/* منطقة الرسائل */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FBF9F5] text-[#2C2420] text-sm">
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div className={`flex items-start gap-2 max-w-[88%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* صورة أو أيقونة المرسل */}
                        <div
                          className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs ${
                            isUser
                              ? 'bg-[#8C2D38] text-white'
                              : 'bg-[#2C2420] text-amber-300 border border-[#C29B38]'
                          }`}
                        >
                          {isUser ? <User className="w-3.5 h-3.5" /> : <Feather className="w-3.5 h-3.5" />}
                        </div>

                        {/* بالون الرسالة */}
                        <div
                          className={`relative rounded-2xl p-3.5 text-xs sm:text-sm font-tajawal leading-relaxed shadow-xs ${
                            isUser
                              ? 'bg-[#8C2D38] text-white rounded-br-none'
                              : 'bg-[#F2ECE1] text-[#241D19] border border-[#DDD0B8] rounded-bl-none'
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{formatText(msg.text)}</div>

                          {/* وقت الرسالة وأزرار إضافية */}
                          <div
                            className={`flex items-center gap-2 mt-2 pt-1 border-t text-[10px] ${
                              isUser
                                ? 'border-white/20 text-white/70 justify-end'
                                : 'border-[#E0D4C0] text-[#7A6C5E] justify-between'
                            }`}
                          >
                            <span>{msg.timestamp}</span>
                            {!isUser && (
                              <button
                                onClick={() => handleCopy(msg.id, msg.text)}
                                className="flex items-center gap-1 hover:text-[#8C2D38] transition-colors cursor-pointer"
                                title="نسخ الإجابة"
                              >
                                {copiedId === msg.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-600" />
                                    <span>تم النسخ</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>نسخ</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* اقتراحات الأسئلة المرفقة مع الرسالة إن وجدت */}
                      {!isUser && msg.suggestedPrompts && (
                        <div className="mt-2.5 mr-9 flex flex-wrap gap-1.5">
                          {msg.suggestedPrompts.map((prompt, pIdx) => (
                            <button
                              key={pIdx}
                              onClick={() => handleSendMessage(prompt)}
                              className="text-[11px] font-tajawal bg-[#EDE4D2] hover:bg-[#8C2D38] hover:text-white text-[#524438] py-1 px-2.5 rounded-full border border-[#D5C7B0] transition-colors cursor-pointer shadow-2xs"
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* مؤشر جاري الكتابة */}
                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-[#7A6C5E]">
                    <div className="w-7 h-7 rounded-full bg-[#2C2420] text-amber-300 flex items-center justify-center">
                      <Feather className="w-3.5 h-3.5 animate-pulse" />
                    </div>
                    <div className="bg-[#F2ECE1] border border-[#DDD0B8] rounded-2xl rounded-bl-none px-4 py-2.5 flex items-center gap-1.5">
                      <span className="text-[11px] font-tajawal text-[#5A4D43]">«أديب بوح» يصوغ بيانه الأدبي</span>
                      <span className="inline-block w-1.5 h-1.5 bg-[#8C2D38] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="inline-block w-1.5 h-1.5 bg-[#8C2D38] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="inline-block w-1.5 h-1.5 bg-[#8C2D38] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* حقل الإدخال والإرسال */}
              <div className="p-3 bg-[#F4EDE0] border-t border-[#DFD3BE]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="اسأل عن بحر شعري، نقد نص، أو بيانات التواصل..."
                    disabled={isLoading}
                    className="flex-1 bg-[#FBF9F5] border border-[#D4C6AF] focus:border-[#8C2D38] focus:outline-hidden rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#241D19] placeholder-[#8E7E70] font-cairo shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    aria-label="إرسال"
                    className="w-10 h-10 rounded-xl bg-[#8C2D38] hover:bg-[#731F29] disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* روابط سريعة مساندة تحت مربع الكتابة */}
                <div className="mt-2 flex items-center justify-between text-[11px] text-[#7A6C5E] px-1 font-tajawal">
                  <span>مدونة بوح • بورصا، تركيا</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={BLOG_CONTACT_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline flex items-center gap-0.5"
                    >
                      <span>واتساب مباشر</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    {onOpenContactModal && (
                      <button
                        type="button"
                        onClick={onOpenContactModal}
                        className="text-[#8C2D38] hover:underline cursor-pointer"
                      >
                        إرسال مقال للنشر
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
