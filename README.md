# Portal Frontend

Modern React frontend with Material-UI and Titillium Web font.

> **Note**: This frontend works with [portal-backend](https://github.com/freedurok/portal-backend). Clone both repos in the same parent folder for full stack mode.

## Features

- ⚛️ React 18 with Vite
- 🎨 Material-UI components
- 🔐 JWT authentication
- 🌐 i18n (Italian/English)
- 🐳 Docker with hot-reload

## Quick Start

```bash
# Clone the repository
git clone https://github.com/freedurok/portal-frontend.git
cd portal-frontend

# Using Docker (recommended)
docker compose -f docker-compose.dev.yml --profile frontend up

# Or local development
npm install
npm run dev
```

## Docker Profiles

- `frontend`: Frontend only (backend must run separately)
- `full`: Frontend + Backend + Database (requires backend in `../portal-backend`)

```bash
# Frontend only
./start-dev.sh

# Full stack (both repos needed)
docker compose -f docker-compose.dev.yml --profile full up
```

## Data Paths

Default paths use `/tmp/portal-data/` (⚠️ may be deleted on reboot).

**For production**, edit `docker-compose.yml` and change:
```yaml
volumes:
  - /tmp/portal-data/postgres → /var/lib/portal-data/postgres
  - /tmp/portal-data/uploads → /var/lib/portal-data/uploads
```

## Environment

Create `.env`:
```env
VITE_API_URL=http://localhost:8000/api/v1
NODE_ENV=development
```

## URLs

- Development: http://localhost:3000
- Backend API: http://localhost:8000/docs

## Related

- **Backend**: [portal-backend](https://github.com/freedurok/portal-backend)

## License

See LICENSE file.
