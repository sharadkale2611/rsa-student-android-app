export interface StudentBatchAssignment {
  studentBatchAssignmentId: number;
  studentEnrollmentId: number;
  studentName: string | null;

  batchId: number;
  batchCode: string | null;

  assignmentDate: string;
  assignmentType: string;
  remark: string | null;

  isActive: boolean;
  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;
}
