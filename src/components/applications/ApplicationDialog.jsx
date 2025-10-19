import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Stack,
  Divider
} from '@mui/material'
import IconUploadSection from './IconUploadSection'

function ApplicationDialog({
  open,
  editingApp,
  formData,
  iconTab,
  previewIcon,
  uploading,
  onClose,
  onSubmit,
  onChange,
  onTabChange,
  onFileUpload
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {editingApp ? 'Modifica Applicazione' : 'Nuova Applicazione'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Nome"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />
          <TextField
            fullWidth
            label="Descrizione"
            name="description"
            value={formData.description}
            onChange={onChange}
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="URL"
            name="url"
            value={formData.url}
            onChange={onChange}
            required
          />

          <IconUploadSection
            iconTab={iconTab}
            formData={formData}
            previewIcon={previewIcon}
            uploading={uploading}
            onChange={onChange}
            onTabChange={onTabChange}
            onFileUpload={onFileUpload}
          />

          <Divider />

          <TextField
            fullWidth
            label="Categoria"
            name="category"
            value={formData.category}
            onChange={onChange}
            placeholder="es. Produttività, Comunicazione"
          />
          <TextField
            fullWidth
            label="Ordine"
            name="order"
            type="number"
            value={formData.order}
            onChange={onChange}
            helperText="Determina l'ordine di visualizzazione (numeri più bassi appaiono prima)"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.is_active}
                onChange={onChange}
                name="is_active"
              />
            }
            label="Applicazione Attiva"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annulla</Button>
        <Button onClick={onSubmit} variant="contained" disabled={uploading}>
          {editingApp ? 'Salva' : 'Crea'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ApplicationDialog
