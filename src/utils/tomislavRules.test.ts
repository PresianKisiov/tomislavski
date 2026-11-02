import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTomislavAura,
  getRespectTier,
  evaluateTomislavQuiz,
  evaluateMiniGameScore,
  generateEmergencyExcuse,
} from './tomislavRules';

test('calculateTomislavAura awards maximum aura for Black Ram and fireplace proximity', () => {
  const result = calculateTomislavAura({
    outfitScore: 10,
    drinkPreference: 'black_ram',
    fireplaceProximity: 10,
    attitude: 'passport_face',
  });

  assert.ok(result.score > 35000);
  assert.equal(result.tier, 'БОЖЕСТВЕН ТОМИСЛАВ');
  assert.ok(result.badge.includes('Върховен Патриарх'));
});

test('calculateTomislavAura penalizes water drinkers in the parody ranking', () => {
  const waterResult = calculateTomislavAura({
    outfitScore: 1,
    drinkPreference: 'water',
    fireplaceProximity: 1,
    attitude: 'philosopher',
  });

  const ramResult = calculateTomislavAura({
    outfitScore: 1,
    drinkPreference: 'black_ram',
    fireplaceProximity: 1,
    attitude: 'philosopher',
  });

  assert.ok(ramResult.score > waterResult.score);
});

test('getRespectTier progresses through ranks based on click counts', () => {
  assert.equal(getRespectTier(5).title, 'НОВОБРАНЕЦ');
  assert.equal(getRespectTier(15).title, 'КВАРТАЛЕН ФЕН');
  assert.equal(getRespectTier(30).title, 'ВИП ГОСТ НА ВИЛАТА');
  assert.equal(getRespectTier(55).title, 'ГЛАВЕН ДИПЛОМАТ');
  assert.equal(getRespectTier(120).title, 'ВЕЧЕН БРАТ НА ТОМИСЛАВ');
});

test('evaluateTomislavQuiz returns perfect score for correct answers', () => {
  const perfect = evaluateTomislavQuiz([0, 1, 0]);
  assert.equal(perfect.percentage, 100);
  assert.equal(perfect.title, 'КРЪВЕН БРАТ НА ТОМИСЛАВ');

  const partial = evaluateTomislavQuiz([0, 0, 0]);
  assert.equal(partial.percentage, 67);
  assert.equal(partial.title, 'ДОБЪР ДРУГАР');

  const failed = evaluateTomislavQuiz([1, 0, 1]);
  assert.equal(failed.percentage, 0);
  assert.equal(failed.title, 'СЛУЧАЕН МИНУВАЧ');
});

test('evaluateMiniGameScore assigns appropriate ranks based on score', () => {
  const god = evaluateMiniGameScore(600, 6);
  assert.equal(god.rank, 'БОГ НА BLACK RAM');

  const bartender = evaluateMiniGameScore(300, 3);
  assert.equal(bartender.rank, 'ОФИЦИАЛЕН БАРМАН НА ВИЛАТА');

  const low = evaluateMiniGameScore(40, 0);
  assert.equal(low.rank, 'ТРЕЗВЕНИК В ШОК');
});

test('generateEmergencyExcuse returns witty Bulgarian phrases for all cases', () => {
  const late = generateEmergencyExcuse('late');
  assert.ok(late.includes('Томислав'));
  assert.ok(late.includes('Black Ram'));

  const money = generateEmergencyExcuse('no_money');
  assert.ok(money.includes('парите'));
});

