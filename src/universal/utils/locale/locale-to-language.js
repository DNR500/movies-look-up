import languages from 'languages';

const localeToLanguage = locale => languages.getLanguageInfo(locale).name;

export default localeToLanguage;
