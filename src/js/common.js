import { getAverageAnnualPremium, getAnnualPremium } from './price.js';

document.addEventListener('DOMContentLoaded', () => {
  // シミュレーション
  const ageElem = document.querySelector('[data-age]');
  const genderElem = document.querySelector('[data-gender]');
  const averageAnnualPremiumElem = document.querySelector('.js-average-annual-premium');
  const annualPremiumElem = document.querySelector('.js-annual-premium');
  const countUpElems = document.querySelectorAll('.js-count-number');
  // 年齢-性別
  const age = parseInt(ageElem.getAttribute('data-age'), 10);
  const gender = genderElem.getAttribute('data-gender');
  // 平均年間保険料
  const averageAnnualPremiumValue = getAverageAnnualPremium(age, gender);
  // 年間保険料
  const annualPremiumValue = getAnnualPremium(age, gender);
  // 節約額
  const savingAmount = averageAnnualPremiumValue - annualPremiumValue;
  // 月々の節約額
  const monthlySavingAmount = savingAmount / 12;

  averageAnnualPremiumElem.textContent = averageAnnualPremiumValue.toLocaleString();
  annualPremiumElem.textContent = annualPremiumValue.toLocaleString();
  // 各カウントアップ要素に対応する「data-count-to」を設定
  countUpElems.forEach((targetElem) => {
    if (targetElem.classList.contains('js-saving-amount')) {
      targetElem.setAttribute('data-count-to', savingAmount);
    } else if (targetElem.classList.contains('js-monthly-saving-amount')) {
      targetElem.setAttribute('data-count-to', monthlySavingAmount);
    }
  });

  // カウントアップ
  const from = 0;
  const startCountUp = (targetElem, to, duration) => {
    const startTime = performance.now();
    const countUp = () => {
      const elapsed = performance.now() - startTime;
      const countValue = from + (elapsed / duration) * (to - from);
      if (elapsed >= duration) {
        targetElem.innerText = to.toLocaleString();
      } else {
        targetElem.innerText = Math.floor(countValue).toLocaleString();
        requestAnimationFrame(countUp);
      }
    };
    requestAnimationFrame(countUp);
  };

  const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetElem = entry.target;
        const to = parseInt(targetElem.getAttribute('data-count-to'), 10);
        const duration = parseInt(targetElem.getAttribute('data-duration'), 10) || 1000;
        startCountUp(targetElem, to, duration);
        countUpObserver.unobserve(targetElem);
      }
    });
  });

  countUpElems.forEach((targetElem) => {
    countUpObserver.observe(targetElem);
  });
});
