import React, { useState } from 'react';
import { TOMISLAV_PHOTOS, TomiPhoto } from '../data/tomislavData';
import { Sparkles, X, Download, Share2, Filter, Check } from 'lucide-react';
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
  const [topText, setTopText] = useState<string>('КОГАТО РАЗБЕРЕШ, ЧЕ');
  const [bottomText, setBottomText] = useState<string>('BLACK RAM-ЪТ Е НА ПРОМОЦИЯ');
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);

  // Sync if external modal opened from Hero
  React.useEffect(() => {
    if (externalSelectedPhotoIdx !== null && externalSelectedPhotoIdx !== undefined) {
      setSelectedPhoto(TOMISLAV_PHOTOS[externalSelectedPhotoIdx]);
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
    // Provide default funny suggestions based on photo
    if (photo.id === 'black-ram-sommelier') {
      setTopText('ВИНЕТКА? НЕ СЪМ ЧУВАЛ');
      setBottomText('АЗ СЪМ С BLACK RAM В РЪКАТА');
    } else if (photo.id === 'passport-face') {
      setTopText('КОГАТО ТЕ ПИТАТ');
      setBottomText('КЪДЕ ОТИДОХА ПАРИТЕ ЗА СМЕТКИТЕ');
    } else if (photo.id === 'diplomat-gesture') {
      setTopText('МИРОТВОРЕЦЪТ ТОМИСЛАВ');
      setBottomText('ИЗПРАЩА ПОЗДРАВИ НА КОНКУРЕНЦИЯТА');
    } else if (photo.id === 'bolo-tie-model') {
      setTopText('КОГАТО ОТИДЕШ НА СВАТБА');
      setBottomText('И СИ ПО-ЕЛЕГАНТЕН ОТ МЛАДОЖЕНЕЦА');
    } else {
      setTopText('ЕДНО Е ДА ИСКАШ');
      setBottomText('ДРУГО Е ДА СИ ТОМИСЛАВ');
    }
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
    confetti({ particleCount: 20, spread: 45 });
    setTimeout(() => setCopiedStatus(false), 2000);
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
            ГАЛЕРИЯ & МЕМЕ СТУДИО
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2">
            Всички култови кадри на едно място. Кликни върху всяка снимка, за да влезеш в Меме Студиото и да създадеш собствен шедьовър!
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
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => handleOpenPhoto(photo)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-stone-950 border border-amber-500/20 hover:border-amber-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/15 flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-900">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-black/80 text-amber-300 border border-amber-500/40">
                    {photo.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <h3 className="font-black text-sm text-white group-hover:text-amber-300 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] text-stone-300 italic mt-0.5 line-clamp-1">
                    {photo.tagline}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-stone-900/90 text-left flex items-center justify-between border-t border-stone-800">
                <span className="text-[11px] text-amber-400 font-bold">
                  +{photo.auraBonus} Аура
                </span>
                <span className="text-[11px] text-stone-400 group-hover:text-amber-200 transition-colors flex items-center gap-1">
                  <span>Генерирай мем</span>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meme Studio Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl rounded-3xl bg-stone-900 border-2 border-amber-500/50 p-6 sm:p-8 text-white shadow-2xl overflow-y-auto max-h-[90vh]">
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
              <h3 className="text-2xl sm:text-3xl font-black text-stone-100">
                {selectedPhoto.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Meme Canvas Live Preview */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 bg-black aspect-[3/4] shadow-2xl flex items-center justify-center">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />

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
                    className="text-xl sm:text-2xl font-black uppercase text-white tracking-wider break-words"
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

              {/* Meme Controls */}
              <div className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                    Горен мем текст:
                  </label>
                  <input
                    type="text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value.toUpperCase())}
                    className="w-full p-3 rounded-xl bg-stone-950 border border-stone-700 text-amber-200 font-bold text-sm focus:border-amber-400 focus:outline-none"
                    placeholder="Въведи горен текст..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                    Долен мем текст:
                  </label>
                  <input
                    type="text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value.toUpperCase())}
                    className="w-full p-3 rounded-xl bg-stone-950 border border-stone-700 text-amber-200 font-bold text-sm focus:border-amber-400 focus:outline-none"
                    placeholder="Въведи долен текст..."
                  />
                </div>

                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700 text-xs text-stone-300">
                  <p className="font-semibold text-amber-300 mb-1">
                    📖 Официален архив на снимката:
                  </p>
                  <p>{selectedPhoto.description}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleCopyCaption}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                  >
                    {copiedStatus ? (
                      <>
                        <Check className="w-4 h-4 text-stone-950" />
                        <span>Копирано в клипборда!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-stone-950" />
                        <span>Копирай меме текста</span>
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
