import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Chip,
  Avatar
} from '@mui/material'
import { Edit, Delete, Visibility } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

function ApplicationsTable({ applications, onEdit, onDelete, onView, getIconSource }) {
  const { t } = useTranslation()
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('applications.dialog.icon')}</TableCell>
            <TableCell>{t('applications.table.name')}</TableCell>
            <TableCell>{t('applications.table.url')}</TableCell>
            <TableCell>{t('applications.table.category')}</TableCell>
            <TableCell>{t('common.order')}</TableCell>
            <TableCell>{t('applications.table.status')}</TableCell>
            <TableCell align="right">{t('applications.table.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id} hover>
              <TableCell>
                <Avatar
                  src={getIconSource(app)}
                  alt={app.name}
                  variant="rounded"
                  sx={{ width: 40, height: 40 }}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight={600}>
                  {app.name}
                </Typography>
              </TableCell>
              <TableCell>
                <a 
                  href={app.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    color: 'inherit', 
                    textDecoration: 'none'
                  }}
                >
                  {app.url}
                </a>
              </TableCell>
              <TableCell>
                {app.category ? (
                  <Chip label={app.category} size="small" variant="outlined" />
                ) : '-'}
              </TableCell>
              <TableCell>{app.order}</TableCell>
              <TableCell>
                <Chip
                  label={app.is_active ? t('applications.status.active') : t('applications.status.inactive')}
                  color={app.is_active ? 'success' : 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  onClick={() => onView(app.url)}
                  title={t('common.edit')}
                  color="primary"
                >
                  <Visibility />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onEdit(app)}
                  title="Modifica"
                  color="secondary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onDelete(app)}
                  title="Elimina"
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ApplicationsTable
