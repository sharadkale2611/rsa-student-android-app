export interface BatchStudyWorkAttachment {
  batchStudyWorkAttachementId: number;
  filePath: string;
}

export interface BatchStudyWork {
  batchStudyWorkId: number;
  workType: string;
  assignedBy: number | null;
  assignedByName: string | null;
  batchId: number;
  batchCode: string | null;
  workTitle: string;
  workDescription: string;
  expectedCompletionDate: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  attachments: BatchStudyWorkAttachment[];
}
