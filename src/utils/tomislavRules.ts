/**
 * Pure logic and calculations for Tomislav parody features:
 * - Aura calculator
 * - Respect tier rankings
 * - Quiz evaluation and certificate grading
 * - Sound synthesizer frequencies
 */

export interface AuraInput {
  outfitScore: number;
  drinkPreference: 'black_ram' | 'water' | 'energy_drink' | 'rakia';
  fireplaceProximity: number; // 0 to 10
  attitude: 'diplomat' | 'model' | 'philosopher' | 'passport_face';
}

export interface AuraResult {
  score: number;
  tier: string;
  verdict: string;
  badge: string;
}

export function calculateTomislavAura(input: AuraInput): AuraResult {
  let score = 5000;

  // Outfit score
  score += input.outfitScore * 420;

  // Drink choice
  switch (input.drinkPreference) {
    case 'black_ram':
      score += 15000;
      break;
    case 'rakia':
      score += 10000;
      break;
    case 'energy_drink':
      score += 3000;
      break;
    case 'water':
      score -= 2000; // Water doesn't warm the soul like Black Ram!
      break;
  }

  // Fireplace warmth
  score += input.fireplaceProximity * 1337;

  // Attitude multiplier
  switch (input.attitude) {
    case 'diplomat':
      score += 8888;
      break;
    case 'passport_face':
      score += 12000;
      break;
    case 'model':
      score += 9999;
      break;
    case 'philosopher':
      score += 7777;
      break;
  }

  if (score >= 35000) {
    return {
      score,
      tier: 'БОЖЕСТВЕН ТОМИСЛАВ',
      verdict: 'Ти си самото въплъщение на Томи. Огънят в камината се кланя пред твоята харизма!',
      badge: '👑 Върховен Патриарх на Камината',
    };
  } else if (score >= 20000) {
    return {
      score,
      tier: 'ПРАВОСЛАВЕН СОМЕЛИЕР',
      verdict: 'Много солиден чар. Black Ram бутилката ти лепне в ръката естествено.',
      badge: '🥃 Почетен Дегустатор',
    };
  } else if (score >= 10000) {
    return {
      score,
      tier: 'КВАРТАЛЕН ТАРИКАТ',
      verdict: 'Имаш потенциал, но ти липсва още малко излъчване на дипломат.',
      badge: '⚡ Младши Размишляващ',
    };
  } else {
    return {
      score: Math.max(score, 100),
      tier: 'ТРЯБВА ТИ ОЩЕ УЧЕНЕ',
      verdict: 'Отиди веднага при Томислав за 3-дневен курс по житейска мъдрост.',
      badge: '🪵 Носач на цепеници за огъня',
    };
  }
}

export function getRespectTier(clicks: number): { title: string; perk: string; level: number } {
  if (clicks >= 100) {
    return {
      title: 'ВЕЧЕН БРАТ НА ТОМИСЛАВ',
      perk: 'Неограничен достъп до камината и лична наздравица с Black Ram',
      level: 4,
    };
  } else if (clicks >= 50) {
    return {
      title: 'ГЛАВЕН ДИПЛОМАТ',
      perk: 'Право на един жест със среден пръст по протокол',
      level: 3,
    };
  } else if (clicks >= 25) {
    return {
      title: 'ВИП ГОСТ НА ВИЛАТА',
      perk: 'Място на първия ред до огъня и безплатен бадж',
      level: 2,
    };
  } else if (clicks >= 10) {
    return {
      title: 'КВАРТАЛЕН ФЕН',
      perk: 'Получаваш кимане с глава и лека усмивка',
      level: 1,
    };
  }
  return {
    title: 'НОВОБРАНЕЦ',
    perk: 'Цъкай още бутона за да заслужиш уважението',
    level: 0,
  };
}

export function evaluateTomislavQuiz(answers: number[]): { title: string; percentage: number; comment: string } {
  // Correct answers: [0, 1, 0]
  // 1: "Налива още една чаша и вдига наздравица" (idx 0)
  // 2: "Бяла риза с тексаска боло-вратовръзка" (idx 1)
  // 3: "С дипломатичен жест и широка усмивка" (idx 0)
  let correct = 0;
  if (answers[0] === 0) correct++;
  if (answers[1] === 1) correct++;
  if (answers[2] === 0) correct++;

  const percentage = Math.round((correct / 3) * 100);

  if (percentage === 100) {
    return {
      title: 'КРЪВЕН БРАТ НА ТОМИСЛАВ',
      percentage,
      comment: 'Познаваш го по-добре от родната му майка! Сертификатът ти е със златен печат.',
    };
  } else if (percentage >= 60) {
    return {
      title: 'ДОБЪР ДРУГАР',
      percentage,
      comment: 'Разбираш естетиката на Томислав, но внимавай да не разлееш уискито.',
    };
  } else {
    return {
      title: 'СЛУЧАЕН МИНУВАЧ',
      percentage,
      comment: 'Томислав те гледа строго със свити устни. Пробвай пак теста!',
    };
  }
}
