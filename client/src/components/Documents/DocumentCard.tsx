import React from 'react';
import { Document, Tag } from '../../types';
import { useApp } from '../../context/AppContext';
import { StarIcon, FileIcon, MoreVertical } from 'lucide-react';
import { formatDistanceToNow } from '../utils/dateUtils';

interface DocumentCardProps {
  document: Document;
  onClick: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, onClick }) => {
  const { tags: allTags, updateDocument } = useApp();
  
  const documentTags = allTags.filter(tag => document.tags.includes(tag.id));
  
  const toggleStar = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateDocument(document.id, { starred: !document.starred });
  };
  
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <FileIcon className="text-gray-400 mr-2" size={20} />
          <h3 className="font-medium text-gray-800 truncate">{document.title}</h3>
        </div>
        <div className="flex items-center">
          <button onClick={toggleStar} className="text-gray-400 hover:text-yellow-400">
            <StarIcon size={18} fill={document.starred ? 'currentColor' : 'none'} className={document.starred ? 'text-yellow-400' : ''} />
          </button>
          <button className="ml-2 text-gray-400 hover:text-gray-600">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{document.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {documentTags.map(tag => (
          <span 
            key={tag.id}
            className="inline-flex items-center px-2 py-1 rounded-full text-xs"
            style={{ 
              backgroundColor: `${tag.color}20`, 
              color: tag.color 
            }}
          >
            {tag.name}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
        <span>Modified {formatDistanceToNow(document.updatedAt)}</span>
        <div className="flex items-center">
          <span className="inline-block mr-2">v{document.versions.length}</span>
          <img 
            src={document.createdBy.avatar} 
            alt={document.createdBy.name}
            className="w-5 h-5 rounded-full"
            title={document.createdBy.name}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;