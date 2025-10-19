/**
 * Utility functions for application management
 */

export const ALLOWED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/svg+xml',
  'image/webp',
  'image/gif'
]

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

/**
 * Validate uploaded image file
 * @param {File} file - File to validate
 * @returns {Object} - { valid: boolean, error: string }
 */
export function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: 'Nessun file selezionato' }
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { 
      valid: false, 
      error: 'Formato file non supportato. Usa PNG, JPG, SVG, WEBP o GIF' 
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    return { 
      valid: false, 
      error: 'Il file è troppo grande. Dimensione massima: 5MB' 
    }
  }

  return { valid: true, error: null }
}

/**
 * Get icon source URL for application
 * @param {Object} app - Application object
 * @param {Function} getIconUrl - Function to get icon URL from filename
 * @returns {string} - Icon URL
 */
export function getAppIconSource(app, getIconUrl) {
  if (app.icon_file) {
    return getIconUrl(app.icon_file)
  }
  return app.icon_url || '/default-app-icon.png'
}

/**
 * Show temporary message
 * @param {Function} setter - State setter function
 * @param {string} message - Message to show
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
export function showTemporaryMessage(setter, message, duration = 3000) {
  setter(message)
  setTimeout(() => setter(''), duration)
}
