import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FolderIcon, StarIcon, TagIcon, ClockIcon, FileIcon, PlusIcon } from 'lucide-react';
import NewDocumentForm from '../Documents/NewDocumentForm';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  count?: number;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, active = false, count, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-between w-full px-4 py-2 rounded-md text-left ${
        active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <div className="flex items-center">
        <span className="mr-3">{icon}</span>
        <span className="font-medium">{text}</span>
      </div>
      {count !== undefined && (
        <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{count}</span>
      )}
    </button>
  );
};

const Sidebar: React.FC = () => {
  const { documents, folders, tags, currentUser } = useApp();
  const [showNewDocumentForm, setShowNewDocumentForm] = useState(false);
  
  // Count documents by category for badges
  const starredCount = documents.filter(doc => doc.starred).length;
  const recentCount = documents.length > 0 ? Math.min(5, documents.length) : 0;
  
  return (
    <>
      <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4">
          <button 
            onClick={() => setShowNewDocumentForm(true)}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            <PlusIcon size={18} />
            <span>New Document</span>
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="mb-6">
            <SidebarItem 
              icon={<FileIcon size={18} />} 
              text="All Documents" 
              count={documents.length}
              onClick={() => {}}
            />
            <SidebarItem 
              icon={<StarIcon size={18} />} 
              text="Starred" 
              count={starredCount}
              onClick={() => {}}
            />
            <SidebarItem 
              icon={<ClockIcon size={18} />} 
              text="Recent" 
              count={recentCount}
              onClick={() => {}}
            />
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between px-4 py-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Folders</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <PlusIcon size={16} />
              </button>
            </div>
            
            {folders.filter(folder => folder.parentId === null).map(folder => (
              <SidebarItem 
                key={folder.id}
                icon={<FolderIcon size={18} />} 
                text={folder.name} 
                onClick={() => {}}
              />
            ))}
          </div>
          
          <div>
            <div className="flex items-center justify-between px-4 py-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tags</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <PlusIcon size={16} />
              </button>
            </div>
            
            {tags.map(tag => (
              <SidebarItem 
                key={tag.id}
                icon={<TagIcon size={18} style={{ color: tag.color }} />} 
                text={tag.name} 
                onClick={() => {}}
              />
            ))}
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <img 
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <div className="font-medium text-sm">{currentUser.name}</div>
              <div className="text-xs text-gray-500">{currentUser.role}</div>
            </div>
          </div>
        </div>
      </div>

      {showNewDocumentForm && (
        <NewDocumentForm onClose={() => setShowNewDocumentForm(false)} />
      )}
    </>
  );
};

export default Sidebar;