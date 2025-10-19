import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Box,
  Alert,
  Chip
} from '@mui/material'
import { Add, Edit, Delete, Visibility } from '@mui/icons-material'
import { applicationsAPI } from '../../api/applications'

function Applications() {
  const [applications, setApplications] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [editingApp, setEditingApp] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    icon_url: '',
    category: '',
    order: 0,
    is_active: true
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    try {
      const data = await applicationsAPI.getAll()
      setApplications(data)
    } catch (err) {
      setError('Errore nel caricamento delle applicazioni')
    }
  }

  const handleOpenDialog = (app = null) => {
    if (app) {
      setEditingApp(app)
      setFormData({
        name: app.name,
        description: app.description || '',
        url: app.url,
        icon_url: app.icon_url || '',
        category: app.category || '',
        order: app.order,
        is_active: app.is_active
      })
    } else {
      setEditingApp(null)
      setFormData({
        name: '',
        description: '',
        url: '',
        icon_url: '',
        category: '',
        order: 0,
        is_active: true
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingApp(null)
    setError('')
  }

  const handleSubmit = async () => {
    try {
      if (editingApp) {
        await applicationsAPI.update(editingApp.id, formData)
        setSuccess('Applicazione aggiornata con successo')
      } else {
        await applicationsAPI.create(formData)
        setSuccess('Applicazione creata con successo')
      }
      handleCloseDialog()
      loadApplications()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.detail || 'Errore durante il salvataggio')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questa applicazione?')) {
      try {
        await applicationsAPI.delete(id)
        setSuccess('Applicazione eliminata con successo')
        loadApplications()
        setTimeout(() => setSuccess(''), 3000)
      } catch (err) {
        setError('Errore durante l\'eliminazione')
      }
    }
  }

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Gestione Applicazioni
        </Typography>
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Ordine</TableCell>
              <TableCell>Stato</TableCell>
              <TableCell align="right">Azioni</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.name}</TableCell>
                <TableCell>
                  <a href={app.url} target="_blank" rel="noopener noreferrer">
                    {app.url}
                  </a>
                </TableCell>
                <TableCell>{app.category || '-'}</TableCell>
                <TableCell>{app.order}</TableCell>
                <TableCell>
                  <Chip
                    label={app.is_active ? 'Attiva' : 'Inattiva'}
                    color={app.is_active ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => window.open(app.url, '_blank')}
                    title="Visualizza"
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(app)}
                    title="Modifica"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(app.id)}
                    title="Elimina"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Create/Edit */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingApp ? 'Modifica Applicazione' : 'Nuova Applicazione'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Descrizione"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="URL Icona"
            name="icon_url"
            value={formData.icon_url}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Categoria"
            name="category"
            value={formData.category}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Ordine"
            name="order"
            type="number"
            value={formData.order}
            onChange={handleChange}
            margin="normal"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.is_active}
                onChange={handleChange}
                name="is_active"
              />
            }
            label="Applicazione Attiva"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annulla</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingApp ? 'Salva' : 'Crea'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Applications
