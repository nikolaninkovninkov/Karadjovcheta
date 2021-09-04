import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { t, i18n } = useTranslation('translation');
  return (
    <div>
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
