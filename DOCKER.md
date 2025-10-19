# Portal Frontend - Docker Compose Guide

Questo repository contiene i file Docker Compose per eseguire il frontend sia standalone che insieme al backend.

> **Nota**: Questo frontend è progettato per lavorare con il [portal-backend](https://github.com/YOUR_USERNAME/portal-backend).
> I file docker-compose in questo repository possono avviare entrambi i servizi se il repository backend è posizionato in `../portal-backend`.

## Profili Disponibili

- `frontend`: Esegue solo il Frontend
- `full`: Esegue DB + Backend + Frontend (richiede che il backend sia clonato in `../portal-backend`)

## Setup Completo per Full Stack

Se vuoi eseguire l'intera applicazione da questo repository:

```bash
# Clona entrambi i repository nella stessa cartella parent
cd /path/to/projects
git clone https://github.com/YOUR_USERNAME/portal-backend.git
git clone https://github.com/YOUR_USERNAME/portal-frontend.git

# Ora puoi usare il profilo full dal frontend
cd portal-frontend
docker compose -f docker-compose.dev.yml --profile full up
```

## Comandi di Avvio

### Development Mode

**Solo Frontend:**
```bash
docker compose -f docker-compose.dev.yml --profile frontend up
# oppure
./start-dev.sh
```
> ⚠️ **Importante**: In modalità standalone, assicurati che il backend sia in esecuzione e raggiungibile all'URL configurato in `VITE_API_URL`

**Full Stack (Backend + Frontend):**
```bash
# Assicurati che portal-backend sia in ../portal-backend
docker compose -f docker-compose.dev.yml --profile full up
```

### Production Mode

**Solo Frontend:**
```bash
docker compose --profile frontend up -d
```

**Full Stack (Backend + Frontend):**
```bash
# Assicurati che portal-backend sia in ../portal-backend
docker compose --profile full up -d
```

## Comandi Utili

**Stop dei servizi:**
```bash
docker compose -f docker-compose.dev.yml --profile frontend down
```

**Rebuild delle immagini:**
```bash
docker compose -f docker-compose.dev.yml --profile frontend up --build
```

**Vedere i logs:**
```bash
docker compose -f docker-compose.dev.yml logs -f frontend
```

**Pulire tutto (inclusi volumi):**
```bash
docker compose -f docker-compose.dev.yml --profile frontend down -v
```

## Variabili d'Ambiente

Crea un file `.env` nella root del progetto:

```env
VITE_API_URL=http://localhost:8000/api/v1
NODE_ENV=development
```

## Architettura

- **Development**: Vite dev server sulla porta 3000 con hot-reload
- **Production**: Nginx serve l'app buildato sulla porta 80 (mappata alla 3000 dell'host)
- **Node Modules**: Volume Docker separato per evitare conflitti con l'host
- **Network**: Tutti i servizi comunicano tramite `portal-network`

## Repository Collegati

- **Backend**: [portal-backend](https://github.com/YOUR_USERNAME/portal-backend)
- **Deployment**: Per deployment completo, usa i docker-compose nella cartella parent che contiene entrambi i repository

## Modalità di Utilizzo

### 1. Solo Frontend (sviluppo UI)
Se stai lavorando solo sull'UI e hai il backend già in esecuzione altrove:
```bash
docker compose -f docker-compose.dev.yml --profile frontend up
```

### 2. Full Stack (sviluppo completo)
Se vuoi tutto l'ambiente completo:
```bash
# Assicurati che ../portal-backend esista
docker compose -f docker-compose.dev.yml --profile full up
```

### 3. Sviluppo Locale (senza Docker)
Se preferisci npm direttamente:
```bash
npm install
npm run dev
```

## Note

- In modalità development, Vite è configurato con hot-reload sulla porta 3000
- I node_modules usano un volume Docker per evitare conflitti con l'host
- In produzione, l'app è servita da nginx sulla porta 80 (mappata alla 3000 dell'host)
- Per eseguire il full stack, il backend deve essere clonato in `../portal-backend` rispetto a questo repository
- Se esegui solo il frontend, assicurati che `VITE_API_URL` punti al backend corretto
