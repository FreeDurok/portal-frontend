import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControlLabel,
  Switch,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material'
import { Close, Visibility, VisibilityOff } from '@mui/icons-material'

function UserDialog({
  open,
  editingUser,
  formData,
  onClose,
  onSubmit,
  onChange
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')

  const handleSubmit = () => {
    // Validazione conferma password per nuovi utenti
    if (!editingUser && formData.password !== confirmPassword) {
      alert('Le password non coincidono')
      return
    }

    // Validazione vecchia password per modifica
    if (editingUser && formData.password && !oldPassword) {
      alert('Inserisci la vecchia password per modificarla')
      return
    }

    // Passa anche oldPassword se presente
    onSubmit(oldPassword)
  }

  const handleClose = () => {
    setConfirmPassword('')
    setOldPassword('')
    setShowPassword(false)
    setShowConfirmPassword(false)
    setShowOldPassword(false)
    onClose()
  }

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        {editingUser ? 'Modifica Utente' : 'Nuovo Utente'}
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 1 }}>
          <TextField
            label="Username"
            fullWidth
            value={formData.username || ''}
            onChange={(e) => onChange('username', e.target.value)}
            required
            disabled={!!editingUser}
          />
          
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={formData.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
            required
          />
          
          {editingUser ? (
            <>
              <TextField
                label="Vecchia Password"
                type={showOldPassword ? 'text' : 'password'}
                fullWidth
                value={oldPassword || ''}
                onChange={(e) => setOldPassword(e.target.value)}
                required={!!formData.password}
                helperText="Inserisci la password attuale per confermare la modifica"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        edge="end"
                        size="small"
                      >
                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                label="Nuova Password (lascia vuoto per non modificare)"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={formData.password || ''}
                onChange={(e) => onChange('password', e.target.value)}
                helperText="Compila solo se vuoi modificare la password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </>
          ) : (
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={formData.password || ''}
              onChange={(e) => onChange('password', e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}

          {!editingUser && (
            <TextField
              label="Conferma Password"
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              value={confirmPassword || ''}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={!!(confirmPassword && formData.password !== confirmPassword)}
              helperText={
                confirmPassword && formData.password !== confirmPassword
                  ? "Le password non coincidono"
                  : undefined
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}

          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 1,
            p: 2,
            bgcolor: 'action.hover',
            borderRadius: 1
          }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_active}
                  onChange={(e) => onChange('is_active', e.target.checked)}
                />
              }
              label="Utente Attivo"
            />
            
            {editingUser && editingUser.is_admin && (
              <Alert severity="warning" sx={{ mt: 1 }}>
                Questo è un account amministratore. La modifica dei privilegi admin non è disponibile.
              </Alert>
            )}
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button onClick={handleClose}>
          Annulla
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
        >
          {editingUser ? 'Salva Modifiche' : 'Crea Utente'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserDialog
