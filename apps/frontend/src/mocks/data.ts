// Mock-Daten für das LMS Frontend - KFZ/NFZ/Trailer Schulungen

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: 'employee' | 'manager' | 'lms_manager';
  managerId?: string;
  position: string;
  avatar?: string;
  joinDate: string;
  country: string;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  category: 'Elektrik' | 'Bremsen' | 'Führerschein' | 'Sicherheit' | 'Wartung' | 'Spezial';
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
  createdBy?: string; // LMS Manager ID
}

export interface TrainingRegistration {
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

export interface Certificate {
  id: string;
  userId: string;
  trainingId: string;
  title: string;
  issueDate: string;
  expiryDate?: string;
  fileUrl?: string;
  workdayStatus: 'pending' | 'uploaded' | 'verified';
  certificateNumber?: string;
  issuer: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'registration' | 'approval' | 'rejection' | 'reminder' | 'certificate';
  title: string;
  message: string;
  date: string;
  read: boolean;
  actionUrl?: string;
}

// Mock-Benutzer
export const mockUsers: User[] = [
  // Normale Mitarbeiter (Mechaniker)
  {
    id: '1',
    name: 'Klaus Müller',
    email: 'klaus.mueller@company.com',
    department: 'Wartung',
    role: 'employee',
    position: 'KFZ-Mechaniker',
    managerId: '5',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    joinDate: '2022-01-15',
    country: 'Germany',
  },
  {
    id: '2',
    name: 'Hans Weber',
    email: 'hans.weber@company.com',
    department: 'Wartung',
    role: 'employee',
    position: 'NFZ-Mechaniker',
    managerId: '5',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinDate: '2021-06-20',
    country: 'Germany',
  },
  {
    id: '3',
    name: 'Peter Schmidt',
    email: 'peter.schmidt@company.com',
    department: 'Wartung',
    role: 'employee',
    position: 'Elektriker',
    managerId: '6',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinDate: '2020-03-10',
    country: 'Germany',
  },
  {
    id: '4',
    name: 'Michael Fischer',
    email: 'michael.fischer@company.com',
    department: 'Wartung',
    role: 'employee',
    position: 'Kältetechniker',
    managerId: '6',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinDate: '2021-09-15',
    country: 'Germany',
  },
  // Manager
  {
    id: '5',
    name: 'Thomas Wagner',
    email: 'thomas.wagner@company.com',
    department: 'Wartung',
    role: 'manager',
    position: 'Wartungsleiter NFZ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinDate: '2019-11-05',
    country: 'Germany',
  },
  {
    id: '6',
    name: 'Andreas Meyer',
    email: 'andreas.meyer@company.com',
    department: 'Wartung',
    role: 'manager',
    position: 'Wartungsleiter KFZ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinDate: '2018-06-12',
    country: 'Germany',
  },
  // LMS Manager
  {
    id: '7',
    name: 'Sarah Müller',
    email: 'sarah.mueller@company.com',
    department: 'HR',
    role: 'lms_manager',
    position: 'LMS Manager',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    joinDate: '2019-11-05',
    country: 'Germany',
  },
  {
    id: '8',
    name: 'Lisa Hoffmann',
    email: 'lisa.hoffmann@company.com',
    department: 'HR',
    role: 'lms_manager',
    position: 'LMS Administrator',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    joinDate: '2020-08-20',
    country: 'Germany',
  },
  // Österreich
  {
    id: '9',
    name: 'Franz Huber',
    email: 'franz.huber@company.at',
    department: 'Wartung',
    role: 'employee',
    position: 'KFZ-Mechaniker',
    managerId: '10',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinDate: '2021-03-15',
    country: 'Austria',
  },
  {
    id: '10',
    name: 'Maria Schmidt',
    email: 'maria.schmidt@company.at',
    department: 'Wartung',
    role: 'manager',
    position: 'Wartungsleiter',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    joinDate: '2018-09-10',
    country: 'Austria',
  },
  {
    id: '11',
    name: 'Wolfgang Bauer',
    email: 'wolfgang.bauer@company.at',
    department: 'Wartung',
    role: 'employee',
    position: 'NFZ-Mechaniker',
    managerId: '10',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinDate: '2022-01-20',
    country: 'Austria',
  },
  // Schweiz
  {
    id: '12',
    name: 'Hans Müller',
    email: 'hans.mueller@company.ch',
    department: 'Wartung',
    role: 'employee',
    position: 'KFZ-Mechaniker',
    managerId: '13',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinDate: '2020-11-05',
    country: 'Switzerland',
  },
  {
    id: '13',
    name: 'Anna Weber',
    email: 'anna.weber@company.ch',
    department: 'Wartung',
    role: 'manager',
    position: 'Wartungsleiterin',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    joinDate: '2019-06-15',
    country: 'Switzerland',
  },
  {
    id: '14',
    name: 'Peter Fischer',
    email: 'peter.fischer@company.ch',
    department: 'Wartung',
    role: 'employee',
    position: 'Elektriker',
    managerId: '13',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinDate: '2021-08-12',
    country: 'Switzerland',
  },
  // Niederlande
  {
    id: '15',
    name: 'Jan de Vries',
    email: 'jan.devries@company.nl',
    department: 'Wartung',
    role: 'employee',
    position: 'KFZ-Mechaniker',
    managerId: '16',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinDate: '2021-05-20',
    country: 'Netherlands',
  },
  {
    id: '16',
    name: 'Marieke van der Berg',
    email: 'marieke.vanderberg@company.nl',
    department: 'Wartung',
    role: 'manager',
    position: 'Wartungsleiter',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    joinDate: '2018-12-03',
    country: 'Netherlands',
  },
  {
    id: '17',
    name: 'Pieter Bakker',
    email: 'pieter.bakker@company.nl',
    department: 'Wartung',
    role: 'employee',
    position: 'NFZ-Mechaniker',
    managerId: '16',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinDate: '2022-03-10',
    country: 'Netherlands',
  },
  // Belgien
  {
    id: '18',
    name: 'Jean Dupont',
    email: 'jean.dupont@company.be',
    department: 'Wartung',
    role: 'employee',
    position: 'KFZ-Mechaniker',
    managerId: '19',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinDate: '2021-09-15',
    country: 'Belgium',
  },
  {
    id: '19',
    name: 'Sophie Martin',
    email: 'sophie.martin@company.be',
    department: 'Wartung',
    role: 'manager',
    position: 'Chef de Maintenance',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    joinDate: '2019-04-22',
    country: 'Belgium',
  },
  {
    id: '20',
    name: 'Lucas Van Damme',
    email: 'lucas.vandamme@company.be',
    department: 'Wartung',
    role: 'employee',
    position: 'NFZ-Mechaniker',
    managerId: '19',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinDate: '2022-02-08',
    country: 'Belgium',
  },
];

// Mock-Schulungen - KFZ/NFZ/Trailer Fokus
export const mockTrainings: Training[] = [
  {
    id: '1',
    title: 'Elektrik-Systeme NFZ & Trailer',
    description: 'Grundlagen und erweiterte Kenntnisse der Elektrik-Systeme in Nutzfahrzeugen und Trailern. Beleuchtung, Bremsen, ABS/ESP, CAN-Bus Systeme.',
    category: 'Elektrik',
    date: '2024-02-15',
    duration: '2 Tage',
    location: 'Schulungszentrum Bremen',
    maxParticipants: 15,
    currentParticipants: 12,
    price: 850,
    provider: 'DEKRA Akademie',
    status: 'available',
    tags: ['Elektrik', 'NFZ', 'Trailer', 'CAN-Bus', 'ABS'],
    requirements: ['Grundkenntnisse KFZ-Technik', 'Elektrik-Basiswissen'],
    learningObjectives: [
      'Elektrische Systeme in NFZ und Trailern',
      'CAN-Bus Diagnose und Fehlerbehebung',
      'ABS/ESP Systeme und Wartung',
      'Beleuchtungssysteme und Kontrollen'
    ],
    createdBy: '7',
  },
  {
    id: '2',
    title: 'Knorr-Bremsen Systeme',
    description: 'Spezialschulung für Knorr-Bremsen Systeme. Wartung, Reparatur und Diagnose von Luftbremsanlagen in Nutzfahrzeugen.',
    category: 'Bremsen',
    date: '2024-02-20',
    duration: '1 Tag',
    location: 'Knorr-Bremse Schulungszentrum',
    maxParticipants: 12,
    currentParticipants: 12,
    price: 650,
    provider: 'Knorr-Bremse AG',
    status: 'full',
    tags: ['Knorr', 'Bremsen', 'Luftbremse', 'NFZ'],
    requirements: ['KFZ-Mechaniker Ausbildung', 'Luftbremse Grundkenntnisse'],
    learningObjectives: [
      'Knorr-Bremsen Systeme Übersicht',
      'Luftbremse Wartung und Einstellung',
      'Diagnose von Bremsproblemen',
      'Sicherheitsrichtlinien bei Bremsarbeiten'
    ],
    createdBy: '7',
  },
  {
    id: '3',
    title: 'Schmitz Cargobull Trailer Schulung',
    description: 'Spezielle Schulung für Schmitz Cargobull Trailer. Aufbau, Wartung und Reparatur von Kühl- und Trockentrailern.',
    category: 'Spezial',
    date: '2024-02-25',
    duration: '3 Tage',
    location: 'Schmitz Cargobull Academy',
    maxParticipants: 10,
    currentParticipants: 8,
    price: 1200,
    provider: 'Schmitz Cargobull',
    status: 'registered',
    tags: ['Schmitz', 'Trailer', 'Kühlung', 'Cargobull'],
    requirements: ['Trailer-Erfahrung', 'Kältetechnik Grundkenntnisse'],
    learningObjectives: [
      'Schmitz Cargobull Trailer Aufbau',
      'Kühlaggregate und Temperaturregelung',
      'Wartung und Reparatur von Kühltrailern',
      'Sicherheitsrichtlinien und Unfallverhütung'
    ],
    createdBy: '8',
  },
  {
    id: '4',
    title: 'Stapler-Führerschein Gabelstapler',
    description: 'Ausbildung zum Gabelstapler-Führerschein nach DGUV Vorschrift 68. Theorie und Praxis für sicheren Umgang mit Flurförderzeugen.',
    category: 'Führerschein',
    date: '2024-01-30',
    duration: '5 Tage',
    location: 'Firmengelände - Logistikzentrum',
    maxParticipants: 8,
    currentParticipants: 8,
    price: 450,
    provider: 'TÜV Süd',
    status: 'completed',
    tags: ['Stapler', 'Führerschein', 'DGUV', 'Flurförderzeuge'],
    requirements: ['Mindestalter 18 Jahre', 'Gute Deutschkenntnisse'],
    learningObjectives: [
      'Theoretische Grundlagen Flurförderzeuge',
      'Praktische Fahrübungen und Sicherheit',
      'Lastaufnahme und -transport',
      'Unfallverhütung und Erste Hilfe'
    ],
    createdBy: '7',
  },
  {
    id: '5',
    title: 'ADR Gefahrgut Transport',
    description: 'ADR-Schulung für den Transport gefährlicher Güter. Theorie und Praxis für sicheren Gefahrguttransport mit NFZ.',
    category: 'Sicherheit',
    date: '2024-03-10',
    duration: '2 Tage',
    location: 'DEKRA Akademie Hamburg',
    maxParticipants: 20,
    currentParticipants: 15,
    price: 750,
    provider: 'DEKRA Akademie',
    status: 'available',
    tags: ['ADR', 'Gefahrgut', 'Transport', 'Sicherheit'],
    requirements: ['C/CE Führerschein', 'Sauberes Führungszeugnis'],
    learningObjectives: [
      'ADR Vorschriften und Klassifizierung',
      'Verpackung und Kennzeichnung',
      'Sicherheitsmaßnahmen und Notfallverhalten',
      'Dokumentation und Transportpapiere'
    ],
    createdBy: '8',
  },
  {
    id: '6',
    title: 'Wartung und Pflege NFZ',
    description: 'Grundlagen der Wartung und Pflege von Nutzfahrzeugen. Inspektionen, Ölwechsel, Filter und vorbeugende Wartung.',
    category: 'Wartung',
    date: '2024-03-15',
    duration: '1 Tag',
    location: 'Werkstatt Hauptstandort',
    maxParticipants: 15,
    currentParticipants: 10,
    price: 350,
    provider: 'Interne Schulung',
    status: 'available',
    tags: ['Wartung', 'NFZ', 'Inspektion', 'Pflege'],
    requirements: ['Grundkenntnisse KFZ-Technik'],
    learningObjectives: [
      'Wartungsintervalle und Checklisten',
      'Ölwechsel und Filterwechsel',
      'Inspektion von Bremsen und Reifen',
      'Dokumentation und Wartungshistorie'
    ],
    createdBy: '7',
  },
  {
    id: '7',
    title: 'Kühlaggregat Thermo King',
    description: 'Spezialschulung für Thermo King Kühlaggregate. Wartung, Reparatur und Optimierung von Kühlanlagen in Kühltrailern.',
    category: 'Spezial',
    date: '2024-03-20',
    duration: '2 Tage',
    location: 'Thermo King Service Center',
    maxParticipants: 12,
    currentParticipants: 6,
    price: 950,
    provider: 'Thermo King',
    status: 'available',
    tags: ['Thermo King', 'Kühlung', 'Kühltrailer', 'Kältetechnik'],
    requirements: ['Kältetechnik Grundkenntnisse', 'Elektrik-Basiswissen'],
    learningObjectives: [
      'Thermo King Kühlaggregate Aufbau',
      'Kältemittelkreislauf und Komponenten',
      'Diagnose und Fehlerbehebung',
      'Energieoptimierung und Wartung'
    ],
    createdBy: '8',
  },
  {
    id: '8',
    title: 'Digitale Tachograph Schulung',
    description: 'Schulung für digitale Tachographen und Fahrtenschreiber. Bedienung, Auswertung und gesetzliche Vorgaben.',
    category: 'Sicherheit',
    date: '2024-03-25',
    duration: '1 Tag',
    location: 'Online (Webinar)',
    maxParticipants: 25,
    currentParticipants: 18,
    price: 250,
    provider: 'VDO Schulungszentrum',
    status: 'available',
    tags: ['Tachograph', 'Digital', 'Fahrtenschreiber', 'Compliance'],
    requirements: ['C/CE Führerschein'],
    learningObjectives: [
      'Digitale Tachographen Bedienung',
      'Auswertung und Dokumentation',
      'Gesetzliche Vorgaben und Kontrollen',
      'Datenschutz und DSGVO'
    ],
    createdBy: '7',
  },
];

// Mock-Anmeldungen
export const mockRegistrations: TrainingRegistration[] = [
  {
    id: '1',
    trainingId: '3',
    userId: '2',
    registrationDate: '2024-01-15',
    status: 'pending_manager',
    managerId: '5',
    comments: 'Interesse an Schmitz Cargobull Trailer Schulung',
  },
  {
    id: '2',
    trainingId: '1',
    userId: '1',
    registrationDate: '2024-01-10',
    status: 'approved',
    managerId: '5',
    lmsManagerId: '7',
  },
  {
    id: '3',
    trainingId: '5',
    userId: '2',
    registrationDate: '2024-01-20',
    status: 'pending_lms',
    managerId: '5',
    lmsManagerId: '7',
  },
];

// Mock-Zertifikate
export const mockCertificates: Certificate[] = [
  {
    id: '1',
    userId: '1',
    trainingId: '4',
    title: 'Stapler-Führerschein Gabelstapler',
    issueDate: '2024-01-30',
    expiryDate: '2026-01-30',
    fileUrl: '/certificates/stapler-fuehrerschein.pdf',
    workdayStatus: 'uploaded',
    certificateNumber: 'CERT-2024-001',
    issuer: 'TÜV Süd',
  },
  {
    id: '2',
    userId: '2',
    trainingId: '2',
    title: 'Knorr-Bremsen Systeme',
    issueDate: '2023-11-20',
    expiryDate: '2025-11-20',
    fileUrl: '/certificates/knorr-bremsen.pdf',
    workdayStatus: 'verified',
    certificateNumber: 'CERT-2023-045',
    issuer: 'Knorr-Bremse AG',
  },
  {
    id: '3',
    userId: '1',
    trainingId: '6',
    title: 'Wartung und Pflege NFZ',
    issueDate: '2023-09-15',
    fileUrl: '/certificates/wartung-nfz.pdf',
    workdayStatus: 'uploaded',
    certificateNumber: 'CERT-2023-032',
    issuer: 'Interne Schulung',
  },
];

// Mock-Benachrichtigungen
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '2',
    type: 'registration',
    title: 'Anmeldung bestätigt',
    message: 'Ihre Anmeldung für "Schmitz Cargobull Trailer Schulung" wurde an Ihren Manager weitergeleitet.',
    date: '2024-01-15T10:30:00Z',
    read: false,
    actionUrl: '/trainings',
  },
  {
    id: '2',
    userId: '1',
    type: 'approval',
    title: 'Schulung genehmigt',
    message: 'Ihre Anmeldung für "Elektrik-Systeme NFZ & Trailer" wurde genehmigt. Die Schulung beginnt am 15.02.2024.',
    date: '2024-01-12T14:15:00Z',
    read: true,
    actionUrl: '/profile',
  },
  {
    id: '3',
    userId: '2',
    type: 'reminder',
    title: 'Zertifikat läuft ab',
    message: 'Ihr Zertifikat "Knorr-Bremsen Systeme" läuft am 20.11.2024 ab. Erwägen Sie eine Auffrischung.',
    date: '2024-01-18T09:00:00Z',
    read: false,
    actionUrl: '/profile',
  },
];

// Mock-Dashboard-Statistiken
export const mockDashboardStats = {
  activeTrainings: 3,
  pendingApprovals: 2,
  completedTrainings: 12,
  expiringCertificates: 1,
  totalCertificates: 8,
  upcomingTrainings: 4,
};

// Mock-Kategorien für Filter
export const mockCategories = [
  { id: 'all', name: 'Alle Kategorien', count: mockTrainings.length },
  { id: 'Elektrik', name: 'Elektrik', count: mockTrainings.filter(t => t.category === 'Elektrik').length },
  { id: 'Bremsen', name: 'Bremsen', count: mockTrainings.filter(t => t.category === 'Bremsen').length },
  { id: 'Führerschein', name: 'Führerschein', count: mockTrainings.filter(t => t.category === 'Führerschein').length },
  { id: 'Sicherheit', name: 'Sicherheit', count: mockTrainings.filter(t => t.category === 'Sicherheit').length },
  { id: 'Wartung', name: 'Wartung', count: mockTrainings.filter(t => t.category === 'Wartung').length },
  { id: 'Spezial', name: 'Spezial', count: mockTrainings.filter(t => t.category === 'Spezial').length },
];

// Hilfsfunktionen für Mock-Daten
export const getMockUser = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};

export const getMockTraining = (trainingId: string): Training | undefined => {
  return mockTrainings.find(training => training.id === trainingId);
};

export const getMockUserRegistrations = (userId: string): TrainingRegistration[] => {
  return mockRegistrations.filter(registration => registration.userId === userId);
};

export const getMockUserCertificates = (userId: string): Certificate[] => {
  return mockCertificates.filter(certificate => certificate.userId === userId);
};

export const getMockUserNotifications = (userId: string): Notification[] => {
  return mockNotifications.filter(notification => notification.userId === userId);
};

export const getMockTrainingsByCategory = (category: string): Training[] => {
  if (category === 'all') return mockTrainings;
  return mockTrainings.filter(training => training.category === category);
};

export const getMockTrainingsByStatus = (status: string): Training[] => {
  return mockTrainings.filter(training => training.status === status);
}; 