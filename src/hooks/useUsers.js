import { useState, useEffect } from 'react'
import usersApi from '../api/users'

export const useUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [deletingUser, setDeletingUser] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    is_active: true,
    is_admin: false
  })

  // Load users
  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await usersApi.getAll()
      setUsers(data)
      setError('')
    } catch (err) {
      console.error('Error loading users:', err)
      setError('Errore nel caricamento degli utenti')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  // Open dialog for create/edit
  const handleOpenDialog = (user = null) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        email: user.email,
        username: user.username,
        password: '',
        is_active: user.is_active,
        is_admin: user.is_admin
      })
    } else {
      setEditingUser(null)
      setFormData({
        email: '',
        username: '',
        password: '',
        is_active: true,
        is_admin: false
      })
    }
    setOpenDialog(true)
  }

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingUser(null)
    setFormData({
      email: '',
      username: '',
      password: '',
      is_active: true,
      is_admin: false
    })
  }

  // Handle form change
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle submit
  const handleSubmit = async (oldPassword = '') => {
    try {
      // Validation
      if (!formData.email || !formData.username) {
        setError('Email e username sono obbligatori')
        return
      }

      if (!editingUser && !formData.password) {
        setError('La password è obbligatoria per i nuovi utenti')
        return
      }

      // Prepare data
      const userData = {
        email: formData.email,
        username: formData.username,
        is_active: formData.is_active,
      }

      // Include password only if provided
      if (formData.password) {
        userData.password = formData.password
        // Include old password if we're updating and have it
        if (editingUser && oldPassword) {
          userData.old_password = oldPassword
        }
      }

      if (editingUser) {
        // Update existing user
        await usersApi.update(editingUser.id, userData)
        setSuccess('Utente aggiornato con successo')
      } else {
        // Create new user
        await usersApi.create(userData)
        setSuccess('Utente creato con successo')
      }

      handleCloseDialog()
      loadUsers()
    } catch (err) {
      console.error('Error saving user:', err)
      setError(err.response?.data?.detail || 'Errore nel salvataggio dell\'utente')
    }
  }

  // Open delete confirmation dialog
  const handleOpenDeleteDialog = (user) => {
    setDeletingUser(user)
    setOpenDeleteDialog(true)
  }

  // Close delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setDeletingUser(null)
    setOpenDeleteDialog(false)
  }

  // Handle delete user
  const handleDeleteUser = async () => {
    if (!deletingUser) return

    try {
      await usersApi.delete(deletingUser.id)
      setSuccess(`Utente "${deletingUser.username}" eliminato con successo`)
      handleCloseDeleteDialog()
      loadUsers()
    } catch (err) {
      console.error('Error deleting user:', err)
      setError(err.response?.data?.detail || 'Errore nell\'eliminazione dell\'utente')
      handleCloseDeleteDialog()
    }
  }

  return {
    users,
    loading,
    openDialog,
    openDeleteDialog,
    editingUser,
    deletingUser,
    formData,
    error,
    success,
    setError,
    setSuccess,
    handleOpenDialog,
    handleCloseDialog,
    handleSubmit,
    handleChange,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleDeleteUser,
  }
}

export default useUsers
