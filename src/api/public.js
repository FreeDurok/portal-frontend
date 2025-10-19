import axios from './axios'

/**
 * API pubbliche - non richiedono autenticazione
 * Usate per il portale pubblico (home page)
 */
export const publicAPI = {
  /**
   * Ottiene tutte le applicazioni ATTIVE
   * Endpoint pubblico, non richiede autenticazione
   */
  getApplications: async () => {
    const response = await axios.get('/public/applications')
    return response.data
  },

  /**
   * Ottiene una singola applicazione ATTIVA per ID
   * Endpoint pubblico, non richiede autenticazione
   */
  getApplicationById: async (id) => {
    const response = await axios.get(`/public/applications/${id}`)
    return response.data
  }
}
