import {
  Apps as AppsIcon,
  MonitorHeart as MonitorIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material'

/**
 * Configurazione delle card statistiche
 */
export const statCardsConfig = (stats, navigate, t) => [
  {
    title: t('nav.applications'),
    value: stats.totalApps,
    icon: <AppsIcon fontSize="large" />,
    color: 'primary',
    onClick: () => navigate('/admin/applications')
  },
  {
    title: t('dashboard.stats.activeApps'),
    value: stats.activeApps,
    icon: <CheckCircleIcon fontSize="large" />,
    color: 'success',
    onClick: () => navigate('/admin/applications')
  },
  {
    title: t('dashboard.stats.totalUsers'),
    value: stats.totalUsers || 0,
    icon: <TrendingUpIcon fontSize="large" />,
    color: 'info',
    onClick: () => navigate('/admin/users')
  }
]

/**
 * Configurazione delle azioni rapide
 */
export const quickActionsConfig = (navigate, t) => [
  {
    title: t('applications.title'),
    description: t('applications.subtitle'),
    icon: <AppsIcon />,
    onClick: () => navigate('/admin/applications')
  },
  {
    title: t('monitoring.title'),
    description: t('monitoring.subtitle'),
    icon: <MonitorIcon />,
    onClick: () => navigate('/admin/monitoring')
  }
]

/**
 * Note di sistema da visualizzare
 */
export const systemNotes = (t) => ({
  title: t('dashboard.systemNotes.title'),
  content: t('dashboard.systemNotes.content')
})
