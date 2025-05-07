import { Document, Folder, Tag, User } from '../types';

export const mockCurrentUser: User = (() => {

  return {
    id: 'user-1',
    name: '<NAME>',
    email: '<EMAIL>',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    role: 'user',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')

  };
})();

export const mockUsers: User[] = [
  mockCurrentUser,
  {
    id: 'user-2',
    name: 'Sam Wilson',
    email: 'sam@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    role: 'user',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  },
  {
    id: 'user-3',
    name: 'Taylor Reed',
    email: 'taylor@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    role: 'user',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  }
];

export const mockTags: Tag[] = [
  { id: 'tag-1', name: 'Important', color: '#EF4444' },
  { id: 'tag-2', name: 'Draft', color: '#F97316' },
  { id: 'tag-3', name: 'Final', color: '#22C55E' },
  { id: 'tag-4', name: 'Review', color: '#3B82F6' },
  { id: 'tag-5', name: 'Personal', color: '#8B5CF6' }
];

export const mockFolders: Folder[] = [
  {
    id: 'folder-1',
    name: 'Projects',
    parentId: null,
    createdAt: new Date('2023-01-15'),
    createdBy: mockCurrentUser
  },
  {
    id: 'folder-2',
    name: 'Reports',
    parentId: null,
    createdAt: new Date('2023-02-12'),
    createdBy: mockCurrentUser
  },
  {
    id: 'folder-3',
    name: 'Personal',
    parentId: null,
    createdAt: new Date('2023-03-05'),
    createdBy: mockCurrentUser
  },
  {
    id: 'folder-4',
    name: 'Q1 Projects',
    parentId: 'folder-1',
    createdAt: new Date('2023-01-16'),
    createdBy: mockCurrentUser
  }
];

export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    title: 'Project Proposal',
    description: 'Initial proposal for the new client project',
    content: 'This document outlines the proposed scope, timeline, and budget for the upcoming project.',
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2023-04-15'),
    createdBy: mockCurrentUser,
    folderId: 'folder-1',
    tags: ['tag-1', 'tag-4'],
    starred: true,
    versions: [
      {
        id: 'ver-1',
        documentId: 'doc-1',
        versionNumber: 1,
        content: 'Initial draft of the proposal.',
        createdAt: new Date('2023-04-10'),
        createdBy: mockCurrentUser,
        changeDescription: 'Initial creation'
      },
      {
        id: 'ver-2',
        documentId: 'doc-1',
        versionNumber: 2,
        content: 'This document outlines the proposed scope, timeline, and budget for the upcoming project.',
        createdAt: new Date('2023-04-15'),
        createdBy: mockCurrentUser,
        changeDescription: 'Added budget details and timeline'
      }
    ]
  },
  {
    id: 'doc-2',
    title: 'Q1 Financial Report',
    description: 'Financial report for the first quarter',
    content: 'This report summarizes the financial performance for Q1 of the fiscal year.',
    createdAt: new Date('2023-04-01'),
    updatedAt: new Date('2023-04-02'),
    createdBy: mockUsers[1],
    folderId: 'folder-2',
    tags: ['tag-3'],
    starred: false,
    versions: [
      {
        id: 'ver-3',
        documentId: 'doc-2',
        versionNumber: 1,
        content: 'This report summarizes the financial performance for Q1 of the fiscal year.',
        createdAt: new Date('2023-04-01'),
        createdBy: mockUsers[1],
        changeDescription: 'Initial creation'
      }
    ]
  },
  {
    id: 'doc-3',
    title: 'Marketing Strategy',
    description: 'New marketing strategy for product launch',
    content: 'This document outlines our marketing strategy for the upcoming product launch.',
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2023-04-18'),
    createdBy: mockUsers[2],
    folderId: 'folder-1',
    tags: ['tag-2', 'tag-4'],
    starred: true,
    versions: [
      {
        id: 'ver-4',
        documentId: 'doc-3',
        versionNumber: 1,
        content: 'Initial marketing ideas.',
        createdAt: new Date('2023-03-20'),
        createdBy: mockUsers[2],
        changeDescription: 'Initial creation'
      },
      {
        id: 'ver-5',
        documentId: 'doc-3',
        versionNumber: 2,
        content: 'Refined marketing strategy with budget allocation.',
        createdAt: new Date('2023-04-05'),
        createdBy: mockUsers[2],
        changeDescription: 'Added budget details'
      },
      {
        id: 'ver-6',
        documentId: 'doc-3',
        versionNumber: 3,
        content: 'This document outlines our marketing strategy for the upcoming product launch.',
        createdAt: new Date('2023-04-18'),
        createdBy: mockCurrentUser,
        changeDescription: 'Finalized strategy details'
      }
    ]
  },
  {
    id: 'doc-4',
    title: 'Meeting Notes',
    description: 'Notes from the weekly team meeting',
    content: 'Key discussion points and action items from our weekly team meeting.',
    createdAt: new Date('2023-04-17'),
    updatedAt: new Date('2023-04-17'),
    createdBy: mockCurrentUser,
    folderId: 'folder-4',
    tags: ['tag-5'],
    starred: false,
    versions: [
      {
        id: 'ver-7',
        documentId: 'doc-4',
        versionNumber: 1,
        content: 'Key discussion points and action items from our weekly team meeting.',
        createdAt: new Date('2023-04-17'),
        createdBy: mockCurrentUser,
        changeDescription: 'Initial creation'
      }
    ]
  },
  {
    id: 'doc-5',
    title: 'Product Roadmap',
    description: 'Roadmap for product development over the next 12 months',
    content: 'This roadmap outlines our product development strategy for the next year, including key milestones and feature releases.',
    createdAt: new Date('2023-02-28'),
    updatedAt: new Date('2023-04-10'),
    createdBy: mockUsers[1],
    folderId: 'folder-1',
    tags: ['tag-1', 'tag-3'],
    starred: true,
    versions: [
      {
        id: 'ver-8',
        documentId: 'doc-5',
        versionNumber: 1,
        content: 'Initial roadmap draft with major milestone ideas.',
        createdAt: new Date('2023-02-28'),
        createdBy: mockUsers[1],
        changeDescription: 'Initial creation'
      },
      {
        id: 'ver-9',
        documentId: 'doc-5',
        versionNumber: 2,
        content: 'Updated timeline for Q2 and Q3 releases.',
        createdAt: new Date('2023-03-15'),
        createdBy: mockUsers[1],
        changeDescription: 'Timeline updates'
      },
      {
        id: 'ver-10',
        documentId: 'doc-5',
        versionNumber: 3,
        content: 'This roadmap outlines our product development strategy for the next year, including key milestones and feature releases.',
        createdAt: new Date('2023-04-10'),
        createdBy: mockUsers[2],
        changeDescription: 'Added feature details and refined timeline'
      }
    ]
  }
];