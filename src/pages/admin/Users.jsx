import { Typography, Button, Box, Alert, CircularProgress, Grid } from '@mui/material'
import { Add, People } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useUsers } from '../../hooks/useUsers'
import UsersTable from '../../components/users/UsersTable'
import UserDialog from '../../components/users/UserDialog'
import DeleteConfirmDialog from '../../components/users/DeleteConfirmDialog'

function Users() {
  const { t } = useTranslation()
  const {
    users,
    loading,
    openDialog,
    openDeleteDialog,
    editingUser,
    deletingUser,
    formData,
    error,
    success,
    setError,
    setSuccess,
    handleOpenDialog,
    handleCloseDialog,
    handleSubmit,
    handleChange,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleDeleteUser,
  } = useUsers()

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      {/* Content Container - Centered */}
      <Box sx={{ maxWidth: '66.666667%', margin: '0 auto' }}>
        {/* Header - Aligned with content */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <People sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {t('users.title')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {t('users.subtitle')}
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* Action Button - Aligned with table */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            {t('users.newUser')}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        <UsersTable
          users={users}
          onEdit={handleOpenDialog}
          onDelete={handleOpenDeleteDialog}
        />
      </Box>

      <UserDialog
        open={openDialog}
        editingUser={editingUser}
        formData={formData}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />

      <DeleteConfirmDialog
        open={openDeleteDialog}
        user={deletingUser}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteUser}
      />
    </Box>
  )
}

export default Users
