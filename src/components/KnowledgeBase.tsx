import React, { useState } from 'react';
import { Search, Book, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { FAQItem } from '../types';

const KnowledgeBase: React.FC = () => {
  const { faqItems, searchQuery, setSearchQuery } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'orders', 'shipping', 'returns', 'payment', 'account'];

  const filteredFAQs = faqItems.filter(faq => {
    const matchesSearch = searchQuery.toLowerCase() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Knowledge Base</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="p-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <details
              key={faq.id}
              className="group border rounded-lg hover:shadow-sm transition-shadow"
            >
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                <div className="flex items-center gap-3">
                  <Book className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium text-gray-900">{faq.question}</h3>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-4 pb-4 pt-2 text-gray-600">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;