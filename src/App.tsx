/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * =========================================================================
 * مدونة "بوح" الأدبية والثقافية (BAWH Magazine)
 * الصفحة الرئيسية المتكاملة - صوت الأمة ونبض قلمها
 * =========================================================================
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoriesGrid } from './components/CategoriesGrid';
import { LatestPosts } from './components/LatestPosts';
import { PoeticMeterSection } from './components/PoeticMeterSection';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import { SearchModal } from './components/SearchModal';
import { ContactModal } from './components/ContactModal';
import { Chatbot } from './components/Chatbot';
import { Article } from './types';

export default function App() {
  // حالة المقال المعروض للقراءة الكاملة
  const [activeReadingArticle, setActiveReadingArticle] = useState<Article | null>(null);
  
  // حالة نافذة البحث
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // حالة نافذة التواصل والمساهمات
  const [isContactOpen, setIsContactOpen] = useState(false);

  // حالة تصفية المقالات عند النقر على تصنيف معين
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);

  // التمرير إلى قسم المقالات مع تطبيق الفلتر
  const handleSelectCategory = (categoryTitle: string) => {
    setSelectedCategoryFilter(categoryTitle);
    const postsSection = document.getElementById('latest-posts');
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // التمرير إلى قسم ميزان القصيد
  const handleNavigateToMeter = () => {
    const meterSection = document.getElementById('meter-section');
    if (meterSection) {
      meterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // التمرير إلى أحدث المقالات من قسم الترحيب
  const handleExploreClick = () => {
    const postsSection = document.getElementById('latest-posts');
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2C2420] font-sans antialiased selection:bg-[#8C2D38] selection:text-amber-50">
      
      {/* 1. الترويسة وشريط التصفح (Header & Navbar) */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onSelectCategory={handleSelectCategory}
      />

      {/* المحتوى الرئيسي للمدونة (Main Content) */}
      <main id="main-content">
        
        {/* 2. قسم الترحيب والأبطال (Hero Section) */}
        <HeroSection
          onExploreClick={handleExploreClick}
          onMeterClick={handleNavigateToMeter}
        />

        {/* 3. شبكة التصنيفات الأربعة الرئيسية (Categories Grid) */}
        <CategoriesGrid
          onSelectCategory={handleSelectCategory}
          onNavigateToMeter={handleNavigateToMeter}
        />

        {/* 4. قسم أحدث المقالات والدراسات (Latest Posts) */}
        <LatestPosts
          onReadArticle={(article) => setActiveReadingArticle(article)}
          selectedCategoryFilter={selectedCategoryFilter}
          onClearCategoryFilter={() => setSelectedCategoryFilter(null)}
        />

        {/* 5. قسم ميزان القصيد التفاعلي (Interactive Poetic Meter Section) */}
        <PoeticMeterSection />

      </main>

      {/* 6. التذييل وقائمة الختام والنشرة البريدية (Footer) */}
      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        onSelectCategory={handleSelectCategory}
      />

      {/* نافذة قراءة المقال الكاملة (Article Reader Modal) */}
      <ArticleModal
        article={activeReadingArticle}
        onClose={() => setActiveReadingArticle(null)}
      />

      {/* نافذة البحث السريع في المدونة (Search Modal) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={(article) => setActiveReadingArticle(article)}
      />

      {/* نافذة التواصل وإرسال المساهمات (Contact Modal) */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* المساعد الذكي الأدبي لمدونة بوح (Literary Chatbot) */}
      <Chatbot onOpenContactModal={() => setIsContactOpen(true)} />

    </div>
  );
}
