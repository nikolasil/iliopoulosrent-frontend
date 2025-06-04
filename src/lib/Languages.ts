// lib/getDictionary.ts
import en from '../../dictionaries/en.json';
import gr from '../../dictionaries/gr.json';

const dictionaries = {
  en,
  gr,
};

export const getDictionary = (lang: string) => {
  return dictionaries[lang as keyof typeof dictionaries] || dictionaries.gr;
};

const dictionariesList = [
  { lang: 'en', label: 'English' },
  { lang: 'gr', label: 'Greek' },
];

export const getDictionaries = () => {
  return dictionariesList;
};
