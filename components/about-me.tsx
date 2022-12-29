import { useTranslation } from 'next-i18next'

export function AboutMe() {

  const { t } = useTranslation('common')

  return <div>
    {t('about-me-intro')}
  </div>
}