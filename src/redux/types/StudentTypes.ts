export interface StudentProfile {
  studentId: number;
  userId: number;
  firmId: number;
  firmCode: string;
  firmName: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  fathersOccupation: string;
  profileImagePath: string;
  resrvationCategory: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  userName: string;
  mobileNumber1: string;
  mobileNumber2: string;
  studentCode: string;
}

export interface StudentState {
  profile: StudentProfile | null;
  loading: boolean;
  error: string | null;
}
