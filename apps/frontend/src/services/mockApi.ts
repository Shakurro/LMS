import {
  mockUsers,
  mockTrainings,
  mockRegistrations,
  mockCertificates,
  mockNotifications,
  mockDashboardStats,
  mockCategories,
  mockFeedbacks,
  getMockUser,
  getMockTraining,
  getMockUserRegistrations,
  getMockUserCertificates,
  getMockUserNotifications,
  getMockTrainingsByCategory,
  getMockTrainingsByStatus,
  type User,
  type Training,
  type TrainingRegistration,
  type Certificate,
  type Notification,
  type TrainingFeedback,
} from '../mocks/data';

// Simuliere API-Verzögerung
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API Service
export class MockApiService {
  // Benutzer
  async getCurrentUser(): Promise<User> {
    await delay(300);
    return mockUsers[0]; // Max Mustermann als aktueller Benutzer
  }

  async getUserById(userId: string): Promise<User | null> {
    await delay(200);
    const user = getMockUser(userId);
    return user || null;
  }

  // Schulungen
  async getTrainings(category?: string, status?: string): Promise<Training[]> {
    await delay(400);
    let filteredTrainings = mockTrainings;

    if (category && category !== 'all') {
      filteredTrainings = getMockTrainingsByCategory(category);
    }

    if (status) {
      filteredTrainings = filteredTrainings.filter(t => t.status === status);
    }

    return filteredTrainings;
  }

  async getTrainingById(trainingId: string): Promise<Training | null> {
    await delay(200);
    const training = getMockTraining(trainingId);
    return training || null;
  }

  async getAvailableTrainings(): Promise<Training[]> {
    await delay(300);
    return getMockTrainingsByStatus('available');
  }

  async getRegisteredTrainings(userId: string): Promise<Training[]> {
    await delay(300);
    const userRegistrations = getMockUserRegistrations(userId);
    const registeredTrainingIds = userRegistrations.map(r => r.trainingId);
    return mockTrainings.filter(t => registeredTrainingIds.includes(t.id));
  }

  // Anmeldungen
  async registerForTraining(userId: string, trainingId: string, comments?: string): Promise<TrainingRegistration> {
    await delay(500);
    
    const newRegistration: TrainingRegistration = {
      id: `reg_${Date.now()}`,
      trainingId,
      userId,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'pending_manager',
      managerId: getMockUser(userId)?.managerId,
      comments,
    };

    // In einer echten App würde dies in der Datenbank gespeichert
    console.log('Neue Anmeldung:', newRegistration);
    
    return newRegistration;
  }

  async getUserRegistrations(userId: string): Promise<TrainingRegistration[]> {
    await delay(300);
    return getMockUserRegistrations(userId);
  }

  async cancelRegistration(registrationId: string): Promise<boolean> {
    await delay(400);
    console.log('Anmeldung storniert:', registrationId);
    return true;
  }

  // Zertifikate
  async getUserCertificates(userId: string): Promise<Certificate[]> {
    await delay(300);
    return getMockUserCertificates(userId);
  }

  async uploadCertificate(
    userId: string,
    trainingId: string,
    file: File,
    certificateData: Partial<Certificate>
  ): Promise<Certificate> {
    await delay(1000); // Simuliere Upload-Zeit
    
    const newCertificate: Certificate = {
      id: `cert_${Date.now()}`,
      userId,
      trainingId,
      title: certificateData.title || 'Zertifikat',
      issueDate: new Date().toISOString().split('T')[0],
      fileUrl: `/certificates/${file.name}`,
      workdayStatus: 'pending',
      issuer: certificateData.issuer || 'Externer Anbieter',
      ...certificateData,
    };

    console.log('Zertifikat hochgeladen:', newCertificate);
    return newCertificate;
  }

  // Benachrichtigungen
  async getUserNotifications(userId: string): Promise<Notification[]> {
    await delay(200);
    return getMockUserNotifications(userId);
  }

  async markNotificationAsRead(notificationId: string): Promise<boolean> {
    await delay(200);
    console.log('Benachrichtigung als gelesen markiert:', notificationId);
    return true;
  }

  async markAllNotificationsAsRead(userId: string): Promise<boolean> {
    await delay(300);
    console.log('Alle Benachrichtigungen als gelesen markiert für User:', userId);
    return true;
  }

  // Dashboard
  async getDashboardStats(userId: string): Promise<typeof mockDashboardStats> {
    await delay(400);
    return mockDashboardStats;
  }

  async getUpcomingTrainings(userId: string): Promise<Training[]> {
    await delay(300);
    const userRegistrations = getMockUserRegistrations(userId);
    const approvedRegistrationIds = userRegistrations
      .filter(r => r.status === 'approved')
      .map(r => r.trainingId);
    
    return mockTrainings.filter(t => 
      approvedRegistrationIds.includes(t.id) && 
      new Date(t.date) > new Date()
    );
  }

  // Kategorien
  async getCategories(): Promise<typeof mockCategories> {
    await delay(200);
    return mockCategories;
  }

  // Suche
  async searchTrainings(query: string): Promise<Training[]> {
    await delay(300);
    const lowercaseQuery = query.toLowerCase();
    
    return mockTrainings.filter(training =>
      training.title.toLowerCase().includes(lowercaseQuery) ||
      training.description.toLowerCase().includes(lowercaseQuery) ||
      training.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      training.provider.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Statistiken
  async getTrainingStats(): Promise<{
    total: number;
    available: number;
    full: number;
    completed: number;
    byCategory: Record<string, number>;
    categoryStats: Array<{ name: string; count: number }>;
    approvalStats: {
      approved: number;
      pending: number;
      rejected: number;
    };
    costStats: {
      totalSpent: number;
      averagePerTraining: number;
      averagePerParticipant: number;
    };
    topTrainings: Array<{
      id: string;
      title: string;
      category: string;
      participantCount: number;
      completionRate: number;
    }>;
  }> {
    await delay(300);
    
    const byCategory = mockTrainings.reduce((acc, training) => {
      acc[training.category] = (acc[training.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const categoryStats = Object.entries(byCategory).map(([name, count]) => ({
      name,
      count,
    }));

    // Mock approval stats
    const approvalStats = {
      approved: 15,
      pending: 8,
      rejected: 3,
    };

    // Mock cost stats
    const totalSpent = mockTrainings.reduce((sum, t) => sum + (t.price * t.currentParticipants), 0);
    const costStats = {
      totalSpent,
      averagePerTraining: Math.round(totalSpent / mockTrainings.length),
      averagePerParticipant: Math.round(totalSpent / mockTrainings.reduce((sum, t) => sum + t.currentParticipants, 0)),
    };

    // Mock top trainings
    const topTrainings = mockTrainings
      .slice(0, 5)
      .map(training => ({
        id: training.id,
        title: training.title,
        category: training.category,
        participantCount: training.currentParticipants,
        completionRate: Math.round((training.currentParticipants / training.maxParticipants) * 100),
      }));

    return {
      total: mockTrainings.length,
      available: mockTrainings.filter(t => t.status === 'available').length,
      full: mockTrainings.filter(t => t.status === 'full').length,
      completed: mockTrainings.filter(t => t.status === 'completed').length,
      byCategory,
      categoryStats,
      approvalStats,
      costStats,
      topTrainings,
    };
  }

  // Mitarbeiter-Überwachung für LMS Manager
  async getAllEmployees(): Promise<User[]> {
    await delay(400);
    // Alle Benutzer zurückgeben (außer Admins für normale Ansicht)
    return mockUsers.filter(user => user.role !== 'admin');
  }

  async getAllUsers(): Promise<User[]> {
    await delay(400);
    // Alle Benutzer inklusive Admins für Admin-Ansicht
    return mockUsers;
  }

  async getEmployeeStats(userId: string): Promise<{
    totalTrainings: number;
    completedTrainings: number;
    activeTrainings: number;
    pendingApprovals: number;
    certificates: number;
    expiringCertificates: number;
    completionRate: number;
    lastTrainingDate?: string;
    upcomingTrainings: Training[];
    recentCertificates: Certificate[];
  }> {
    await delay(300);
    
    const userRegistrations = getMockUserRegistrations(userId);
    const userCertificates = getMockUserCertificates(userId);
    
    const totalTrainings = userRegistrations.length;
    const completedTrainings = userRegistrations.filter(r => r.status === 'approved').length;
    const activeTrainings = userRegistrations.filter(r => r.status === 'pending_manager' || r.status === 'pending_lms').length;
    const pendingApprovals = userRegistrations.filter(r => r.status === 'pending_manager' || r.status === 'pending_lms').length;
    const certificates = userCertificates.length;
    const expiringCertificates = userCertificates.filter(c => {
      if (!c.expiryDate) return false;
      const expiryDate = new Date(c.expiryDate);
      const now = new Date();
      const daysUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      return daysUntilExpiry <= 90 && daysUntilExpiry > 0; // Läuft in den nächsten 90 Tagen ab
    }).length;
    
    const completionRate = totalTrainings > 0 ? Math.round((completedTrainings / totalTrainings) * 100) : 0;
    
    const lastTrainingDate = userRegistrations.length > 0 
      ? userRegistrations.sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime())[0].registrationDate
      : undefined;
    
    const upcomingTrainings = userRegistrations
      .filter(r => r.status === 'approved')
      .map(r => getMockTraining(r.trainingId))
      .filter((t): t is Training => t !== undefined && new Date(t.date) > new Date())
      .slice(0, 3);
    
    const recentCertificates = userCertificates
      .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
      .slice(0, 3);
    
    return {
      totalTrainings,
      completedTrainings,
      activeTrainings,
      pendingApprovals,
      certificates,
      expiringCertificates,
      completionRate,
      lastTrainingDate,
      upcomingTrainings,
      recentCertificates,
    };
  }

  async getEmployeeDetails(userId: string): Promise<{
    user: User;
    registrations: TrainingRegistration[];
    certificates: Certificate[];
    notifications: Notification[];
    stats: {
      totalTrainings: number;
      completedTrainings: number;
      activeTrainings: number;
      pendingApprovals: number;
      certificates: number;
      expiringCertificates: number;
      completionRate: number;
    };
  }> {
    await delay(400);
    
    const user = getMockUser(userId);
    if (!user) {
      throw new Error('Benutzer nicht gefunden');
    }
    
    const registrations = getMockUserRegistrations(userId);
    const certificates = getMockUserCertificates(userId);
    const notifications = getMockUserNotifications(userId);
    
    const totalTrainings = registrations.length;
    const completedTrainings = registrations.filter(r => r.status === 'approved').length;
    const activeTrainings = registrations.filter(r => r.status === 'pending_manager' || r.status === 'pending_lms').length;
    const pendingApprovals = registrations.filter(r => r.status === 'pending_manager' || r.status === 'pending_lms').length;
    const expiringCertificates = certificates.filter(c => {
      if (!c.expiryDate) return false;
      const expiryDate = new Date(c.expiryDate);
      const now = new Date();
      const daysUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      return daysUntilExpiry <= 90 && daysUntilExpiry > 0;
    }).length;
    
    const completionRate = totalTrainings > 0 ? Math.round((completedTrainings / totalTrainings) * 100) : 0;
    
    return {
      user,
      registrations,
      certificates,
      notifications,
      stats: {
        totalTrainings,
        completedTrainings,
        activeTrainings,
        pendingApprovals,
        certificates: certificates.length,
        expiringCertificates,
        completionRate,
      },
    };
  }

  // Feedback
  async getFeedbacksForTraining(trainingId: string): Promise<TrainingFeedback[]> {
    await delay(200);
    return mockFeedbacks.filter(fb => fb.trainingId === trainingId);
  }

  async addFeedbackForTraining(trainingId: string, userId: string, rating: number, comment: string): Promise<TrainingFeedback> {
    await delay(300);
    const newFeedback: TrainingFeedback = {
      id: `f${Date.now()}`,
      trainingId,
      userId,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
    };
    mockFeedbacks.push(newFeedback); // Im echten System: persistieren
    return newFeedback;
  }
}

// Singleton-Instanz
export const mockApi = new MockApiService(); 