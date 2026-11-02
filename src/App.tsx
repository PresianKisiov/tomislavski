import React, { useState, useEffect } from 'react';
import { BreakingNewsTicker } from './components/BreakingNewsTicker';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AchievementGrid } from './components/AchievementGrid';
import { CatchTheBottleGame } from './components/CatchTheBottleGame';
import { WheelOfFortune } from './components/WheelOfFortune';
import { AuraCalculator } from './components/AuraCalculator';
import { MemeGallery } from './components/MemeGallery';
import { Soundboard } from './components/Soundboard';
import { EmergencyExcuseModal } from './components/EmergencyExcuseModal';
import { FriendshipQuiz } from './components/FriendshipQuiz';
import { Footer } from './components/Footer';
import { PartyOverlay } from './components/PartyOverlay';
import { getRespectTier } from './utils/tomislavRules';
import { togglePartyMusic } from './utils/soundEffects';

export default function App() {
  const [respectCount, setRespectCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tomislav_respect');
      return saved ? parseInt(saved, 10) : 24;
    }
    return 24;
  });

  const [externalPhotoModalIdx, setExternalPhotoModalIdx] = useState<number | null>(null);
  const [isPartyActive, setIsPartyActive] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('tomislav_respect', respectCount.toString());
  }, [respectCount]);

  const handleAddRespect = () => {
    setRespectCount((prev) => prev + 1);
  };

  const handleUnlockBonus = () => {
    setRespectCount((prev) => prev + 5);
  };

  const handleToggleParty = () => {
    setIsPartyActive((prev) => {
      const next = !prev;
      togglePartyMusic(next);
      return next;
    });
  };

  const respectTier = getRespectTier(respectCount);

  return (
    <div
      className={`min-h-screen text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950 transition-colors duration-500 ${
        isPartyActive ? 'bg-stone-950' : 'bg-stone-950'
      }`}
    >
      {/* 24/7 Sensational Parody TV Breaking News Ticker */}
      <BreakingNewsTicker />

      {/* Sticky Parody VIP Navbar */}
      <Navbar
        respectCount={respectCount}
        onAddRespect={handleAddRespect}
        respectTitle={respectTier.title}
      />

      {/* Main Container */}
      <main className="flex-1">
        {/* Hero with Photo Showcase, Avatars, and Quotes */}
        <Hero onSelectPhotoModal={(idx) => setExternalPhotoModalIdx(idx)} />

        {/* Comic Achievements & Runaway 20 BGN Button */}
        <AchievementGrid onUnlockBonus={handleUnlockBonus} />

        {/* Action Arcade Mini Game: Catch the Black Ram! */}
        <CatchTheBottleGame />

        {/* Wheel of Fortune / Casino kraj kaminata */}
        <WheelOfFortune />

        {/* Aura Calculator */}
        <AuraCalculator />

        {/* 8-Photo Gallery & Meme Studio with Top/Bottom Captions */}
        <MemeGallery
          externalSelectedPhotoIdx={externalPhotoModalIdx}
          onCloseExternalModal={() => setExternalPhotoModalIdx(null)}
        />

        {/* Soundboard */}
        <Soundboard />

        {/* Emergency Excuse Generator for WhatsApp/Viber */}
        <EmergencyExcuseModal />

        {/* Friendship Test & Printable Official Diploma */}
        <FriendshipQuiz />
      </main>

      {/* Floating Turbo Party Mode Controller */}
      <PartyOverlay
        isPartyActive={isPartyActive}
        onToggleParty={handleToggleParty}
      />

      {/* Parody Footer */}
      <Footer />
    </div>
  );
}
