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
import { Warning } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

function DeleteConfirmDialog({ open, user, onClose, onConfirm }) {
  const { t } = useTranslation()
  
  if (!user) return null

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 1,
        color: 'error.main'
      }}>
        <Warning />
        {t('users.delete.title')}
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" gutterBottom>
            {t('users.delete.message')}
          </Typography>
          <Box sx={{ 
            mt: 2, 
            p: 2, 
            bgcolor: 'action.hover', 
            borderRadius: 1,
            borderLeft: 3,
            borderColor: 'error.main'
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {user.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
        
        <Alert severity="error" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>{t('users.delete.warningTitle')}</strong> {t('users.delete.warning')}
          </Typography>
        </Alert>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined">
          {t('users.delete.cancel')}
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained"
          color="error"
        >
          {t('users.delete.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmDialog
