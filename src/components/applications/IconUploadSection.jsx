import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Avatar
} from '@mui/material'
import { CloudUpload, Link as LinkIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

function IconUploadSection({
  iconTab,
  formData,
  previewIcon,
  uploading,
  onChange,
  onTabChange,
  onFileUpload
}) {
  const { t } = useTranslation()
  
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
        {t('applications.dialog.icon')}
      </Typography>
      
      <Tabs value={iconTab} onChange={onTabChange} sx={{ mb: 2 }}>
        <Tab icon={<LinkIcon />} label={t('applications.dialog.iconUrlTab')} />
        <Tab icon={<CloudUpload />} label={t('applications.dialog.iconUploadTab')} />
      </Tabs>

      {iconTab === 0 ? (
        <TextField
          fullWidth
          label={t('applications.dialog.iconUrl')}
          name="icon_url"
          value={formData.icon_url}
          onChange={onChange}
          placeholder={t('applications.dialog.iconUrlPlaceholder')}
        />
      ) : (
        <Box>
          <Button
            variant="outlined"
            component="label"
            startIcon={uploading ? <CircularProgress size={20} /> : <CloudUpload />}
            disabled={uploading}
            fullWidth
          >
            {uploading ? t('applications.dialog.uploading') : t('applications.dialog.selectIcon')}
            <input
              type="file"
              hidden
              accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp,image/gif"
              onChange={onFileUpload}
            />
          </Button>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {t('applications.dialog.supportedFormats')}
          </Typography>
        </Box>
      )}

      {previewIcon && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Paper variant="outlined" sx={{ p: 2, display: 'inline-flex' }}>
            <Avatar
              src={previewIcon}
              alt="Icon preview"
              sx={{ width: 80, height: 80 }}
              variant="rounded"
            />
          </Paper>
        </Box>
      )}
    </Box>
  )
}

export default IconUploadSection
