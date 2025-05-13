import React from 'react';
import { Bookmark, ExternalLink } from 'lucide-react';
import { Article } from '../types';
import { useStore } from '../store/useStore';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { addToFavorites, removeFromFavorites, favorites } = useStore();
  const isFavorite = favorites.some((fav) => fav.id === article.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(article.id);
    } else {
      addToFavorites(article);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-start justify-between">
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {article.category}
          </span>
          <button
            onClick={handleFavoriteClick}
            className={`p-1 rounded-full ${
              isFavorite ? 'text-yellow-500' : 'text-gray-400'
            } hover:text-yellow-600`}
          >
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-gray-900 line-clamp-2">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {article.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">{article.source}</span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <span className="text-sm mr-1">Read more</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;