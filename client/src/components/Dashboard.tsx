import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Dashboard({
  setTheme,
  theme,
}: {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
}) {
  const { t, i18n } = useTranslation('translation');
  return (
    <div>
      <h1>{t('changeTheme')}</h1>
      <select
        name='theme-color'
        onChange={(event) => {
          setTheme(event.target.value);
        }}
        value={theme}>
        <option value='dark-raspberry'>Raspberry</option>
        <option value='golden-yellow'>Yellow</option>
      </select>
      <select
        onChange={(event) => {
          i18n.changeLanguage(event.target.value);
        }}
        value={i18n.language}>
        <option value='bg'>Bulgarian</option>
        <option value='en'>English</option>
      </select>
    </div>
  );
}
