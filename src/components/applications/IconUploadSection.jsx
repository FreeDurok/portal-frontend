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

function IconUploadSection({
  iconTab,
  formData,
  previewIcon,
  uploading,
  onChange,
  onTabChange,
  onFileUpload
}) {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
        Icona Applicazione
      </Typography>
      
      <Tabs value={iconTab} onChange={onTabChange} sx={{ mb: 2 }}>
        <Tab icon={<LinkIcon />} label="URL Remoto" />
        <Tab icon={<CloudUpload />} label="Carica File" />
      </Tabs>

      {iconTab === 0 ? (
        <TextField
          fullWidth
          label="URL Icona"
          name="icon_url"
          value={formData.icon_url}
          onChange={onChange}
          placeholder="https://example.com/icon.png"
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
            {uploading ? 'Caricamento...' : 'Seleziona Icona'}
            <input
              type="file"
              hidden
              accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp,image/gif"
              onChange={onFileUpload}
            />
          </Button>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Formati supportati: PNG, JPG, SVG, WEBP, GIF (max 5MB)
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
