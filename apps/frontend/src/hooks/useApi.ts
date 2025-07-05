import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApi } from '../services/mockApi';
import { toast } from 'react-hot-toast';

// Query Keys
export const queryKeys = {
  user: (userId: string) => ['user', userId],
  currentUser: () => ['user', 'current'],
  trainings: (filters?: { category?: string; status?: string }) => ['trainings', filters],
  training: (id: string) => ['training', id],
  userRegistrations: (userId: string) => ['registrations', userId],
  userCertificates: (userId: string) => ['certificates', userId],
  userNotifications: (userId: string) => ['notifications', userId],
  dashboardStats: (userId: string) => ['dashboard', 'stats', userId],
  upcomingTrainings: (userId: string) => ['trainings', 'upcoming', userId],
  categories: () => ['categories'],
  trainingStats: () => ['trainings', 'stats'],
  searchTrainings: (query: string) => ['trainings', 'search', query],
  allEmployees: () => ['employees', 'all'],
  allUsers: () => ['users', 'all'],
  employeeStats: (userId: string) => ['employee', 'stats', userId],
  employeeDetails: (userId: string) => ['employee', 'details', userId],
};

// Benutzer Hooks
export const useCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.currentUser(),
    queryFn: () => mockApi.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 Minuten
  });
};

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.user(userId),
    queryFn: () => mockApi.getUserById(userId),
    enabled: !!userId,
  });
};

// Schulungen Hooks
export const useTrainings = (filters?: { category?: string; status?: string }) => {
  return useQuery({
    queryKey: queryKeys.trainings(filters),
    queryFn: () => mockApi.getTrainings(filters?.category, filters?.status),
    staleTime: 2 * 60 * 1000, // 2 Minuten
  });
};

export const useTraining = (trainingId: string) => {
  return useQuery({
    queryKey: queryKeys.training(trainingId),
    queryFn: () => mockApi.getTrainingById(trainingId),
    enabled: !!trainingId,
  });
};

export const useAvailableTrainings = () => {
  return useQuery({
    queryKey: ['trainings', 'available'],
    queryFn: () => mockApi.getAvailableTrainings(),
    staleTime: 2 * 60 * 1000,
  });
};

export const useRegisteredTrainings = (userId: string) => {
  return useQuery({
    queryKey: ['trainings', 'registered', userId],
    queryFn: () => mockApi.getRegisteredTrainings(userId),
    enabled: !!userId,
  });
};

// Anmeldungen Hooks
export const useUserRegistrations = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.userRegistrations(userId),
    queryFn: () => mockApi.getUserRegistrations(userId),
    enabled: !!userId,
  });
};

export const useRegisterForTraining = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, trainingId, comments }: {
      userId: string;
      trainingId: string;
      comments?: string;
    }) => mockApi.registerForTraining(userId, trainingId, comments),
    onSuccess: (data) => {
      toast.success('Anmeldung erfolgreich eingereicht!');
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.userRegistrations(data.userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.trainings() });
      queryClient.invalidateQueries({ queryKey: ['trainings', 'registered', data.userId] });
    },
    onError: (error) => {
      toast.error('Fehler bei der Anmeldung. Bitte versuchen Sie es erneut.');
      console.error('Registration error:', error);
    },
  });
};

export const useCancelRegistration = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (registrationId: string) => mockApi.cancelRegistration(registrationId),
    onSuccess: () => {
      toast.success('Anmeldung erfolgreich storniert!');
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['registrations'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.trainings() });
    },
    onError: (error) => {
      toast.error('Fehler beim Stornieren. Bitte versuchen Sie es erneut.');
      console.error('Cancel registration error:', error);
    },
  });
};

// Zertifikate Hooks
export const useUserCertificates = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.userCertificates(userId),
    queryFn: () => mockApi.getUserCertificates(userId),
    enabled: !!userId,
  });
};

export const useUploadCertificate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, trainingId, file, certificateData }: {
      userId: string;
      trainingId: string;
      file: File;
      certificateData: any;
    }) => mockApi.uploadCertificate(userId, trainingId, file, certificateData),
    onSuccess: (data) => {
      toast.success('Zertifikat erfolgreich hochgeladen!');
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.userCertificates(data.userId) });
    },
    onError: (error) => {
      toast.error('Fehler beim Hochladen. Bitte versuchen Sie es erneut.');
      console.error('Upload certificate error:', error);
    },
  });
};

// Benachrichtigungen Hooks
export const useUserNotifications = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.userNotifications(userId),
    queryFn: () => mockApi.getUserNotifications(userId),
    enabled: !!userId,
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notificationId: string) => mockApi.markNotificationAsRead(notificationId),
    onSuccess: () => {
      // Invalidate notifications query
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: string) => mockApi.markAllNotificationsAsRead(userId),
    onSuccess: () => {
      toast.success('Alle Benachrichtigungen als gelesen markiert!');
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

// Dashboard Hooks
export const useDashboardStats = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.dashboardStats(userId),
    queryFn: () => mockApi.getDashboardStats(userId),
    staleTime: 5 * 60 * 1000, // 5 Minuten
  });
};

export const useUpcomingTrainings = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.upcomingTrainings(userId),
    queryFn: () => mockApi.getUpcomingTrainings(userId),
    enabled: !!userId,
  });
};

// Kategorien Hooks
export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories(),
    queryFn: () => mockApi.getCategories(),
    staleTime: 10 * 60 * 1000, // 10 Minuten
  });
};

// Suche Hooks
export const useSearchTrainings = (query: string) => {
  return useQuery({
    queryKey: queryKeys.searchTrainings(query),
    queryFn: () => mockApi.searchTrainings(query),
    enabled: query.length > 2, // Nur suchen wenn mindestens 3 Zeichen
    staleTime: 1 * 60 * 1000, // 1 Minute
  });
};

// Statistiken Hooks
export const useTrainingStats = () => {
  return useQuery({
    queryKey: queryKeys.trainingStats(),
    queryFn: () => mockApi.getTrainingStats(),
    staleTime: 10 * 60 * 1000, // 10 Minuten
  });
};

// Mitarbeiter-Überwachung Hooks (nur für LMS Manager)
export const useAllEmployees = () => {
  return useQuery({
    queryKey: queryKeys.allEmployees(),
    queryFn: () => mockApi.getAllEmployees(),
    staleTime: 5 * 60 * 1000, // 5 Minuten
  });
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: queryKeys.allUsers(),
    queryFn: () => mockApi.getAllUsers(),
    staleTime: 5 * 60 * 1000, // 5 Minuten
  });
};

export const useEmployeeStats = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.employeeStats(userId),
    queryFn: () => mockApi.getEmployeeStats(userId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 Minuten
  });
};

export const useEmployeeDetails = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.employeeDetails(userId),
    queryFn: () => mockApi.getEmployeeDetails(userId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 Minuten
  });
};
 