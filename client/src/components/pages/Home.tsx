import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const [t, i18n] = useTranslation();
  return (
    <div className='home'>
      <div>{t('selectLanguage')}</div>
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
