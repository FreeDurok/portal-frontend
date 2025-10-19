import { 
  Card, 
  CardContent, 
  CardActionArea, 
  Typography, 
  Box,
  Avatar 
} from '@mui/material'
import { OpenInNew, Apps } from '@mui/icons-material'
import { applicationsAPI } from '../api/applications'

function ApplicationCard({ application }) {
  const handleClick = () => {
    window.open(application.url, '_blank', 'noopener,noreferrer')
  }

  const getIconSource = () => {
    if (application.icon_file) {
      return applicationsAPI.getIconUrl(application.icon_file)
    }
    return application.icon_url || null
  }

  const iconSrc = getIconSource()

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
        <CardContent>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              textAlign: 'center',
              py: 2
            }}
          >
            <Avatar
              sx={{ 
                width: 80, 
                height: 80, 
                mb: 2,
                bgcolor: iconSrc ? 'transparent' : 'primary.main'
              }}
              src={iconSrc}
              variant="rounded"
            >
              {!iconSrc && <Apps sx={{ fontSize: 40 }} />}
            </Avatar>
            
            <Typography variant="h6" component="div" gutterBottom>
              {application.name}
            </Typography>
            
            {application.description && (
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 1 }}
              >
                {application.description}
              </Typography>
            )}
            
            {application.category && (
              <Typography 
                variant="caption" 
                color="primary" 
                sx={{ 
                  bgcolor: 'primary.light',
                  color: 'white',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  mt: 1
                }}
              >
                {application.category}
              </Typography>
            )}
            
            <OpenInNew 
              sx={{ 
                mt: 2, 
                color: 'text.secondary',
                fontSize: 20
              }} 
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ApplicationCard
