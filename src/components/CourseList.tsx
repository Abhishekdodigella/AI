import React, { useState } from 'react';
import { Course } from '../types';
import CourseCard from './CourseCard';

interface CourseListProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onSelectCourse }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Extract unique categories from courses
  const categories = ['All', ...new Set(courses.map(course => course.category))];
  
  // Filter courses by selected category
  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Explore Courses</h1>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors 
                ${selectedCategory === category 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onClick={() => onSelectCourse(course.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;