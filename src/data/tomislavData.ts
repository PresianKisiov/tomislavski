export interface MemePreset {
  id: string;
  isOld: boolean;
  top: string;
  bottom: string;
}

export interface TomiPhoto {
  id: string;
  url: string;
  title: string;
  tagline: string;
  category: 'дипломация' | 'лукс' | 'мода' | 'философия' | 'паспорт';
  auraBonus: number;
  description: string;
  achievementId: string;
  memes: MemePreset[];
}

export const TOMISLAV_PHOTOS: TomiPhoto[] = [
  {
    id: 'black-ram-sommelier',
    url: '/assets/aistudio/image_18cada56.png',
    title: 'Официален Посланик на Black Ram',
    tagline: '„Когато животът ти поднесе лед, сипи му Black Ram.“',
    category: 'лукс',
    auraBonus: 15000,
    description: 'Световният сомелиер Томислав представя лимитираната селекция до огнището. Една глътка за душата, една за джакузито на духа.',
    achievementId: 'ach_sommelier',
    memes: [
      { id: 'br_old_1', isOld: true, top: 'ВИНЕТКА? НЕ СЪМ ЧУВАЛ', bottom: 'АЗ СЪМ С BLACK RAM В РЪКАТА' },
      { id: 'br_old_2', isOld: true, top: 'КОГАТО РАЗБЕРЕШ, ЧЕ', bottom: 'BLACK RAM-ЪТ Е НА ПРОМОЦИЯ' },
      { id: 'br_new_1', isOld: false, top: 'ЕДНО УИСКИ НА ДЕН', bottom: 'ДЪРЖИ ЛЕКАРЯ И ДЪЛГОВЕТЕ ДАЛЕЧ' },
      { id: 'br_new_2', isOld: false, top: 'ЛЕГЕНДАТА РАЗКАЗВА, ЧЕ', bottom: 'ТАЗИ БУТИЛКА СЕ ПРЕДАВА В РОДА ПО НАСЛЕДСТВО' },
      { id: 'br_new_3', isOld: false, top: 'НА ТОВА МУ СЕ ВИКА', bottom: 'ФИНАНСОВА НЕЗАВИСИМОСТ КРАЙ КАМИНАТА' },
      { id: 'br_new_4', isOld: false, top: 'НЕ ПИЯ ЧЕСТО, АМА КОГАТО ПИЯ', bottom: 'ОГЪНЯТ ПЪРВИ МИ ВИКА „НАЗДРАВЕ!“' },
    ],
  },
  {
    id: 'diplomat-gesture',
    url: '/assets/aistudio/image_4a1870d5.png',
    title: 'Министър на Кварталната Дипломация',
    tagline: '„Краткият и изчерпателен отговор към всички критици.“',
    category: 'дипломация',
    auraBonus: 9999,
    description: 'Еднозначен международен поздрав с безупречна стойка пред пламтящата камина. Символ на непримиримост и вътрешен мир.',
    achievementId: 'ach_diplomat',
    memes: [
      { id: 'dip_old_1', isOld: true, top: 'МИРОТВОРЕЦЪТ ТОМИСЛАВ', bottom: 'ИЗПРАЩА ПОЗДРАВИ НА КОНКУРЕНЦИЯТА' },
      { id: 'dip_old_2', isOld: true, top: 'КРАТКИЯТ И ЯСЕН ОТГОВОР', bottom: 'КЪМ ВСИЧКИ ХЕЙТЪРИ' },
      { id: 'dip_new_1', isOld: false, top: 'КОГАТО ТЕ ПИТАТ:', bottom: '„НЯМА ЛИ ДА СИ ВЪРНЕШ 20-ТЕ ЛЕВА?“' },
      { id: 'dip_new_2', isOld: false, top: 'ОФИЦИАЛНО СТАНОВИЩЕ', bottom: 'ОТНОСНО СТАВАНЕТО РАНО В ПОНЕДЕЛНИК' },
      { id: 'dip_new_3', isOld: false, top: 'ТЕМПЕРАТУРАТА НАВЪН: -5°C', bottom: 'МОЯТ ВЪТРЕШЕН МИР: ТОЧНО ТУК' },
      { id: 'dip_new_4', isOld: false, top: 'ДИПЛОМАЦИЯТА Е В ПРЪСТА', bottom: 'И ТОЗИ ПРЪСТ НЕ Е ПОКАЗАЛЕЦЪТ' },
    ],
  },
  {
    id: 'bolo-tie-model',
    url: '/assets/aistudio/image_84a14667.png',
    title: 'Зетят Мечта: Тексаско-Селски Шик',
    tagline: '„Готов за банкет, кръщене и раздаване на автографи.“',
    category: 'мода',
    auraBonus: 12000,
    description: 'Бяла риза с надписи на английски, метална боло-вратовръзка с емблема и 100% честна българска усмивка.',
    achievementId: 'ach_gentleman',
    memes: [
      { id: 'bolo_old_1', isOld: true, top: 'КОГАТО ОТИДЕШ НА СВАТБА', bottom: 'И СИ ПО-ЕЛЕГАНТЕН ОТ МЛАДОЖЕНЕЦА' },
      { id: 'bolo_old_2', isOld: true, top: 'ЗЕТЯТ МЕЧТА', bottom: 'ГОТОВ ЗА ЗАПОЗНАНСТВО С РОДАТА' },
      { id: 'bolo_new_1', isOld: false, top: 'ЗАВЪРШИХ 12-ТИ КЛАС С 3.50', bottom: 'АМА ГЛЕДАЙ К’ВА ВРАТОВРЪЗКА ИМАМ!' },
      { id: 'bolo_new_2', isOld: false, top: '100% ЧИСТ ТЕКСАСКИ ШИК', bottom: 'ДИРЕКТНО ОТ СЪБОТНИЯ ПАЗАР' },
      { id: 'bolo_new_3', isOld: false, top: 'КОГАТО МАМА КАЖЕ:', bottom: '„ГОЛЯМО И КРАСИВО МОМЧЕ СИ МИ ТИ!“' },
      { id: 'bolo_new_4', isOld: false, top: 'ПЪРВИЯТ МЪЖ В РОДАТА', bottom: 'С МЕТАЛНА ПЛОЧКА ВМЕСТО ВРАТОВРЪЗКА' },
    ],
  },
  {
    id: 'passport-face',
    url: '/assets/aistudio/image_c689cce0.png',
    title: 'Шедьовърът „Прибрани Устни“',
    tagline: '„Когато баба ти каже, че не си надебелял достатъчно.“',
    category: 'паспорт',
    auraBonus: 18000,
    description: 'Уникална мимика от висш пилотаж. Устните се прибират в алтернативно измерение, очите пронизват събесреника.',
    achievementId: 'ach_passport',
    memes: [
      { id: 'pass_old_1', isOld: true, top: 'КОГАТО ТЕ ПИТАТ', bottom: 'КЪДЕ ОТИДОХА ПАРИТЕ ЗА СМЕТКИТЕ' },
      { id: 'pass_old_2', isOld: true, top: 'КОГАТО БАБА ТИ КАЖЕ', bottom: 'ЧЕ НЕ СИ НАДЕБЕЛЯЛ ДОСТАТЪЧНО' },
      { id: 'pass_new_1', isOld: false, top: 'КОГАТО СНИМКАТА ЗА ПАСПОРТ', bottom: 'СТАНЕ ПО-СТРАШНА ОТ СЪОБЩЕНИЕ ОТ НАП' },
      { id: 'pass_new_2', isOld: false, top: 'НЕ СЪМ СЪРДИТ', bottom: 'ПРОСТО ТАКА РЕСТАРТИРАМ МОЗЪКА СИ' },
      { id: 'pass_new_3', isOld: false, top: 'КОГАТО СРЕЩНЕШ БИВШАТА', bottom: 'И СЕ ПРАВИШ НА СЛУЧАЕН МИНУВАЧ' },
      { id: 'pass_new_4', isOld: false, top: 'ГЪЛТАМ СИ ДУМИТЕ', bottom: 'ЗА ДА НЕ ПРЕВЪРТЯ КВАРТАЛА' },
    ],
  },
  {
    id: 'super-laugh',
    url: '/assets/aistudio/image_a487c2fd.png',
    title: 'Върховна Еуфория край Огъня',
    tagline: '„Ха-ха-ха! Казаха ми, че утре е понеделник!“',
    category: 'лукс',
    auraBonus: 8888,
    description: 'Чист, неподправен смях, който може да угаси и разпали отново дървата в камината едновременно.',
    achievementId: 'ach_laugh',
    memes: [
      { id: 'laugh_old_1', isOld: true, top: 'ХА-ХА-ХА!', bottom: 'КАЗАХА МИ, ЧЕ УТРЕ Е ПОНЕДЕЛНИК' },
      { id: 'laugh_new_1', isOld: false, top: 'ТОЙ: „АЗ ПОВЕЧЕ ОТ ЕДНА НЕ ПИЯ!“', bottom: 'СЪЩИЯТ ЧОВЕК СЛЕД 10 МИНУТИ:' },
      { id: 'laugh_new_2', isOld: false, top: 'КОГАТО КАЖАТ, ЧЕ BLACK RAM Е СВЪРШИЛ', bottom: 'АМА ТИ СИ СКРИЛ ОЩЕ ДВЕ В КУХНЯТА' },
      { id: 'laugh_new_3', isOld: false, top: 'СМЕЯ СЕ, ЗА ДА НЕ ПЛАЧА', bottom: 'ОТ ЦЕНАТА НА ДЪРВАТА ЗА ОГРЕВ' },
      { id: 'laugh_new_4', isOld: false, top: 'ХАХАХА! КАЗАХА МИ', bottom: 'ЧЕ ИМАЛО ПО-КРАСИВ ОТ МЕН В КВАРТАЛА' },
    ],
  },
  {
    id: 'fire-hunter',
    url: '/assets/aistudio/image_b154c106.png',
    title: 'Хищникът край Огнището',
    tagline: '„Виждам пържолата. Дебна пържолата. Аз съм пържолата.“',
    category: 'философия',
    auraBonus: 7777,
    description: 'Поглед, концентриран на 110%. Готовност да скочи при първото изпукване на борова цепеница.',
    achievementId: 'ach_hunter',
    memes: [
      { id: 'hunt_old_1', isOld: true, top: 'ВИЖДАМ ПЪРЖОЛАТА', bottom: 'ДЕБНА ПЪРЖОЛАТА. АЗ СЪМ ПЪРЖОЛАТА.' },
      { id: 'hunt_new_1', isOld: false, top: 'КОГАТО ЧУЕШ, ЧЕ НЯКОЙ СИ СИПВА', bottom: 'БЕЗ ДА ТИ ВДИГНЕ НАЗДРАВИЦА' },
      { id: 'hunt_new_2', isOld: false, top: 'ТЕРМИНАТОР: СЪДНИЯТ ДЕН', bottom: 'НО ДЕЙСТВИЕТО СЕ РАЗВИВА В МЕХАНАТА' },
      { id: 'hunt_new_3', isOld: false, top: 'ПОГЛЕДЪТ НА ХИЩНИК', bottom: 'ПРЕДИ ДА НАПАДНЕ КЕБАПЧЕТАТА НА ЖАР' },
      { id: 'hunt_new_4', isOld: false, top: 'СЛЕДЯ ТЕ МНОГО ВНИМАТЕЛНО', bottom: 'ДА НЕ БИ ДА РАЗРЕЖЕШ САЛАТАТА ГРЕШНО' },
    ],
  },
  {
    id: 'model-neck-scratch',
    url: '/assets/aistudio/image_9747b61a.png',
    title: 'Топ Моделът: Поза „Схванат Врат“',
    tagline: '„Не позирам нарочно, просто огънят ме стопли твърде приятно.“',
    category: 'мода',
    auraBonus: 9500,
    description: 'Официална поза за каталога на Миланската Седмица на Модата (клон Горна Оряховица).',
    achievementId: 'ach_model',
    memes: [
      { id: 'mod_old_1', isOld: true, top: 'НЕ ПОЗИРАМ НАРОЧНО', bottom: 'ПРОСТО ОГЪНЯТ МЕ СТОПЛИ ТАКТИЧЕСКИ' },
      { id: 'mod_new_1', isOld: false, top: 'ОХ, СХВАНА МИ СЕ ВРАТЪТ...', bottom: 'ОТ ТЕЖЕСТТА НА СОБСТВЕНОТО МИ ЕГО' },
      { id: 'mod_new_2', isOld: false, top: 'ТОП МОДЕЛ НА ГОДИНАТА', bottom: 'КАТЕГОРИЯ: „СТОПЛЕН КРАЙ КАМИНАТА“' },
      { id: 'mod_new_3', isOld: false, top: 'КОГАТО ОСЪЗНАЕШ, ЧЕ СИ', bottom: 'НАЙ-СЕКСАПИЛНИЯТ ДЪРВАР НА БАЛКАНИТЕ' },
      { id: 'mod_new_4', isOld: false, top: 'ОТ ТАЗИ ПОЗА СЕ ВИЖДА', bottom: 'ЧИСТАТА МИ ХАРИЗМА В ПРОФИЛ' },
    ],
  },
  {
    id: 'deep-thinker',
    url: '/assets/aistudio/image_617f79bc.png',
    title: 'Мислителят на Квартала',
    tagline: '„Ако не отида на работа, дали работата ще дойде при мен?“',
    category: 'философия',
    auraBonus: 8200,
    description: 'Седнал на дървен стол, поглед забит в пода, пресмятащ сложни уравнения за смисъла на битието и цената на нафтата.',
    achievementId: 'ach_thinker',
    memes: [
      { id: 'think_old_1', isOld: true, top: 'АКО НЕ ОТИДА НА РАБОТА', bottom: 'ДАЛИ РАБОТАТА ЩЕ ДОЙДЕ ПРИ МЕН?' },
      { id: 'think_new_1', isOld: false, top: 'МИСЛИТЕЛЯТ ОТ ЛЮЛИН', bottom: 'РАЗСЪЖДАВА ВЪРХУ ТЕЖКИТЕ КВАРТАЛНИ ТЕМИ' },
      { id: 'think_new_2', isOld: false, top: 'ЗАЩО СВЕТЪТ Е ТОЛКОВА СЛОЖЕН', bottom: 'А БИРАТА СВЪРШВА ТОЛКОВА БЪРЗО?' },
      { id: 'think_new_3', isOld: false, top: 'СЕДЯ И СИ МИСЛЯ:', bottom: '„ДАЛИ ДА СИ СИПЯ BLACK RAM ИЛИ BLACK RAM?“' },
      { id: 'think_new_4', isOld: false, top: 'ВЪТРЕШНИЯТ МИ ГЛАС:', bottom: '„ТОМИ, ТИ СИ СЪЗДАДЕН ЗА ВЕЛИКИ ДЕЛА“' },
    ],
  },
];


export interface TomiAchievement {
  id: string;
  icon: string;
  title: string;
  shortDesc: string;
  funnyEffect: string;
  sound: 'fanfare' | 'airhorn' | 'boing' | 'pop' | 'respect' | 'diplomat' | 'quack' | 'levelUp';
  dialogContent: {
    heading: string;
    body: string;
    quote: string;
    photoIndex: number;
    statName: string;
    statValue: string;
  };
}

export const TOMISLAV_ACHIEVEMENTS: TomiAchievement[] = [
  {
    id: 'ach_sommelier',
    icon: '🥃',
    title: 'Официален Сомелиер на Black Ram',
    shortDesc: 'Разпознава букета от дъб и спирт от 15 метра разстояние.',
    funnyEffect: 'Налей виртуална чаша',
    sound: 'pop',
    dialogContent: {
      heading: 'Златен Медал за Дегустация',
      body: 'Томислав доказа, че бутилка Black Ram не е просто алкохол, а философско гориво. При всяко отваряне на бутилката ангелите на квартала запяват!',
      quote: '„Добрата напитка се познава по това, че огънят започва да гори по-силно.“',
      photoIndex: 0,
      statName: 'Ниво на Дегустация',
      statValue: '100% Сомелиер Елит',
    },
  },
  {
    id: 'ach_diplomat',
    icon: '🖕',
    title: 'Културен Посланик на Мира',
    shortDesc: 'Разрешава всякакъв международен конфликт само с един среден пръст.',
    funnyEffect: 'Изпрати поздрав на хейтърите',
    sound: 'diplomat',
    dialogContent: {
      heading: 'Висш Дипломатически Протокол',
      body: 'Когато аргументите свършат, Томислав вади тайния жест на древните спартанци. Точен, ясен, без излишни преговори.',
      quote: '„Кратко, ясно и от сърце към всички, които не вярваха в мен.“',
      photoIndex: 1,
      statName: 'Дипломатическа Сила',
      statValue: '+9999 Морална Победа',
    },
  },
  {
    id: 'ach_passport',
    icon: '🤐',
    title: 'Министър на Прибраните Устни',
    shortDesc: 'Скрива устните и зъбите си в друго квантово измерение.',
    funnyEffect: 'Активирай мимика',
    sound: 'quack',
    dialogContent: {
      heading: 'Официална Паспортна Мимика',
      body: 'Учените от БАН още се чудят как Томи успява да направи това изражение, без да наруши законите на физиката. Перфектно за паспорт, полиция и запознанство с тъщата.',
      quote: '„Не съм ял бонбоните от шкафа, кълна се!“',
      photoIndex: 3,
      statName: 'Гъвкавост на лицето',
      statValue: 'Невъзможна Анатомия',
    },
  },
  {
    id: 'ach_gentleman',
    icon: '👔',
    title: 'Кавалерът с Боло-Вратовръзката',
    shortDesc: 'Носи метална плочка на шнур със самочувствието на тексаски петролен магнат.',
    funnyEffect: 'Нагласи вратовръзката',
    sound: 'fanfare',
    dialogContent: {
      heading: 'Стил от Бъдещето',
      body: 'Обикновените мъже носят обикновени вратовръзки. Томислав носи шнур с плочка, защото само той знае кода за вечната елегантност.',
      quote: '„Класата не се купува, тя се връзва на врата с емблема.“',
      photoIndex: 2,
      statName: 'Официалност',
      statValue: '12 от 10 Възможни',
    },
  },
  {
    id: 'ach_firemaster',
    icon: '🔥',
    title: 'Повелителят на Огъня и Дървата',
    shortDesc: 'Пали камина само с един интензивен поглед.',
    funnyEffect: 'Разпали огъня',
    sound: 'airhorn',
    dialogContent: {
      heading: 'Огнено Майсторство',
      body: 'Томислав не използва подпалки. Той просто сяда срещу камината, поглежда цепениците със суров поглед и те сами се самозапалват от респект.',
      quote: '„Огънят не ме гори, той се съобразява с температурата ми.“',
      photoIndex: 5,
      statName: 'Топлинна Енергия',
      statValue: '5000 Мегавата Харизма',
    },
  },
  {
    id: 'ach_runaway_debt',
    icon: '💸',
    title: 'Връщач на Дългове чрез Философия',
    shortDesc: 'Взема 20 лева за цигари, връща безценни житейски съвети.',
    funnyEffect: 'Поискай си парите (Опитай се)',
    sound: 'boing',
    dialogContent: {
      heading: 'Трансмутация на Пари в Мъдрост',
      body: 'Защо ти са хартиени пари, когато Томислав ти дава вечни житейски уроци край камината? Това е инвестиция в бъдещето ти!',
      quote: '„Парите са преходни, приятелю. Но моят съвет ще го помниш до гроба.“',
      photoIndex: 7,
      statName: 'Възвръщаемост (ROI)',
      statValue: '+∞ Духовно Богатство',
    },
  },
  {
    id: 'ach_laugh',
    icon: '😂',
    title: 'Машина за Заразителен Смях',
    shortDesc: 'Смее се толкова силно, че съседите в съседния град започват да се кикотят.',
    funnyEffect: 'Пуснете смеха',
    sound: 'fanfare',
    dialogContent: {
      heading: 'Максимална Децибелна Радост',
      body: 'Усмивката му лекува лошо настроение, студено време и липса на ракия. Регистриран в ЮНЕСКО като нематериално културно наследство.',
      quote: '„Животът е кратък, смей се така, че да ти се виждат всички мъдреци!“',
      photoIndex: 4,
      statName: 'Звукова Мощност',
      statValue: '140 dB Чиста Еуфория',
    },
  },
  {
    id: 'ach_teleport',
    icon: '⏱️',
    title: 'Шампион по „Тръгвам след 2 минути“',
    shortDesc: 'Обещава че тръгва веднага. Появява се след 4 часа с нова бутилка.',
    funnyEffect: 'Провери GPS локация',
    sound: 'boing',
    dialogContent: {
      heading: 'Времеви Парадокс на Томислав',
      body: 'За Томислав 5 минути са разтегливо квантово понятие. Той не закъснява — той просто дава време на останалите да се подготвят психически за неговата поява.',
      quote: '„Обувам си чорапите и съм при вас!“ (казано преди 3 часа и половина)',
      photoIndex: 6,
      statName: 'Точност',
      statValue: 'Времето е илюзия',
    },
  },
];

export const TOMISLAV_QUOTES = [
  '„Не е важно колко си висок, важно е бутилката Black Ram да е пълна!“',
  '„Ако камината пуши, значи огънят уважава компанията.“',
  '„Всяка сериозна тема се решава или с боло-вратовръзка, или с бърз дипломатически пръст.“',
  '„Пари няма, но за сметка на това сме красиви и духовити.“',
  '„Истинският мъж не се оплаква от студа, той сяда на 10 сантиметра от жарта.“',
  '„Мога да прибера устните си толкова дълбоко, че да видя миналото си.“',
  '„По-добре Black Ram на вилата с верни авери, отколкото скука в скъп ресторант.“',
  '„Не ми казвай какво да правя, кажи ми кога да сипя още една чаша.“',
];
