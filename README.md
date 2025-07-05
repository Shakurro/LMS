# LMS - Learning Management System

Ein modernes Learning Management System mit React-Frontend und NestJS-Backend, entwickelt als Monorepo mit pnpm Workspaces.

## 🚀 Features

- **React Frontend**: Moderne Benutzeroberfläche für Mitarbeiter
- **NestJS Backend**: Robuste API für Anmeldungen und Dokumentenverwaltung
- **Microsoft Authentication**: Login über Microsoft-Konten
- **Workday Integration**: Genehmigungsprozesse über Workday APIs
- **Docker Support**: Einfache Deployment- und Wartungsmöglichkeiten
- **Modulare Architektur**: Gemeinsame Libraries für Authentifizierung, UI-Komponenten und Utilities

## 📁 Projektstruktur

```
lms-monorepo/
├── apps/
│   ├── frontend/          # React Frontend
│   └── backend/           # NestJS Backend
├── packages/
│   ├── auth/              # Authentifizierung Library
│   ├── workday-api/       # Workday API Integration
│   ├── ui-components/     # Gemeinsame UI-Komponenten
│   └── utils/             # Utility-Funktionen
├── docker-compose.yml     # Docker-Konfiguration
└── package.json           # Root package.json
```

## 🛠️ Installation

### Voraussetzungen

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker (optional, für Container-Deployment)

### Setup

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd lms-monorepo
   ```

2. **Dependencies installieren**
   ```bash
   pnpm install
   ```

3. **Entwicklungsumgebung starten**
   ```bash
   pnpm dev
   ```

## 🏃‍♂️ Entwicklung

### Verfügbare Scripts

- `pnpm dev` - Startet alle Apps im Entwicklungsmodus
- `pnpm build` - Baut alle Packages und Apps
- `pnpm test` - Führt Tests in allen Packages aus
- `pnpm lint` - Führt Linting in allen Packages aus
- `pnpm clean` - Bereinigt alle Build-Artefakte

### Docker Deployment

```bash
# Container bauen und starten
pnpm docker:build
pnpm docker:up

# Container stoppen
pnpm docker:down
```

## 🔧 Konfiguration

### Umgebungsvariablen

Erstellen Sie `.env` Dateien in den jeweiligen App-Verzeichnissen:

- `apps/frontend/.env`
- `apps/backend/.env`

### Workday API Konfiguration

Die Workday API Integration erfordert entsprechende Credentials und Endpoints, die in der `packages/workday-api` Library konfiguriert werden.

## 📚 Dokumentation

- [Frontend Dokumentation](./apps/frontend/README.md)
- [Backend API Dokumentation](./apps/backend/README.md)
- [Package Dokumentation](./packages/)

## 🤝 Beitragen

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/amazing-feature`)
3. Committe deine Änderungen (`git commit -m 'Add amazing feature'`)
4. Push zum Branch (`git push origin feature/amazing-feature`)
5. Öffne einen Pull Request

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. 