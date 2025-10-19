import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material'
import {
  Warning as WarningIcon,
  Delete as DeleteIcon
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

/**
 * DeleteConfirmDialog - Elegante dialog di conferma per l'eliminazione di applicazioni
 */
function DeleteConfirmDialog({ open, application, onConfirm, onCancel }) {
  const { t } = useTranslation()
  
  if (!application) return null

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        elevation: 3,
        sx: {
          borderRadius: 2
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              bgcolor: 'error.lighter',
              color: 'error.main',
              p: 1,
              borderRadius: 2,
              display: 'flex'
            }}
          >
            <WarningIcon />
          </Box>
          <Typography variant="h6" fontWeight={600}>
            {t('applications.delete.title')}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Alert severity="warning" sx={{ mb: 2 }}>
          {t('applications.delete.warning')}
        </Alert>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {t('applications.delete.message')}
        </Typography>

        <Box
          sx={{
            bgcolor: 'background.default',
            p: 2,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {t('applications.delete.appName')}
          </Typography>
          <Typography variant="body1" fontWeight={600} gutterBottom>
            {application.name}
          </Typography>

          {application.description && (
            <>
              <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mt: 1 }}>
                {t('applications.delete.appDescription')}
              </Typography>
              <Typography variant="body2">
                {application.description}
              </Typography>
            </>
          )}

          <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mt: 1 }}>
            {t('applications.delete.appUrl')}
          </Typography>
          <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
            {application.url}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          fullWidth
        >
          {t('applications.delete.cancel')}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          fullWidth
        >
          {t('applications.delete.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmDialog
