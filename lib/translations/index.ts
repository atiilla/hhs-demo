import { Language } from '../store/languageStore';

// Define the structure of our translations
export interface Translations {
  common: {
    appName: string;
    loading: string;
  };
  home: {
    title: string;
    subtitle: string;
    mobileVersion: string;
    desktopVersion: string;
  };
  settings: {
    title: string;
    language: string;
    theme: string;
    dark: string;
    light: string;
    system: string;
    cyberwave: string;
    cyberpunk: string;
    appearance: string;
    appearanceDescription: string;
    languageDescription: string;
  };
  events: {
    title: string;
    viewDetails: string;
  };
  blog: {
    title: string;
    readMore: string;
  };
  navigation: {
    home: string;
    events: string;
    competitions: string;
    codeJam: string;
    hackathon: string;
    live: string;
    hhs: string;
    philosophy: string;
    manifesto: string;
    team: string;
    history: string;
    contact: string;
    branding: string;
    stickers: string;
    blog: string;
    brandKit: string;
    settings: string;
  };
  carousel: {
    slogan: string;
    buttonText: string;
  };
}

// English translations
const en: Translations = {
  common: {
    appName: 'Happy Hacking Space',
    loading: 'Loading...',
  },
  home: {
    title: 'Happy Hacking Space',
    subtitle: 'A modern web application',
    mobileVersion: 'Mobile Version',
    desktopVersion: 'Desktop Version',
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    theme: 'Theme',
    dark: 'Dark',
    light: 'Light',
    system: 'System',
    cyberwave: 'Cyberwave',
    cyberpunk: 'Cyberpunk',
    appearance: 'Appearance',
    appearanceDescription: 'Customize how the application looks',
    languageDescription: 'Choose your preferred language',
  },
  events: {
    title: 'Events',
    viewDetails: 'View Details',
  },
  blog: {
    title: 'Blog',
    readMore: 'Read More',
  },
  navigation: {
    home: 'Home',
    events: 'Events',
    competitions: 'Competitions',
    codeJam: 'CodeJam',
    hackathon: 'Hackathon',
    live: 'Live',
    hhs: 'HHS',
    philosophy: 'Philosophy',
    manifesto: 'Manifesto',
    team: 'Team',
    history: 'History',
    contact: 'Contact',
    branding: 'Branding',
    stickers: 'Stickers',
    blog: 'Blog',
    brandKit: 'Brand Kit',
    settings: 'Settings',
  },
  carousel: {
    slogan: 'Innovate. Create. Transform.',
    buttonText: 'Learn More',
  },
};

// Spanish translations
const tr: Translations = {
  common: {
    appName: 'Happy Hacking Space',
    loading: 'Yükleniyor...',
  },
  home: {
    title: 'Happy Hacking Space',
    subtitle: 'Bir modern web uygulaması',
    mobileVersion: 'Mobile Versiyon',
    desktopVersion: 'Desktop Versiyon',
  },
  settings: {
    title: 'Ayarlar',
    language: 'Dil',
    theme: 'Tema',
    dark: 'Koyu',
    light: 'Açık',
    system: 'Sistem',
    cyberwave: 'Cyberwave',
    cyberpunk: 'Cyberpunk',
    appearance: 'Görünüm',
    appearanceDescription: 'Uygulamanın görünümünü özelleştirin',
    languageDescription: 'Tercih ettiğiniz dili seçin',
  },
  events: {
    title: 'Etkinlikler',
    viewDetails: 'Detayları Gör',
  },
  blog: {
    title: 'Blog',
    readMore: 'Devamını Oku',
  },
  navigation: {
    home: 'Anasayfa',
    events: 'Etkinlikler',
    competitions: 'Yarışmalar',
    codeJam: 'CodeJam',
    hackathon: 'Hackathon',
    live: 'Canlı',
    hhs: 'HHS',
    philosophy: 'Felsefe',
    manifesto: 'Manifesto',
    team: 'Takım',
    history: 'Tarihçe',
    contact: 'İletişim',
    branding: 'Marka',
    stickers: 'Çıkartmalar',
    blog: 'Blog',
    brandKit: 'Marka Kiti',
    settings: 'Ayarlar',
  },
  carousel: {
    slogan: 'Yenilik. Yaratıcılık. Dönüşüm.',
    buttonText: 'Daha Fazla',
  },
};

// Map of all translations
export const translations: Record<Language, Translations> = {
  en,
  tr
};

// Helper function to get translations for the current language
export const getTranslations = (language: Language): Translations => {
  return translations[language] || translations.en;
}; 