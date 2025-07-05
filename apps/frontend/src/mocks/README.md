# Mock-Daten für LMS Frontend

Diese Dateien enthalten umfassende Mock-Daten für die Entwicklung des LMS-Frontends.

## 📁 Dateien

### `data.ts`
Enthält alle Mock-Daten und Interfaces:
- **User**: Benutzerprofile mit Avatar, Abteilung, Position
- **Training**: Schulungen mit Details, Kategorien, Status
- **TrainingRegistration**: Anmeldungen mit Genehmigungsstatus
- **Certificate**: Zertifikate mit Workday-Integration
- **Notification**: Benachrichtigungen für verschiedene Events

### `mockApi.ts`
Mock-API-Service der echte API-Calls simuliert:
- Async/await mit Verzögerungen
- Error-Handling
- Realistische Datenstrukturen
- Hilfsfunktionen für Filterung und Suche

## 🎯 Verwendung

### In Komponenten
```typescript
import { useCurrentUser, useTrainings } from '../hooks/useApi';

function MyComponent() {
  const { data: user, isLoading } = useCurrentUser();
  const { data: trainings } = useTrainings({ category: 'Frontend' });
  
  // Verwendung der Daten...
}
```

### Direkte Mock-Daten
```typescript
import { mockTrainings, getMockUser } from '../mocks/data';

const user = getMockUser('1');
const frontendTrainings = mockTrainings.filter(t => t.category === 'Frontend');
```

## 📊 Datenstrukturen

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  managerId?: string;
  position: string;
  avatar?: string;
  joinDate: string;
}
```

### Training
```typescript
interface Training {
  id: string;
  title: string;
  description: string;
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Security' | 'Soft Skills';
  date: string;
  duration: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  provider: string;
  status: 'available' | 'full' | 'registered' | 'completed' | 'cancelled';
  tags: string[];
  requirements?: string[];
  learningObjectives: string[];
}
```

### TrainingRegistration
```typescript
interface TrainingRegistration {
  id: string;
  trainingId: string;
  userId: string;
  registrationDate: string;
  status: 'pending_manager' | 'pending_lms' | 'approved' | 'rejected' | 'cancelled';
  managerId?: string;
  lmsManagerId?: string;
  rejectionReason?: string;
  comments?: string;
}
```

## 🔄 Genehmigungsprozess

1. **pending_manager**: Anmeldung wartet auf Manager-Genehmigung
2. **pending_lms**: Anmeldung wartet auf LMS-Manager-Genehmigung
3. **approved**: Anmeldung genehmigt
4. **rejected**: Anmeldung abgelehnt
5. **cancelled**: Anmeldung storniert

## 🎨 Mock-Daten Features

- **Realistische Daten**: Echte Namen, E-Mails, Beschreibungen
- **Verschiedene Status**: Alle möglichen Zustände abgedeckt
- **Kategorien**: Frontend, Backend, DevOps, Security, Soft Skills
- **Preise**: Realistische Schulungskosten
- **Daten**: Zukünftige und vergangene Termine
- **Anbieter**: Verschiedene Schulungsanbieter
- **Tags**: Technologie-spezifische Tags
- **Anforderungen**: Voraussetzungen für Schulungen
- **Lernziele**: Konkrete Lernziele für jede Schulung

## 🚀 Entwicklung

Die Mock-Daten sind so strukturiert, dass sie später einfach durch echte API-Calls ersetzt werden können. Die React Query Hooks abstrahieren die Datenquelle, sodass nur die `mockApi.ts` angepasst werden muss. 