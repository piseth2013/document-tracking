import React from 'react';
import { useApp } from '../../context/AppContext';
import DocumentCard from './DocumentCard';
import { LayoutGrid, List, SortAsc, SortDesc, Filter } from 'lucide-react';

const DocumentList: React.FC = () => {
  const { documents, setCurrentDocument, searchTerm } = useApp();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc');
  
  // Filter documents based on search term
  const filteredDocs = documents.filter(doc => 
    searchTerm ? 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) :
      true
  );
  
  // Sort documents based on updated date
  const sortedDocs = [...filteredDocs].sort((a, b) => {
    const dateA = new Date(a.updatedAt).getTime();
    const dateB = new Date(b.updatedAt).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {searchTerm ? `Search Results: "${searchTerm}"` : 'All Documents'}
          <span className="ml-2 text-sm font-normal text-gray-500">
            {filteredDocs.length} {filteredDocs.length === 1 ? 'document' : 'documents'}
          </span>
        </h2>
        
        <div className="flex space-x-2">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 text-gray-800' : 'bg-white text-gray-600'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 text-gray-800' : 'bg-white text-gray-600'}`}
            >
              <List size={18} />
            </button>
          </div>
          
          <button 
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-50"
          >
            <span>Date</span>
            {sortOrder === 'desc' ? <SortDesc size={16} /> : <SortAsc size={16} />}
          </button>
          
          <button className="p-2 border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-50">
            <Filter size={18} />
          </button>
        </div>
      </div>
      
      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'grid-cols-1 gap-3'}`}>
        {sortedDocs.map(doc => (
          <DocumentCard 
            key={doc.id}
            document={doc}
            onClick={() => setCurrentDocument(doc)}
          />
        ))}
        
        {sortedDocs.length === 0 && (
          <div className="col-span-3 py-8 text-center">
            <p className="text-gray-500">No documents found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentList;