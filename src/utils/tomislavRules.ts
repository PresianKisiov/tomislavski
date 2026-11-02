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

export interface MiniGameScoreResult {
  score: number;
  rank: string;
  bottlesCollected: number;
  achievedTitle: string;
}

export function evaluateMiniGameScore(score: number, bottles: number): MiniGameScoreResult {
  if (score >= 500) {
    return {
      score,
      bottlesCollected: bottles,
      rank: 'БОГ НА BLACK RAM',
      achievedTitle: 'Томислав лично ти отстъпва мястото си пред камината!',
    };
  } else if (score >= 250) {
    return {
      score,
      bottlesCollected: bottles,
      rank: 'ОФИЦИАЛЕН БАРМАН НА ВИЛАТА',
      achievedTitle: 'Сръчност от класа! Нито една капка не отиде на пода.',
    };
  } else if (score >= 100) {
    return {
      score,
      bottlesCollected: bottles,
      rank: 'КВАРТАЛЕН ЛОПАЙНИК',
      achievedTitle: 'Добре хващаш бутилките, но ти трябват още тренировки.',
    };
  } else {
    return {
      score: Math.max(score, 0),
      bottlesCollected: bottles,
      rank: 'ТРЕЗВЕНИК В ШОК',
      achievedTitle: 'Изпусна твърде много Black Ram! Томи те гледа с укор.',
    };
  }
}

export function generateEmergencyExcuse(situation: 'late' | 'no_money' | 'missed_call' | 'party_excuse'): string {
  switch (situation) {
    case 'late':
      return '„Брат, тръгнах преди 4 часа, ама по пътя срещнах Томислав. Спря ме до камината да ми обясни тайната на Вселената и ми наля Black Ram. Нямаше как да откажа от уважение!“';
    case 'no_money':
      return '„Точно щях да ти преведа парите, но Томислав ме убеди, че парите са илюзия на материалния свят, а истинското богатство са спомените край огнището.“';
    case 'missed_call':
      return '„Не чух телефона, защото Томислав се смееше толкова гръмогласно до мен, че заглуши всички мобилни оператори на Балканите.“';
    case 'party_excuse':
      return '„Не мога да дойда на вашата скучна среща, защото съм официален гост на банкета на Томислав. Дрес кодът е бяла риза с боло-вратовръзка.“';
  }
}

