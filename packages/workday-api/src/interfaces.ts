export interface WorkdayConfig {
  baseUrl: string;
  username: string;
  password: string;
  tenant: string;
}

export interface ApprovalRequest {
  id: string;
  employeeId: string;
  trainingId: string;
  trainingTitle: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  managerId?: string;
  lmsManagerId?: string;
}

export interface Certificate {
  id: string;
  employeeId: string;
  title: string;
  issueDate: string;
  expiryDate?: string;
  fileUrl: string;
  workdayStatus: 'pending' | 'uploaded' | 'verified';
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  managerId?: string;
  position: string;
} 