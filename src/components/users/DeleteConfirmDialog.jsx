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

function DeleteConfirmDialog({ open, user, onClose, onConfirm }) {
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
        Conferma Eliminazione
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" gutterBottom>
            Sei sicuro di voler eliminare l'utente:
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
            <strong>Attenzione:</strong> Questa azione è irreversibile e eliminerà permanentemente l'utente dal sistema.
          </Typography>
        </Alert>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Annulla
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained"
          color="error"
        >
          Elimina Utente
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmDialog
