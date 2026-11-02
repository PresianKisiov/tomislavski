import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AchievementGrid } from './components/AchievementGrid';
import { AuraCalculator } from './components/AuraCalculator';
import { MemeGallery } from './components/MemeGallery';
import { Soundboard } from './components/Soundboard';
import { FriendshipQuiz } from './components/FriendshipQuiz';
import { Footer } from './components/Footer';
import { getRespectTier } from './utils/tomislavRules';

export default function App() {
  const [respectCount, setRespectCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tomislav_respect');
      return saved ? parseInt(saved, 10) : 18;
    }
    return 18;
  });

  const [externalPhotoModalIdx, setExternalPhotoModalIdx] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('tomislav_respect', respectCount.toString());
  }, [respectCount]);

  const handleAddRespect = () => {
    setRespectCount((prev) => prev + 1);
  };

  const handleUnlockBonus = () => {
    setRespectCount((prev) => prev + 5);
  };

  const respectTier = getRespectTier(respectCount);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Sticky Parody VIP Navbar */}
      <Navbar
        respectCount={respectCount}
        onAddRespect={handleAddRespect}
        respectTitle={respectTier.title}
      />

      {/* Main Container */}
      <main className="flex-1">
        {/* Hero with Photo Showcase and Quick Quotes */}
        <Hero onSelectPhotoModal={(idx) => setExternalPhotoModalIdx(idx)} />

        {/* Comic Achievements & Runaway 20 BGN Button */}
        <AchievementGrid onUnlockBonus={handleUnlockBonus} />

        {/* Aura Calculator */}
        <AuraCalculator />

        {/* 8-Photo Gallery & Meme Studio */}
        <MemeGallery
          externalSelectedPhotoIdx={externalPhotoModalIdx}
          onCloseExternalModal={() => setExternalPhotoModalIdx(null)}
        />

        {/* Soundboard */}
        <Soundboard />

        {/* Friendship Test & Printable Diploma */}
        <FriendshipQuiz />
      </main>

      {/* Parody Footer */}
      <Footer />
    </div>
  );
}
