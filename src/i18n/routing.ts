import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import { i18nOptions } from '@/app/resources/config';

export const routing = defineRouting({
  locales: i18nOptions.locales,
  defaultLocale: i18nOptions.defaultLocale,
  localePrefix: 'as-needed'
});

export type Locale = (typeof routing.locales)[number];

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
