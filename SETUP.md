# LMS Monorepo Setup Guide

## 🚀 Schnellstart

### Voraussetzungen

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker (optional, für Container-Deployment)
- PostgreSQL (für lokale Entwicklung)

### Installation

1. **Dependencies installieren**
   ```bash
   pnpm install
   ```

2. **Umgebungsvariablen konfigurieren**
   ```bash
   # Frontend
   cp apps/frontend/env.example apps/frontend/.env
   
   # Backend
   cp apps/backend/env.example apps/backend/.env
   ```

3. **Entwicklungsumgebung starten**
   ```bash
   pnpm dev
   ```

## 📁 Projektstruktur

```
lms-monorepo/
├── apps/
│   ├── frontend/          # React Frontend (Port 3000)
│   │   ├── src/
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── Dockerfile
│   └── backend/           # NestJS Backend (Port 3001)
│       ├── src/
│       ├── package.json
│       ├── tsconfig.json
│       └── Dockerfile
├── packages/
│   ├── auth/              # Microsoft Authentication
│   ├── workday-api/       # Workday API Integration
│   ├── ui-components/     # Gemeinsame UI-Komponenten
│   └── utils/             # Utility-Funktionen
├── docker-compose.yml     # Docker-Konfiguration
├── package.json           # Root package.json
└── pnpm-workspace.yaml    # Workspace-Konfiguration
```

## 🔧 Konfiguration

### Microsoft Azure AD

1. Registrieren Sie eine neue App in Azure AD
2. Konfigurieren Sie die Redirect URIs
3. Fügen Sie die Client ID und Tenant ID in die .env-Dateien ein

### Workday API

1. Konfigurieren Sie die Workday API Credentials
2. Testen Sie die Verbindung mit dem Workday-Package

### Datenbank

1. PostgreSQL installieren und starten
2. Datenbank `lms` erstellen
3. Verbindungsdaten in `apps/backend/.env` konfigurieren

## 🏃‍♂️ Entwicklung

### Verfügbare Scripts

```bash
# Entwicklung
pnpm dev                    # Startet alle Apps im Dev-Modus
pnpm build                  # Baut alle Packages und Apps
pnpm test                   # Führt Tests aus
pnpm lint                   # Linting

# Docker
pnpm docker:build          # Baut alle Container
pnpm docker:up             # Startet alle Services
pnpm docker:down           # Stoppt alle Services
```

### Frontend entwickeln

```bash
cd apps/frontend
pnpm dev                    # Startet Vite Dev Server
pnpm build                  # Production Build
```

### Backend entwickeln

```bash
cd apps/backend
pnpm dev                    # Startet NestJS mit Hot Reload
pnpm build                  # Production Build
```

## 🐳 Docker Deployment

### Lokale Entwicklung mit Docker

```bash
# Alle Services starten
docker-compose up -d

# Logs anzeigen
docker-compose logs -f

# Services stoppen
docker-compose down
```

### Production Deployment

```bash
# Production Build
docker-compose -f docker-compose.prod.yml up -d
```

## 📚 API Dokumentation

Nach dem Start des Backends ist die Swagger-Dokumentation verfügbar unter:
- http://localhost:3001/api/docs

## 🔐 Authentifizierung

Das System verwendet Microsoft Azure AD für die Authentifizierung:

1. **Frontend**: MSAL.js für Browser-basierte Authentifizierung
2. **Backend**: Passport.js mit Azure AD Strategy
3. **Token**: JWT für API-Authentifizierung

## 🔄 Workday Integration

Die Workday-Integration erfolgt über das `@lms/workday-api` Package:

- **Genehmigungsprozesse**: Automatische Weiterleitung an Manager und LMS-Manager
- **Zertifikate**: Automatischer Upload in Workday-Profil
- **Synchronisation**: Bidirektionale Daten-Synchronisation

## 🧪 Testing

```bash
# Unit Tests
pnpm test

# E2E Tests
pnpm test:e2e

# Coverage Report
pnpm test:cov
```

## 📦 Package Development

### Neues Package erstellen

```bash
mkdir packages/my-package
cd packages/my-package
pnpm init
```

### Package verwenden

```bash
# In package.json
"@lms/my-package": "workspace:*"
```

## 🚀 Production Deployment

### Environment Variables

Stellen Sie sicher, dass alle erforderlichen Umgebungsvariablen gesetzt sind:

- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_TENANT_ID`
- `WORKDAY_*` Variablen
- `DB_*` Variablen
- `JWT_SECRET`

### Build und Deploy

```bash
# Production Build
pnpm build

# Docker Build
docker-compose build

# Deploy
docker-compose up -d
```

## 🐛 Troubleshooting

### Häufige Probleme

1. **Port-Konflikte**: Stellen Sie sicher, dass Ports 3000, 3001, 5432 frei sind
2. **Dependencies**: Führen Sie `pnpm install` erneut aus
3. **Docker**: Löschen Sie alle Container und Images: `docker system prune -a`

### Logs

```bash
# Frontend Logs
docker-compose logs frontend

# Backend Logs
docker-compose logs backend

# Database Logs
docker-compose logs postgres
```

## 📞 Support

Bei Problemen oder Fragen:

1. Überprüfen Sie die Logs
2. Testen Sie die einzelnen Services isoliert
3. Überprüfen Sie die Umgebungsvariablen
4. Stellen Sie sicher, dass alle Dependencies installiert sind 