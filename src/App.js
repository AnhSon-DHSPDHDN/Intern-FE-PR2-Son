import React from 'react';
import { useTranslation } from 'react-i18next';

function App() {
	const { t } = useTranslation();
	return <div className='App'>{t('navigation.home')}</div>;
}

export default App;
