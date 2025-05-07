export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
  folderId: string | null;
  tags: string[];
  starred: boolean;
  versions: DocumentVersion[];
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  versionNumber: number;
  content: string;
  createdAt: Date;
  createdBy: User;
  changeDescription: string;
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: Date;
  createdBy: User;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Activity {
  id: string;
  documentId: string;
  userId: string;
  action: "created" | "edited" | "viewed" | "deleted" | "restored" | "shared";
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface AuthResponse {
  user: User;
  token: string;
  username?: string;
  message: string;
}