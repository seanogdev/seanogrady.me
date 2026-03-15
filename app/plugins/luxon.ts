import { Settings } from 'luxon';

export default defineNuxtPlugin(() => {
  Settings.defaultLocale = 'en-US';
});
