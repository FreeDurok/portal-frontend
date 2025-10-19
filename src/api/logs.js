import axios from './axios'

export const logsAPI = {
  getRecent: async (lines = 100) => {
    const response = await axios.get(`/logs/recent?lines=${lines}`)
    return response.data
  },

  clearLogs: async () => {
    const response = await axios.delete('/logs/clear')
    return response.data
  },

  // Fetch with streaming for logs (EventSource doesn't support custom headers)
  streamLogs: async (onMessage, onError) => {
    try {
      const response = await axios.get('/logs/stream', {
        responseType: 'stream',
        adapter: 'fetch',
        headers: {
          'Accept': 'text/event-stream',
        }
      })

      const reader = response.data.getReader()
      const decoder = new TextDecoder()

      const readStream = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            const lines = chunk.split('\n')
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.substring(6)
                if (data) onMessage(data)
              }
            }
          }
        } catch (error) {
          console.error('Stream read error:', error)
          onError(error)
        }
      }

      readStream()

      // Return abort controller for cleanup
      return {
        close: () => reader.cancel()
      }
    } catch (error) {
      console.error('Stream start error:', error)
      onError(error)
      return { close: () => {} }
    }
  }
}

export default logsAPI
