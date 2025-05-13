import React from 'react';
import { useStore } from '../store/useStore';
import ArticleCard from './ArticleCard';

const NewsFeed: React.FC = () => {
  const { filteredArticles } = useStore();

  return (
    <main className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
};

export default NewsFeed;