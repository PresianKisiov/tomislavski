import React, { useState } from 'react';
import { TOMISLAV_PHOTOS, TomiPhoto, MemePreset } from '../data/tomislavData';
import { Sparkles, X, Share2, Check, RefreshCw, Zap, Glasses, Flame, Crown } from 'lucide-react';
import { playSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface MemeGalleryProps {
  externalSelectedPhotoIdx?: number | null;
  onCloseExternalModal?: () => void;
}

export const MemeGallery: React.FC<MemeGalleryProps> = ({
  externalSelectedPhotoIdx,
  onCloseExternalModal,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<TomiPhoto | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('всички');
  const [topText, setTopText] = useState<string>('');
  const [bottomText, setBottomText] = useState<string>('');
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);
  const [presetFilter, setPresetFilter] = useState<'all' | 'old' | 'new'>('all');

  // Interactive stickers overlay state
  const [activeStickers, setActiveStickers] = useState<{
    glasses: boolean;
    crown: boolean;
    lasers: boolean;
    fire: boolean;
  }>({
    glasses: false,
    crown: false,
    lasers: false,
    fire: false,
  });

  // Track active meme preset per photo on cards
  const [cardMemeIndex, setCardMemeIndex] = useState<{ [photoId: string]: number }>({});

  // Sync if external modal opened from Hero
  React.useEffect(() => {
    if (externalSelectedPhotoIdx !== null && externalSelectedPhotoIdx !== undefined) {
      handleOpenPhoto(TOMISLAV_PHOTOS[externalSelectedPhotoIdx]);
    }
  }, [externalSelectedPhotoIdx]);

  const categories = ['всички', 'лукс', 'дипломация', 'мода', 'паспорт', 'философия'];

  const filteredPhotos =
    activeCategory === 'всички'
      ? TOMISLAV_PHOTOS
      : TOMISLAV_PHOTOS.filter((p) => p.category === activeCategory);

  const handleOpenPhoto = (photo: TomiPhoto) => {
    playSound('pop');
    setSelectedPhoto(photo);
    const initialMeme = photo.memes[0];
    setTopText(initialMeme.top);
    setBottomText(initialMeme.bottom);
    setActiveStickers({ glasses: false, crown: false, lasers: false, fire: false });
  };

  const handleApplyPreset = (meme: MemePreset) => {
    playSound('pop');
    setTopText(meme.top);
    setBottomText(meme.bottom);
  };

  const handleRandomMeme = () => {
    if (!selectedPhoto) return;
    playSound('boing');
    const randomMeme = selectedPhoto.memes[Math.floor(Math.random() * selectedPhoto.memes.length)];
    setTopText(randomMeme.top);
    setBottomText(randomMeme.bottom);
    confetti({ particleCount: 20, spread: 50 });
  };

  const handleNextCardMeme = (e: React.MouseEvent, photo: TomiPhoto) => {
    e.stopPropagation();
    playSound('pop');
    setCardMemeIndex((prev) => {
      const current = prev[photo.id] || 0;
      return {
        ...prev,
        [photo.id]: (current + 1) % photo.memes.length,
      };
    });
  };

  const handleClose = () => {
    setSelectedPhoto(null);
    onCloseExternalModal?.();
  };

  const handleCopyCaption = () => {
    playSound('levelUp');
    const memeCaption = `${topText} — ${bottomText} (Култов мем с Томислав)`;
    navigator.clipboard?.writeText?.(memeCaption);
    setCopiedStatus(true);
    confetti({ particleCount: 30, spread: 60 });
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  const toggleSticker = (sticker: keyof typeof activeStickers) => {
    playSound(sticker === 'lasers' ? 'laser' : 'pop');
    setActiveStickers((prev) => ({ ...prev, [sticker]: !prev[sticker] }));
  };

  return (
    <section id="gallery" className="py-16 px-4 bg-stone-900 text-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Златният Фото Фонд на Томислав</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-stone-100">
            СТАРИ И НОВИ МЕМЕТА
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2">
            Всички класически стари мемета са върнати, плюс десетки чисто нови забавни текстове за всяка снимка! Кликни върху снимка за пълното Меме Студио със стикери.
          </p>

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playSound('pop');
                  setActiveCategory(cat);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/30 scale-105'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => {
            const currentMemeIdx = cardMemeIndex[photo.id] || 0;
            const currentMeme = photo.memes[currentMemeIdx] || photo.memes[0];

            return (
              <div
                key={photo.id}
                onClick={() => handleOpenPhoto(photo)}
                className="group cursor-pointer rounded-3xl overflow-hidden bg-stone-950 border border-amber-500/25 hover:border-amber-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/20 flex flex-col justify-between"
              >
                {/* Photo Image with Meme Overlays */}
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-900">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-85" />

                  {/* Top Badge (Old / New) */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase ${
                        currentMeme.isOld
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-red-600 text-white animate-pulse'
                      }`}
                    >
                      {currentMeme.isOld ? '📜 СТАРО МЕМЕ' : '⚡ НОВО МЕМЕ'}
                    </span>
                    <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-black/80 text-amber-300 border border-amber-500/30">
                      {photo.category}
                    </span>
                  </div>

                  {/* Meme Text Overlay directly on card */}
                  <div className="absolute inset-x-2 top-12 text-center pointer-events-none px-1">
                    <span
                      className="text-xs sm:text-sm font-black uppercase text-white tracking-wider block"
                      style={{
                        fontFamily: 'Impact, Bebas Neue, sans-serif',
                        textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
                      }}
                    >
                      {currentMeme.top}
                    </span>
                  </div>

                  <div className="absolute inset-x-2 bottom-12 text-center pointer-events-none px-1">
                    <span
                      className="text-xs sm:text-sm font-black uppercase text-yellow-300 tracking-wider block"
                      style={{
                        fontFamily: 'Impact, Bebas Neue, sans-serif',
                        textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
                      }}
                    >
                      {currentMeme.bottom}
                    </span>
                  </div>

                  {/* Bottom title info */}
                  <div className="absolute bottom-2 left-3 right-3 text-left">
                    <h3 className="font-black text-xs sm:text-sm text-white group-hover:text-amber-300 transition-colors truncate">
                      {photo.title}
                    </h3>
                  </div>
                </div>

                {/* Card Actions Bar */}
                <div className="p-3 bg-stone-900/90 text-left flex items-center justify-between border-t border-stone-800 gap-2">
                  <button
                    onClick={(e) => handleNextCardMeme(e, photo)}
                    aria-label="Смени мем на снимката"
                    className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold text-[11px] flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Следващ мем ({currentMemeIdx + 1}/{photo.memes.length})</span>
                  </button>

                  <span className="text-[11px] text-stone-400 group-hover:text-amber-200 transition-colors flex items-center gap-1 font-semibold">
                    <span>Студио</span>
                    <Sparkles className="w-3 h-3 text-amber-400" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Meme Studio Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl rounded-3xl bg-stone-900 border-2 border-amber-500/50 p-5 sm:p-8 text-white shadow-2xl overflow-y-auto max-h-[92vh]">
            <button
              onClick={handleClose}
              aria-label="Затвори меме студиото"
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest">
                Студио за Култови Мемета
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-100 mt-1">
                {selectedPhoto.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Meme Canvas Live Preview */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border-2 border-amber-500/50 bg-black aspect-[3/4] shadow-2xl flex items-center justify-center">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />

                {/* Stickers overlays */}
                {activeStickers.lasers && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-full h-1 bg-red-500 shadow-[0_0_20px_#ff0000] animate-ping" />
                  </div>
                )}

                {activeStickers.crown && (
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 text-5xl pointer-events-none animate-bounce">
                    👑
                  </div>
                )}

                {activeStickers.glasses && (
                  <div className="absolute top-[35%] left-1/2 -translate-x-1/2 text-4xl pointer-events-none drop-shadow-lg">
                    🕶️
                  </div>
                )}

                {activeStickers.fire && (
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-5xl pointer-events-none animate-pulse">
                    🔥
                  </div>
                )}

                {/* Meme Top Text */}
                <div className="absolute top-4 left-2 right-2 text-center pointer-events-none px-2">
                  <span
                    className="text-xl sm:text-2xl font-black uppercase text-white tracking-wider break-words"
                    style={{
                      fontFamily: 'Impact, Bebas Neue, sans-serif',
                      textShadow:
                        '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 3px 6px rgba(0,0,0,0.9)',
                    }}
                  >
                    {topText}
                  </span>
                </div>

                {/* Meme Bottom Text */}
                <div className="absolute bottom-4 left-2 right-2 text-center pointer-events-none px-2">
                  <span
                    className="text-xl sm:text-2xl font-black uppercase text-yellow-300 tracking-wider break-words"
                    style={{
                      fontFamily: 'Impact, Bebas Neue, sans-serif',
                      textShadow:
                        '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 3px 6px rgba(0,0,0,0.9)',
                    }}
                  >
                    {bottomText}
                  </span>
                </div>
              </div>

              {/* Meme Controls & Presets */}
              <div className="lg:col-span-6 space-y-4 text-left">
                {/* Randomizer & Stickers Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                  <button
                    onClick={handleRandomMeme}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-md hover:from-amber-400 hover:to-orange-400 active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>🎲 Случаен мем</span>
                  </button>

                  {/* Quick sticker buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleSticker('glasses')}
                      className={`p-1.5 rounded-lg text-xs font-bold border transition-colors ${
                        activeStickers.glasses
                          ? 'bg-amber-500 text-stone-950 border-amber-400'
                          : 'bg-stone-800 border-stone-700 text-stone-300'
                      }`}
                      title="Очила Thug Life"
                    >
                      🕶️
                    </button>
                    <button
                      onClick={() => toggleSticker('crown')}
                      className={`p-1.5 rounded-lg text-xs font-bold border transition-colors ${
                        activeStickers.crown
                          ? 'bg-amber-500 text-stone-950 border-amber-400'
                          : 'bg-stone-800 border-stone-700 text-stone-300'
                      }`}
                      title="Златна корона"
                    >
                      👑
                    </button>
                    <button
                      onClick={() => toggleSticker('lasers')}
                      className={`p-1.5 rounded-lg text-xs font-bold border transition-colors ${
                        activeStickers.lasers
                          ? 'bg-red-600 text-white border-red-500'
                          : 'bg-stone-800 border-stone-700 text-stone-300'
                      }`}
                      title="Лазерни очи"
                    >
                      ⚡
                    </button>
                    <button
                      onClick={() => toggleSticker('fire')}
                      className={`p-1.5 rounded-lg text-xs font-bold border transition-colors ${
                        activeStickers.fire
                          ? 'bg-orange-500 text-stone-950 border-orange-400'
                          : 'bg-stone-800 border-stone-700 text-stone-300'
                      }`}
                      title="Огън"
                    >
                      🔥
                    </button>
                  </div>
                </div>

                {/* Filter Old vs New Presets */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Избери готов шаблон за меме:
                    </label>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setPresetFilter('all')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          presetFilter === 'all'
                            ? 'bg-amber-500 text-stone-950'
                            : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        Всички
                      </button>
                      <button
                        onClick={() => setPresetFilter('old')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          presetFilter === 'old'
                            ? 'bg-amber-500 text-stone-950'
                            : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        Старите
                      </button>
                      <button
                        onClick={() => setPresetFilter('new')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          presetFilter === 'new'
                            ? 'bg-amber-500 text-stone-950'
                            : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        Новите
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {selectedPhoto.memes
                      .filter((m) => {
                        if (presetFilter === 'old') return m.isOld;
                        if (presetFilter === 'new') return !m.isOld;
                        return true;
                      })
                      .map((m) => {
                        const isCurrent = topText === m.top && bottomText === m.bottom;
                        return (
                          <button
                            key={m.id}
                            onClick={() => handleApplyPreset(m)}
                            className={`w-full text-left p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                              isCurrent
                                ? 'bg-amber-500/20 border-amber-400 text-amber-200 ring-1 ring-amber-400/50'
                                : 'bg-stone-950 border-stone-800 text-stone-300 hover:bg-stone-800'
                            }`}
                          >
                            <div className="truncate mr-2">
                              <span className="font-bold text-white block truncate">{m.top}</span>
                              <span className="text-amber-400 block truncate text-[11px]">{m.bottom}</span>
                            </div>
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase flex-shrink-0 ${
                                m.isOld
                                  ? 'bg-stone-800 text-amber-300'
                                  : 'bg-red-500/20 text-red-300 border border-red-500/40'
                              }`}
                            >
                              {m.isOld ? 'СТАРО' : 'НОВО'}
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </div>

                {/* Custom Edit Inputs */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                      Редактирай горен текст:
                    </label>
                    <input
                      type="text"
                      value={topText}
                      onChange={(e) => setTopText(e.target.value.toUpperCase())}
                      className="w-full p-2.5 rounded-xl bg-stone-950 border border-stone-700 text-amber-200 font-bold text-xs sm:text-sm focus:border-amber-400 focus:outline-none"
                      placeholder="Въведи горен текст..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                      Редактирай долен текст:
                    </label>
                    <input
                      type="text"
                      value={bottomText}
                      onChange={(e) => setBottomText(e.target.value.toUpperCase())}
                      className="w-full p-2.5 rounded-xl bg-stone-950 border border-stone-700 text-amber-200 font-bold text-xs sm:text-sm focus:border-amber-400 focus:outline-none"
                      placeholder="Въведи долен текст..."
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleCopyCaption}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all active:scale-95"
                  >
                    {copiedStatus ? (
                      <>
                        <Check className="w-4 h-4 text-stone-950" />
                        <span>Копирано в клипборда!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-stone-950" />
                        <span>Копирай мемето</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleClose}
                    className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs transition-colors"
                  >
                    Затвори
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
