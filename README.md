# Portal Frontend

Frontend React con Material-UI e Titillium Web.

## Sviluppo Locale

```bash
npm install
cp .env.example .env
./start.sh
```

## Docker

```bash
# Avvia
./start.sh

# Stop
docker stop portal-frontend
```

## Build Produzione

```bash
npm run build
```

## Struttura

- `/` - Dashboard pubblica
- `/admin/login` - Login admin
- `/admin` - Dashboard admin
- `/admin/applications` - Gestione applicazioni

## Estendibilità

1. Aggiungi componente in `src/pages/`
2. Aggiungi route in `src/App.jsx`
3. Crea API in `src/api/`
