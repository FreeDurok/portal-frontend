# Application Portal - Frontend

Frontend React per il portale applicazioni con dashboard pubblica e area amministrazione.

## Caratteristiche

- **React 18** con Vite
- **Material-UI (MUI)** - Componenti moderni
- **Titillium Web** - Font tipografico
- **React Router** - Navigazione SPA
- **Zustand** - State management
- **Axios** - HTTP client
- **Architettura modulare** - Facilmente estendibile

## Struttura

```
frontend/
├── src/
│   ├── api/
│   │   ├── axios.js              # Configurazione Axios
│   │   ├── auth.js               # API autenticazione
│   │   └── applications.js       # API applicazioni
│   ├── components/
│   │   ├── Layout.jsx            # Layout principale
│   │   ├── Navbar.jsx            # Barra di navigazione
│   │   ├── ApplicationCard.jsx   # Card applicazione
│   │   └── ProtectedRoute.jsx    # Route protetta
│   ├── pages/
│   │   ├── Dashboard.jsx         # Dashboard pubblica
│   │   └── admin/
│   │       ├── Login.jsx         # Login admin
│   │       ├── Dashboard.jsx     # Dashboard admin
│   │       └── Applications.jsx  # Gestione applicazioni
│   ├── store/
│   │   └── authStore.js          # Store autenticazione
│   ├── theme.js                  # Tema Material-UI
│   ├── App.jsx                   # App principale
│   └── main.jsx                  # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Setup

1. **Installa dipendenze**:
```bash
npm install
```

2. **Configura ambiente**:
```bash
cp .env.example .env
# Modifica .env se necessario
```

3. **Avvia development server**:
```bash
npm run dev
```

L'applicazione sarà disponibile su: http://localhost:3000

## Build per Produzione

```bash
npm run build
npm run preview  # Preview build
```

## Pagine e Rotte

### Pubbliche
- `/` - Dashboard portale con tutte le applicazioni
- `/admin/login` - Login amministratori

### Protette (Admin)
- `/admin` - Dashboard amministrazione
- `/admin/applications` - Gestione applicazioni (CRUD)

## Funzionalità

### Dashboard Pubblica
- Visualizzazione di tutte le applicazioni attive
- Card con icona, nome, descrizione e categoria
- Click per aprire applicazione in nuovo tab
- Responsive design

### Area Admin
- Login protetto (solo amministratori)
- Dashboard con statistiche
- CRUD completo applicazioni
- Gestione stato attivo/inattivo
- Ordinamento applicazioni

## Estensione Moduli

### Aggiungere nuova pagina pubblica
1. Crea componente in `src/pages/`
2. Aggiungi route in `src/App.jsx`
3. Aggiungi link in `src/components/Navbar.jsx`

### Aggiungere nuova pagina admin
1. Crea componente in `src/pages/admin/`
2. Aggiungi route protetta in `src/App.jsx`
3. Aggiungi link in `src/components/Navbar.jsx`

### Aggiungere nuova API
1. Crea file in `src/api/`
2. Usa `axiosInstance` per le chiamate
3. Importa dove necessario

### Aggiungere nuovo store
1. Crea file in `src/store/`
2. Usa `zustand` con `persist` se necessario
3. Importa nei componenti

## Personalizzazione Tema

Modifica `src/theme.js` per personalizzare:
- Colori primari/secondari
- Tipografia
- Spaziature
- Componenti MUI

## Titillium Web Font

Il font è caricato tramite Google Fonts in `index.html` e configurato nel tema MUI.

## API Integration

L'app si connette al backend FastAPI tramite:
- Base URL configurabile in `.env`
- Interceptor Axios per token JWT
- Gestione automatica logout su 401

## Autenticazione

- JWT token salvato in localStorage (via Zustand persist)
- Auto-refresh disponibile
- Protezione route admin
- Logout automatico su errori auth

## Sicurezza

- Protected routes con ProtectedRoute component
- Token in localStorage (considera httpOnly cookies per produzione)
- CORS configurato nel backend
- Validazione permessi admin lato backend

## Development Tips

- Hot reload abilitato
- DevTools React supportati
- Console warnings durante sviluppo
- Proxy API configurato in Vite
