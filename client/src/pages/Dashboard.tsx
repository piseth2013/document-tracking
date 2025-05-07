import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import DocumentList from '../components/Documents/DocumentList';
import DocumentEditor from '../components/Documents/DocumentEditor';
import { useApp } from '../context/AppContext';

const Dashboard: React.FC = () => {
  const { currentDocument } = useApp();
  
  return (
    <MainLayout>
      {currentDocument ? <DocumentEditor /> : <DocumentList />}
    </MainLayout>
  );
};

export default Dashboard;