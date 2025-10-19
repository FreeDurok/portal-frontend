import { useState, useEffect, useRef } from 'react'
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Switch,
  FormControlLabel,
  Chip,
  Alert,
  Tooltip,
  TextField,
  InputAdornment
} from '@mui/material'
import {
  Description,
  Delete,
  PlayArrow,
  Stop,
  Download,
  Refresh,
  Search,
  Clear
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { logsAPI } from '../../api/logs'

function Logs() {
  const { t } = useTranslation()
  const [logs, setLogs] = useState([])
  const [filteredLogs, setFilteredLogs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [autoScroll, setAutoScroll] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  
  const logContainerRef = useRef(null)
  const eventSourceRef = useRef(null)

  // Filter logs based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredLogs(logs)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = logs.filter(log => 
        log.toLowerCase().includes(query)
      )
      setFilteredLogs(filtered)
    }
  }, [logs, searchQuery])

  // Load initial logs
  const loadLogs = async () => {
    try {
      setLoading(true)
      const data = await logsAPI.getRecent(500)
      if (data.logs) {
        setLogs(data.logs)
      }
      setError('')
    } catch (err) {
      console.error('Error loading logs:', err)
      setError(t('logs.error'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLogs()
    return () => {
      if (eventSourceRef.current) {
        clearInterval(eventSourceRef.current)
      }
    }
  }, [])

  // Auto scroll to bottom
  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [filteredLogs, autoScroll])

  const startStreaming = () => {
    if (eventSourceRef.current) {
      clearInterval(eventSourceRef.current)
    }

    // Poll logs every 2 seconds
    const intervalId = setInterval(async () => {
      try {
        const data = await logsAPI.getRecent(500)
        if (data.logs) {
          setLogs(data.logs)
        }
      } catch (err) {
        console.error('Polling error:', err)
      }
    }, 2000)

    eventSourceRef.current = intervalId
    setIsStreaming(true)
    setError('')
  }

  const stopStreaming = () => {
    if (eventSourceRef.current) {
      clearInterval(eventSourceRef.current)
      eventSourceRef.current = null
    }
    setIsStreaming(false)
  }

  const handleClearLogs = async () => {
    if (!window.confirm(t('logs.confirmClear'))) {
      return
    }

    try {
      await logsAPI.clearLogs()
      setLogs([])
      setSuccess(t('logs.successCleared'))
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('Error clearing logs:', err)
      setError(t('logs.errorClearing'))
    }
  }

  const handleDownloadLogs = () => {
    const logContent = logs.join('')
    const blob = new Blob([logContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `app-logs-${new Date().toISOString()}.log`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Description sx={{ fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {t('logs.title')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {t('logs.subtitle')}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Chip
            label={isStreaming ? t('logs.streamingActive') : t('logs.streamingInactive')}
            color={isStreaming ? 'success' : 'default'}
            size="small"
          />
          {logs.length > 0 && (
            <Chip
              label={searchQuery ? `${filteredLogs.length}/${logs.length} ${t('logs.lines')}` : `${logs.length} ${t('logs.lines')}`}
              variant="outlined"
              size="small"
            />
          )}
        </Box>
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

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <TextField
            placeholder={t('logs.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ flexGrow: 1, maxWidth: '400px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchQuery('')}>
                    <Clear />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={autoScroll}
                onChange={(e) => setAutoScroll(e.target.checked)}
              />
            }
            label={t('logs.autoScroll')}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {!isStreaming ? (
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                onClick={startStreaming}
              >
                {t('logs.startStreaming')}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                startIcon={<Stop />}
                onClick={stopStreaming}
              >
                {t('logs.stopStreaming')}
              </Button>
            )}
            <Tooltip title={t('logs.reloadLogs')}>
              <span>
                <IconButton onClick={loadLogs} disabled={loading}>
                  <Refresh />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title={t('logs.downloadLogs')}>
              <span>
                <IconButton onClick={handleDownloadLogs} disabled={logs.length === 0}>
                  <Download />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title={t('logs.clearLogs')}>
              <span>
                <IconButton onClick={handleClearLogs} color="error">
                  <Delete />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </Box>
      </Paper>

      <Paper
        sx={{
          height: '600px',
          overflow: 'hidden',
          bgcolor: mode => mode.palette.mode === 'dark' ? '#0A0A0A' : '#F5F5F5'
        }}
      >
        <Box
          ref={logContainerRef}
          sx={{
            height: '100%',
            overflow: 'auto',
            p: 2,
            fontFamily: '"Fira Code", "Courier New", monospace',
            fontSize: '13px',
            lineHeight: 1.6,
            color: mode => mode.palette.mode === 'dark' ? '#E0E0E0' : '#212121',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
        >
          {filteredLogs.length === 0 ? (
            <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
              {logs.length === 0 ? t('logs.noLogs') : t('logs.noResults')}
            </Typography>
          ) : (
            filteredLogs.map((log, index) => (
              <Box
                key={index}
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  py: 0.5,
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                {log}
              </Box>
            ))
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default Logs
