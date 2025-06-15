
import React from 'react';
import ModernLayout from '@/components/modern/ModernLayout';
import ModernNewsPage from '@/components/modern/news/ModernNewsPage';

const News = () => {
  return (
    <ModernLayout 
      title="Nachrichten" 
      subtitle="Bleiben Sie über wichtige Themen informiert"
    >
      <ModernNewsPage />
    </ModernLayout>
  );
};

export default News;
