import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const mm = gsap.matchMedia();

/* ── 챕터 라벨: 지금 보이는 섹션 이름으로 바꾸기 ── */
const label = document.getElementById('chapterLabel');
document.querySelectorAll('[data-label]').forEach((sec) => {
  ScrollTrigger.create({
    trigger: sec,
    start: 'top center',
    end: 'bottom center',
    onToggle: (self) => {
      if (!self.isActive) return;
      label.textContent = sec.dataset.label;
      label.classList.toggle('is-light', sec.dataset.theme === 'light');
    },
  });
});

/* ── 글 블록이 아래에서 떠오르기 ── */
if (!reduce) {
  gsap.utils.toArray('.rv').forEach((el) => {
    gsap.from(el, {
      y: 48, opacity: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });
}

/* 움직임 줄이기 설정이면 여기까지 (정지 화면) */
if (!reduce) {
  mm.add('(min-width: 769px)', () => {
    /* ═══ Ch.1 — 컷1 확대 → 컷1-5 → 컷2 → 컷3 → 송이 낙하 · 터짐 ═══ */
    const hero = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '#ch1', start: 'top top', end: '+=380%', scrub: 0.6, pin: true },
    });
    hero
      .to('.hero__copy', { y: -80, opacity: 0, duration: 1.2 }, 0)
      .to('.hero__l1', { scale: 3.2, duration: 3 }, 0)
      .to('.hero__l15', { opacity: 1, duration: 0.8 }, 2.4)
      .fromTo('.hero__l15', { scale: 1 }, { scale: 1.5, duration: 3 }, 2.4)
      .to('.hero__l2', { opacity: 1, duration: 1 }, 5)
      .fromTo('.hero__l2', { scale: 1.12 }, { scale: 1, duration: 2 }, 5)
      .to('.hero__l3', { opacity: 1, duration: 0.8 }, 7)
      .to('.hero__bunch', { opacity: 1, duration: 0.15 }, 8)
      .to('.hero__l3', { filter: 'brightness(.75) blur(4px)', duration: 0.5 }, 8)
      .to('.hero__bunch', { y: '78vh', rotate: 4, duration: 1.2, ease: 'power2.in' }, 8.2)
      .to('.hero__bunch', { opacity: 0, duration: 0.1 }, 9.35)
      .fromTo('.hero__burst', { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 3, duration: 0.7, ease: 'power2.out' }, 9.3);

    /* ═══ Ch.2 — 먹포도가 아래에서 올라오고 망점이 걷힘 ═══ */
    gsap.fromTo('.ink-art', { yPercent: 40, opacity: 0 }, {
      yPercent: 0, opacity: 1, ease: 'none',
      scrollTrigger: { trigger: '#ch2', start: 'top 80%', end: 'top top', scrub: true },
    });
    gsap.fromTo('.ink-art__tone', { opacity: 1 }, {
      opacity: 0, ease: 'none',
      scrollTrigger: { trigger: '#ch2', start: 'top top', end: '35% top', scrub: true },
    });

    /* ═══ Ch.3 — 먹안개 구멍 → 대청마루 → 가지 자르기 ═══ */
    gsap.fromTo('.mist', { '--hole': '0%' }, {
      '--hole': '150%', ease: 'none',
      scrollTrigger: { trigger: '#ch3', start: 'top top', end: '+=70%', scrub: true },
    });
    gsap.to('.c3-b', {
      opacity: 1, ease: 'none',
      scrollTrigger: { trigger: '#ch3', start: '58% center', end: '66% center', scrub: true },
    });

    /* ═══ Ch.4 — 떨어지는 송이가 화면을 덮었다가 책가도로 ═══ */
    gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '#ch4', start: 'top 60%', end: 'top -40%', scrub: true },
    })
      .fromTo('.bunch-zoom img', { yPercent: -120, scale: 0.4, opacity: 1 }, { yPercent: 0, scale: 9, duration: 1 })
      .to('.bunch-zoom img', { opacity: 0, duration: 0.25 }, 0.8);

    /* ═══ 책가도 한지색 칸으로 확대 → 북두칠성 ═══ */
    gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '#dipper', start: 'top top', end: '+=220%', scrub: 0.6, pin: true },
    })
      .fromTo('.dipper__shelf', { scale: 1, opacity: 1 }, { scale: 5, duration: 1 }, 0)
      .to('.dipper__shelf', { opacity: 0, duration: 0.45 }, 0.55)
      .fromTo('.dipper__line', { strokeDashoffset: 1200 }, { strokeDashoffset: 0, duration: 0.9 }, 1);
  });

  /* 휴대폰: 히어로만 간단히 확대 → 포도나무 */
  mm.add('(max-width: 768px)', () => {
    gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '#ch1', start: 'top top', end: '+=180%', scrub: 0.6, pin: true },
    })
      .to('.hero__copy', { opacity: 0, duration: 0.8 }, 0)
      .to('.hero__l1', { scale: 2.6, duration: 2 }, 0)
      .to('.hero__l15', { opacity: 1, duration: 0.6 }, 1.6)
      .to('.hero__l2', { opacity: 1, duration: 0.8 }, 2.8);
  });
}

/* 이미지가 늦게 로드되면 위치 다시 계산 */
window.addEventListener('load', () => ScrollTrigger.refresh());
