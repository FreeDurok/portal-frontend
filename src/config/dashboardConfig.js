import {
  Apps as AppsIcon,
  MonitorHeart as MonitorIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material'

/**
 * Configurazione delle card statistiche
 */
export const statCardsConfig = (stats, navigate) => [
  {
    title: 'Applicazioni',
    value: stats.totalApps,
    icon: <AppsIcon fontSize="large" />,
    color: 'primary',
    onClick: () => navigate('/admin/applications')
  },
  {
    title: 'Attive',
    value: stats.activeApps,
    icon: <CheckCircleIcon fontSize="large" />,
    color: 'success',
    onClick: () => navigate('/admin/applications')
  },
  {
    title: 'Servizi',
    value: '-',
    icon: <TrendingUpIcon fontSize="large" />,
    color: 'info',
    disabled: true
  },
  {
    title: 'Health',
    value: '-',
    icon: <MonitorIcon fontSize="large" />,
    color: 'warning',
    disabled: true
  }
]

/**
 * Configurazione delle azioni rapide
 */
export const quickActionsConfig = (navigate) => [
  {
    title: 'Gestisci Applicazioni',
    description: 'Aggiungi, modifica o elimina applicazioni del portale',
    icon: <AppsIcon />,
    onClick: () => navigate('/admin/applications')
  },
  {
    title: 'Monitoring Servizi',
    description: 'Monitora lo stato di salute dei servizi',
    icon: <MonitorIcon />,
    disabled: true,
    badge: 'Prossimamente'
  }
]

/**
 * Note di sistema da visualizzare
 */
export const systemNotes = [
  'Tutte le API del backend richiedono autenticazione',
  'Il sistema di monitoring sarà disponibile nella prossima release',
  'Le modifiche vengono applicate in tempo reale grazie al hot-reload'
]
