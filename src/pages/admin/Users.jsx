import { Typography, Button, Box, Alert, CircularProgress } from '@mui/material'
import { Add, People } from '@mui/icons-material'
import { useUsers } from '../../hooks/useUsers'
import UsersTable from '../../components/users/UsersTable'
import UserDialog from '../../components/users/UserDialog'
import DeleteConfirmDialog from '../../components/users/DeleteConfirmDialog'

function Users() {
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <People sx={{ fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Gestione Utenti
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Gestisci gli utenti e i loro permessi
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Nuovo Utente
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
