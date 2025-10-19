import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tooltip,
  Box,
  Typography
} from '@mui/material'
import { Edit, AdminPanelSettings, Person, Delete } from '@mui/icons-material'
import { format } from 'date-fns'
import { it } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'

function UsersTable({ users, onEdit, onDelete }) {
  const { t } = useTranslation()
  if (!users || users.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">
          {t('common.noData')}
        </Typography>
      </Paper>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'action.hover' }}>
            <TableCell sx={{ fontWeight: 600 }}>{t('users.table.username')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('users.table.email')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('users.table.role')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('users.table.status')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('common.createdAt')}</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600 }}>{t('users.table.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow 
              key={user.id}
              sx={{ 
                '&:hover': { bgcolor: 'action.hover' },
                opacity: user.is_active ? 1 : 0.6
              }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {user.is_admin ? (
                    <AdminPanelSettings color="primary" fontSize="small" />
                  ) : (
                    <Person color="action" fontSize="small" />
                  )}
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {user.username}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Chip 
                  label={user.is_admin ? t('users.roles.admin') : t('users.roles.user')}
                  color={user.is_admin ? 'primary' : 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip 
                  label={user.is_active ? t('users.status.active') : t('users.status.inactive')}
                  color={user.is_active ? 'success' : 'default'}
                  size="small"
                  variant={user.is_active ? 'filled' : 'outlined'}
                />
              </TableCell>
              <TableCell>
                {format(new Date(user.created_at), 'dd MMM yyyy', { locale: it })}
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <Tooltip title={t('common.edit')}>
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => onEdit(user)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {!user.is_admin && (
                    <Tooltip title={t('common.delete')}>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => onDelete(user)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UsersTable
