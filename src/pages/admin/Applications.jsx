import { Typography, Button, Box, Alert, Grid } from '@mui/material'
import { Add, Apps } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useApplications } from '../../hooks/useApplications'
import ApplicationsTable from '../../components/applications/ApplicationsTable'
import ApplicationDialog from '../../components/applications/ApplicationDialog'
import DeleteConfirmDialog from '../../components/applications/DeleteConfirmDialog'

function Applications() {
  const { t } = useTranslation()
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
    deleteDialog,
    setError,
    setSuccess,
    handleOpenDialog,
    handleCloseDialog,
    handleSubmit,
    handleDelete,
    handleConfirmDelete,
    handleCancelDelete,
    handleChange,
    handleFileUpload,
    handleTabChange,
    handleView,
    getIconSource
  } = useApplications()

  return (
    <Box>
      {/* Content Container - Centered */}
      <Box sx={{ maxWidth: '66.666667%', margin: '0 auto' }}>
        {/* Header - Aligned with content */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Apps sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {t('applications.title')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {t('applications.subtitle')}
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
            {t('applications.newApp')}
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
      </Box>

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

      <DeleteConfirmDialog
        open={deleteDialog.open}
        application={deleteDialog.app}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Box>
  )
}

export default Applications
