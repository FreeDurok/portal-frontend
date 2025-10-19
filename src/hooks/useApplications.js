import { useState, useEffect } from 'react'
import { applicationsAPI } from '../api/applications'
import { validateImageFile, getAppIconSource, showTemporaryMessage } from '../utils/applicationUtils'

const INITIAL_FORM_DATA = {
  name: '',
  description: '',
  url: '',
  icon_url: '',
  icon_file: '',
  category: '',
  order: 0,
  is_active: true
}

export function useApplications() {
  const [applications, setApplications] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [editingApp, setEditingApp] = useState(null)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [iconTab, setIconTab] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [previewIcon, setPreviewIcon] = useState(null)

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
        icon_file: app.icon_file || '',
        category: app.category || '',
        order: app.order,
        is_active: app.is_active
      })
      
      if (app.icon_file) {
        setIconTab(1)
        setPreviewIcon(applicationsAPI.getIconUrl(app.icon_file))
      } else if (app.icon_url) {
        setIconTab(0)
        setPreviewIcon(app.icon_url)
      }
    } else {
      setEditingApp(null)
      setFormData(INITIAL_FORM_DATA)
      setPreviewIcon(null)
      setIconTab(0)
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
        showTemporaryMessage(setSuccess, 'Applicazione aggiornata con successo')
      } else {
        await applicationsAPI.create(formData)
        showTemporaryMessage(setSuccess, 'Applicazione creata con successo')
      }
      handleCloseDialog()
      loadApplications()
    } catch (err) {
      setError(err.response?.data?.detail || 'Errore durante il salvataggio')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questa applicazione?')) {
      try {
        await applicationsAPI.delete(id)
        showTemporaryMessage(setSuccess, 'Applicazione eliminata con successo')
        loadApplications()
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
    
    if (name === 'icon_url' && value) {
      setPreviewIcon(value)
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const validation = validateImageFile(file)
    if (!validation.valid) {
      setError(validation.error)
      return
    }

    setUploading(true)
    setError('')

    try {
      const result = await applicationsAPI.uploadIcon(file)
      setFormData({
        ...formData,
        icon_file: result.filename,
        icon_url: ''
      })
      setPreviewIcon(applicationsAPI.getIconUrl(result.filename))
      showTemporaryMessage(setSuccess, 'Icona caricata con successo')
    } catch (err) {
      setError(err.response?.data?.detail || 'Errore durante l\'upload dell\'icona')
    } finally {
      setUploading(false)
    }
  }

  const handleTabChange = (event, newValue) => {
    setIconTab(newValue)
    if (newValue === 0) {
      setFormData({ ...formData, icon_file: '' })
      setPreviewIcon(formData.icon_url || null)
    } else {
      setFormData({ ...formData, icon_url: '' })
      setPreviewIcon(formData.icon_file ? applicationsAPI.getIconUrl(formData.icon_file) : null)
    }
  }

  const handleView = (url) => {
    window.open(url, '_blank')
  }

  const getIconSource = (app) => {
    return getAppIconSource(app, applicationsAPI.getIconUrl)
  }

  return {
    applications,
    openDialog,
    editingApp,
    formData,
    error,
    success,
    iconTab,
    uploading,
    previewIcon,
    setError,
    setSuccess,
    handleOpenDialog,
    handleCloseDialog,
    handleSubmit,
    handleDelete,
    handleChange,
    handleFileUpload,
    handleTabChange,
    handleView,
    getIconSource
  }
}
