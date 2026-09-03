const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const BACKEND_PASS_DIR = path.join(__dirname, '..', 'score-leaderboard-Admin-app', 'Backend', 'app', 'assets', 'gdg.pass');
const FRONTEND_PASS_DIR = path.join(__dirname, 'passmodels', 'gdg.pass');

fs.mkdirSync(BACKEND_PASS_DIR, { recursive: true });
fs.mkdirSync(FRONTEND_PASS_DIR, { recursive: true });

function getMedalSvg(themeId) {
  const isGold = themeId === 'gdg-gold-admin';
  const isRed = themeId === 'gdg-red';

  const ribbonBorder = isGold ? '#D97706' : isRed ? '#E11D48' : '#2563EB';
  const gemTop = isGold ? '#FEF08A' : isRed ? '#FDA4AF' : '#93C5FD';
  const gemLeft = isGold ? '#FBBF24' : isRed ? '#F43F5E' : '#3B82F6';
  const gemRight = isGold ? '#D97706' : isRed ? '#BE123C' : '#1D4ED8';

  return `
    <g transform="translate(970, 45)">
      <!-- Ribbon Tails -->
      <g>
        <path d="M40 80 L40 180 L55 160 L70 180 L70 80 Z" fill="#ffffff" stroke="${ribbonBorder}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M65 80 L65 180 L80 160 L95 180 L95 80 Z" fill="#ffffff" stroke="${ribbonBorder}" stroke-width="7" stroke-linejoin="round"/>
      </g>
      <!-- 12-point Scalloped Gold Medal Rosette -->
      <g transform="translate(68, 75)">
        <circle cx="0" cy="0" r="60" fill="#F59E0B" stroke="#FDE68A" stroke-width="5"/>
        <circle cx="0" cy="0" r="52" fill="#D97706"/>
        <circle cx="0" cy="0" r="45" fill="#FBBF24" stroke="#FDE68A" stroke-width="3"/>
        <circle cx="0" cy="0" r="37" fill="#D97706"/>
        <circle cx="0" cy="0" r="30" fill="#B45309" opacity="0.35"/>

        <!-- 3D Isometric Faceted Hexagonal Gemstone -->
        <g transform="scale(2.6)">
          <polygon points="0,-9 7,-4.5 0,0 -7,-4.5" fill="${gemTop}"/>
          <polygon points="-7,-4.5 0,0 0,9 -7,4.5" fill="${gemLeft}"/>
          <polygon points="0,0 7,-4.5 7,4.5 0,9" fill="${gemRight}"/>
          <line x1="0" y1="0" x2="0" y2="9" stroke="#ffffff" stroke-width="0.8" opacity="0.65"/>
          <polyline points="-7,-4.5 0,0 7,-4.5" stroke="#ffffff" stroke-width="0.8" opacity="0.85" fill="none"/>
        </g>
      </g>
    </g>
  `;
}

function getStripSvg(themeId) {
  const isGold = themeId === 'gdg-gold-admin';
  const isRed = themeId === 'gdg-red';

  const baseBg = isGold ? '#fac93e' : isRed ? '#e8788e' : '#4187f6';
  const gradStop1 = isGold ? '#f59e0b' : isRed ? '#f43f5e' : '#3b82f6';
  const gradStop2 = isGold ? '#fbbf24' : isRed ? '#fb7185' : '#60a5fa';
  const gradStop3 = isGold ? '#d97706' : isRed ? '#e11d48' : '#2563eb';
  const gradStop4 = isGold ? '#b45309' : isRed ? '#be123c' : '#1d4ed8';

  return `
    <svg width="1125" height="369" viewBox="0 0 1125 369" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${gradStop1}" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="${gradStop2}" stop-opacity="0.95"/>
        </linearGradient>
        <linearGradient id="wave2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${gradStop3}" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="${gradStop4}" stop-opacity="0.95"/>
        </linearGradient>
      </defs>

      <!-- Background Soft Fill -->
      <rect width="1125" height="369" fill="${baseBg}"/>

      <!-- Flowing Wave 1 -->
      <path d="M-50 120 Q 300 360, 650 120 T 1200 240 L 1200 369 L -50 369 Z" fill="url(#wave1)" opacity="0.85"/>

      <!-- Flowing Wave 2 (Main Curve) -->
      <path d="M-50 40 Q 350 -60, 580 180 T 1200 60 L 1200 320 Q 800 380, 450 160 T -50 320 Z" fill="url(#wave2)" opacity="0.9"/>

      <!-- White flowing highlight wave -->
      <path d="M-30 40 Q 320 250, 780 40 T 1180 130" stroke="#ffffff" stroke-width="10" stroke-opacity="0.45" stroke-linecap="round" fill="none"/>

      <!-- Medal Badge at Right (Figma Replica) -->
      ${getMedalSvg(themeId)}
    </svg>
  `;
}

function getLogoSvg() {
  return `
    <svg width="480" height="150" viewBox="0 0 480 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Brackets Logo -->
      <g transform="translate(10, 25)">
        <path d="M30 15 L10 45 L30 75" stroke="#EA4335" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M50 15 L70 45 L50 75" stroke="#4285F4" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M90 15 L110 45 L90 75" stroke="#34A853" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M70 15 L90 45 L70 75" stroke="#FBBC04" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <!-- Text -->
      <text x="140" y="60" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" fill="#1e293b">Google Developer Groups</text>
      <text x="140" y="95" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" fill="#2563eb">Qassim</text>
    </svg>
  `;
}

function getIconSvg() {
  return `
    <svg width="87" height="87" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="87" height="87" rx="20" fill="#ffffff"/>
      <g transform="translate(10, 15) scale(0.65)">
        <path d="M25 15 L10 40 L25 65" stroke="#EA4335" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M45 15 L60 40 L45 65" stroke="#4285F4" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M75 15 L90 40 L75 65" stroke="#34A853" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M60 15 L75 40 L60 65" stroke="#FBBC04" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>
  `;
}

async function generateAll() {
  console.log('Generating official Apple Wallet assets...');

  // 1. Logo
  const logoSvg = Buffer.from(getLogoSvg());
  await sharp(logoSvg).resize(480, 150).png().toFile(path.join(BACKEND_PASS_DIR, 'logo@3x.png'));
  await sharp(logoSvg).resize(320, 100).png().toFile(path.join(BACKEND_PASS_DIR, 'logo@2x.png'));
  await sharp(logoSvg).resize(160, 50).png().toFile(path.join(BACKEND_PASS_DIR, 'logo.png'));

  // 2. Icon
  const iconSvg = Buffer.from(getIconSvg());
  await sharp(iconSvg).resize(87, 87).png().toFile(path.join(BACKEND_PASS_DIR, 'icon@3x.png'));
  await sharp(iconSvg).resize(58, 58).png().toFile(path.join(BACKEND_PASS_DIR, 'icon@2x.png'));
  await sharp(iconSvg).resize(29, 29).png().toFile(path.join(BACKEND_PASS_DIR, 'icon.png'));

  // 3. Theme Strips
  const themes = ['gdg-blue', 'gdg-red', 'gdg-gold-admin'];
  for (const t of themes) {
    const stripSvg = Buffer.from(getStripSvg(t));
    await sharp(stripSvg).resize(1125, 369).png().toFile(path.join(BACKEND_PASS_DIR, `strip-${t}@3x.png`));
    await sharp(stripSvg).resize(750, 246).png().toFile(path.join(BACKEND_PASS_DIR, `strip-${t}@2x.png`));
    await sharp(stripSvg).resize(375, 123).png().toFile(path.join(BACKEND_PASS_DIR, `strip-${t}.png`));
  }

  // Default strip
  await sharp(Buffer.from(getStripSvg('gdg-blue'))).resize(1125, 369).png().toFile(path.join(BACKEND_PASS_DIR, 'strip@3x.png'));
  await sharp(Buffer.from(getStripSvg('gdg-blue'))).resize(750, 246).png().toFile(path.join(BACKEND_PASS_DIR, 'strip@2x.png'));
  await sharp(Buffer.from(getStripSvg('gdg-blue'))).resize(375, 123).png().toFile(path.join(BACKEND_PASS_DIR, 'strip.png'));

  // Copy to Frontend
  for (const f of fs.readdirSync(BACKEND_PASS_DIR)) {
    if (f.endsWith('.png')) {
      fs.copyFileSync(path.join(BACKEND_PASS_DIR, f), path.join(FRONTEND_PASS_DIR, f));
    }
  }

  console.log('✅ Successfully generated all Apple Wallet strip, logo, and icon assets!');
}

generateAll().catch(console.error);
