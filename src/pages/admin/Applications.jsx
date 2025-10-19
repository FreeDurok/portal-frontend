import { Typography, Button, Box, Alert } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useApplications } from '../../hooks/useApplications'
import ApplicationsTable from '../../components/applications/ApplicationsTable'
import ApplicationDialog from '../../components/applications/ApplicationDialog'

function Applications() {
  const {
    applications,
    openDialog,
    editingApp,
    formData,
    error,
    success,
    iconTab,
    uploading,
    previewIcon,
    setError,
    setSuccess,
    handleOpenDialog,
    handleCloseDialog,
    handleSubmit,
    handleDelete,
    handleChange,
    handleFileUpload,
    handleTabChange,
    handleView,
    getIconSource
  } = useApplications()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Gestione Applicazioni
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Configura e gestisci le applicazioni del portale
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Nuova Applicazione
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

      <ApplicationsTable
        applications={applications}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
        onView={handleView}
        getIconSource={getIconSource}
      />

      <ApplicationDialog
        open={openDialog}
        editingApp={editingApp}
        formData={formData}
        iconTab={iconTab}
        previewIcon={previewIcon}
        uploading={uploading}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onTabChange={handleTabChange}
        onFileUpload={handleFileUpload}
      />
    </Box>
  )
}

export default Applications
