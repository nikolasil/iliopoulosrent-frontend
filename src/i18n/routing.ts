import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const locales = [
  { locale: 'gr', label: 'Greek' },
  { locale: 'en', label: 'English' },
];

export const localesCodes = [
  { locale: 'gr' },
  { locale: 'en'},
];

export const routing = defineRouting({
  locales: ["gr", "en"], // Define in this line the possible languages for translation
  defaultLocale: "gr", // Define in this line the default language to be shown
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);