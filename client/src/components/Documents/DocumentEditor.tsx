import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Save, Clock, Star, Download, Share, Trash, Copy, X } from 'lucide-react';
import { Document as PDFDocument, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const DocumentEditor: React.FC = () => {
  const { currentDocument, updateDocument, setCurrentDocument, tags: allTags } = useApp();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [isEdited, setIsEdited] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  
  useEffect(() => {
    if (currentDocument) {
      setTitle(currentDocument.title);
      setDescription(currentDocument.description);
      setContent(currentDocument.content);
      setIsEdited(false);
    }
  }, [currentDocument]);
  
  if (!currentDocument) {
    return null;
  }
  
  const handleSave = () => {
    if (isEdited) {
      updateDocument(currentDocument.id, {
        title,
        description,
        content
      });
      setIsEdited(false);
    }
  };

  const isPDF = currentDocument.title.toLowerCase().endsWith('.pdf');
  
  const documentTags = allTags.filter(tag => currentDocument.tags.includes(tag.id));
  
  const handleToggleStar = () => {
    updateDocument(currentDocument.id, { starred: !currentDocument.starred });
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }
  
  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <button 
          onClick={() => setCurrentDocument(null)}
          className="text-gray-500 hover:text-gray-700 flex items-center"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Back</span>
        </button>
        
        <div className="flex items-center space-x-2">
          {isEdited && (
            <span className="text-sm text-gray-500">Unsaved changes</span>
          )}
          <button 
            onClick={handleSave}
            disabled={!isEdited}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-md ${
              isEdited 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Save size={16} />
            <span>Save</span>
          </button>
          
          <button 
            onClick={() => setShowVersions(!showVersions)}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
            title="Version history"
          >
            <Clock size={18} />
          </button>
          
          <button 
            onClick={handleToggleStar}
            className={`p-1.5 hover:bg-gray-100 rounded-md ${
              currentDocument.starred ? 'text-yellow-400' : 'text-gray-500 hover:text-gray-700'
            }`}
            title={currentDocument.starred ? 'Unstar document' : 'Star document'}
          >
            <Star size={18} fill={currentDocument.starred ? 'currentColor' : 'none'} />
          </button>
          
          <div className="relative group">
            <button 
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
              title="More options"
            >
              <span className="block w-1 h-1 bg-gray-600 rounded-full mb-1"></span>
              <span className="block w-1 h-1 bg-gray-600 rounded-full mb-1"></span>
              <span className="block w-1 h-1 bg-gray-600 rounded-full"></span>
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 invisible group-hover:visible z-10">
              <div className="py-1">
                <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Download size={16} className="mr-2" />
                  <span>Download</span>
                </button>
                <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Share size={16} className="mr-2" />
                  <span>Share</span>
                </button>
                <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Copy size={16} className="mr-2" />
                  <span>Duplicate</span>
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <Trash size={16} className="mr-2" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setIsEdited(true);
              }}
              className="w-full text-2xl font-bold border-none focus:outline-none focus:ring-0 px-0"
              placeholder="Document Title"
            />
            
            <input
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setIsEdited(true);
              }}
              className="w-full text-gray-600 border-none focus:outline-none focus:ring-0 px-0"
              placeholder="Add a description..."
            />
            
            <div className="flex flex-wrap gap-2">
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
              <button className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs hover:bg-gray-200">
                + Add Tag
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            {isPDF ? (
              <div className="flex flex-col items-center">
                <PDFDocument
                  file={content}
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="max-w-full"
                >
                  <Page 
                    pageNumber={pageNumber} 
                    className="shadow-lg"
                    width={Math.min(window.innerWidth * 0.8, 800)}
                  />
                </PDFDocument>
                {numPages && (
                  <div className="mt-4 flex items-center gap-4">
                    <button
                      onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                      disabled={pageNumber <= 1}
                      className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <p className="text-sm">
                      Page {pageNumber} of {numPages}
                    </p>
                    <button
                      onClick={() => setPageNumber(prev => Math.min(numPages, prev + 1))}
                      disabled={pageNumber >= numPages}
                      className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setIsEdited(true);
                }}
                className="w-full h-full min-h-[300px] text-gray-800 border-none focus:outline-none focus:ring-0 resize-none px-0"
                placeholder="Start writing..."
              />
            )}
          </div>
          
          <div className="px-4 py-2 border-t border-gray-200 text-xs text-gray-500">
            Last edited by {currentDocument.versions[currentDocument.versions.length - 1].createdBy.name} on {formatDate(currentDocument.updatedAt)}
          </div>
        </div>
        
        {showVersions && (
          <div className="w-64 border-l border-gray-200 overflow-y-auto animate-slide-in">
            <div className="p-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">Version History</h3>
              <button 
                onClick={() => setShowVersions(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="py-2">
              {currentDocument.versions.slice().reverse().map((version) => (
                <button 
                  key={version.id}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 border-l-2 border-transparent hover:border-blue-500"
                >
                  <div className="font-medium text-sm">
                    Version {version.versionNumber}
                    {version.versionNumber === currentDocument.versions.length && (
                      <span className="ml-2 text-xs font-normal text-green-600 bg-green-50 px-1.5 py-0.5 rounded">Current</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{formatDate(version.createdAt)}</div>
                  <div className="text-xs text-gray-600 mt-1">{version.changeDescription}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentEditor;