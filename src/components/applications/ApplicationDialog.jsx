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
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {editingApp ? t('applications.dialog.edit') : t('applications.dialog.create')}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label={t('applications.dialog.nameLabel')}
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />
          <TextField
            fullWidth
            label={t('applications.dialog.description')}
            name="description"
            value={formData.description}
            onChange={onChange}
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label={t('applications.dialog.url')}
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
            label={t('applications.dialog.category')}
            name="category"
            value={formData.category}
            onChange={onChange}
            placeholder={t('applications.dialog.categoryPlaceholder')}
          />
          <TextField
            fullWidth
            label={t('applications.dialog.order')}
            name="order"
            type="number"
            value={formData.order}
            onChange={onChange}
            helperText={t('applications.dialog.orderHelp')}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.is_active}
                onChange={onChange}
                name="is_active"
              />
            }
            label={t('applications.dialog.isActive')}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('applications.dialog.cancel')}</Button>
        <Button onClick={onSubmit} variant="contained" disabled={uploading}>
          {editingApp ? t('applications.dialog.save') : t('applications.dialog.create_btn')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ApplicationDialog
