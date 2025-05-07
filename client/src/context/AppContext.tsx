import React, { createContext, useContext, useState, ReactNode } from 'react';
import {Document, Folder, Tag, User, Activity, AuthResponse} from '../types';
import { mockDocuments, mockFolders, mockTags, mockCurrentUser } from '../data/mockData';

interface AppContextType {
  documents: Document[];
  folders: Folder[];
  tags: Tag[];
  currentUser: User;
  activities: Activity[];
  currentDocument: Document | null;
  searchTerm: string;
  isAuthenticated: boolean;
  login: (authResponse?: AuthResponse) => void;
  logout: () => void;
  addDocument: (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'versions'>) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  setCurrentDocument: (document: Document | null) => void;
  addFolder: (folder: Omit<Folder, 'id' | 'createdAt' | 'createdBy'>) => void;
  updateFolder: (id: string, updates: Partial<Folder>) => void;
  deleteFolder: (id: string) => void;
  addTag: (tag: Omit<Tag, 'id'>) => void;
  deleteTag: (id: string) => void;
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  setSearchTerm: (term: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [folders, setFolders] = useState<Folder[]>(mockFolders);
  const [tags, setTags] = useState<Tag[]>(mockTags);
  const [currentUser] = useState<User>(mockCurrentUser);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });


  const login = (authResponse?: AuthResponse) => {
    if (authResponse) {
      localStorage.setItem('token', JSON.stringify(authResponse.token));
      localStorage.setItem('user', JSON.stringify(authResponse.user.username));
      setIsAuthenticated(true);
    }
  };

  const setCurrentUser = (user: User) => {
    console.log(user);
    setCurrentUser(user);
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setCurrentDocument(null);
  };

  const addDocument = (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'versions'>) => {
    const now = new Date();
    const newDocument: Document = {
      ...document,
      id: `doc-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
      createdBy: currentUser,
      versions: [
        {
          id: `ver-${Date.now()}`,
          documentId: `doc-${Date.now()}`,
          versionNumber: 1,
          content: document.content,
          createdAt: now,
          createdBy: currentUser,
          changeDescription: "Initial creation"
        }
      ]
    };
    
    setDocuments([...documents, newDocument]);
    addActivity({
      documentId: newDocument.id,
      userId: currentUser.id,
      action: "created"
    });
  };

  const updateDocument = (id: string, updates: Partial<Document>) => {
    const now = new Date();
    setDocuments(docs => 
      docs.map(doc => {
        if (doc.id === id) {
          const updatedDoc = { 
            ...doc, 
            ...updates, 
            updatedAt: now 
          };
          
          if (updates.content && updates.content !== doc.content) {
            const newVersion = {
              id: `ver-${Date.now()}`,
              documentId: doc.id,
              versionNumber: doc.versions.length + 1,
              content: updates.content,
              createdAt: now,
              createdBy: currentUser,
              changeDescription: "Updated document"
            };
            
            updatedDoc.versions = [...doc.versions, newVersion];
            
            addActivity({
              documentId: doc.id,
              userId: currentUser.id,
              action: "edited"
            });
          }
          
          return updatedDoc;
        }
        return doc;
      })
    );
  };

  const deleteDocument = (id: string) => {
    setDocuments(docs => docs.filter(doc => doc.id !== id));
    addActivity({
      documentId: id,
      userId: currentUser.id,
      action: "deleted"
    });
  };

  const addFolder = (folder: Omit<Folder, 'id' | 'createdAt' | 'createdBy'>) => {
    const newFolder: Folder = {
      ...folder,
      id: `folder-${Date.now()}`,
      createdAt: new Date(),
      createdBy: currentUser
    };
    
    setFolders([...folders, newFolder]);
  };

  const updateFolder = (id: string, updates: Partial<Folder>) => {
    setFolders(folders => 
      folders.map(folder => 
        folder.id === id ? { ...folder, ...updates } : folder
      )
    );
  };

  const deleteFolder = (id: string) => {
    setFolders(folders => folders.filter(folder => folder.id !== id));
  };

  const addTag = (tag: Omit<Tag, 'id'>) => {
    const newTag: Tag = {
      ...tag,
      id: `tag-${Date.now()}`
    };
    
    setTags([...tags, newTag]);
  };

  const deleteTag = (id: string) => {
    setTags(tags => tags.filter(tag => tag.id !== id));
  };

  const addActivity = (activity: Omit<Activity, 'id' | 'timestamp'>) => {
    const newActivity: Activity = {
      ...activity,
      id: `activity-${Date.now()}`,
      timestamp: new Date()
    };
    
    setActivities([...activities, newActivity]);
  };

  const value = {
    documents,
    folders,
    tags,
    currentUser,
    activities,
    currentDocument,
    searchTerm,
    isAuthenticated,
    login,
    logout,
    addDocument,
    updateDocument,
    deleteDocument,
    setCurrentDocument,
    addFolder,
    updateFolder,
    deleteFolder,
    addTag,
    deleteTag,
    addActivity,
    setSearchTerm
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};