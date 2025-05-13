import React from 'react';
import { CheckCircle, BookOpen } from 'lucide-react';
import { Course } from '../types';
import { useProgress } from '../context/ProgressContext';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  const { isCourseEnrolled, getCourseProgress } = useProgress();
  const isEnrolled = isCourseEnrolled(course.id);
  const progressPercentage = getCourseProgress(course.id);

  // Get level color
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
      data-course-id={course.id}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.imageUrl} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
        {isEnrolled && (
          <div className="absolute top-0 right-0 m-2">
            <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
              Enrolled
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{course.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">{course.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <BookOpen size={16} className="mr-1" />
          <span>{course.lessons.length} Lessons</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{course.instructor}</span>
          {isEnrolled && (
            <div className="flex items-center">
              <span className="text-sm font-medium text-blue-600 mr-2">{progressPercentage}%</span>
              {progressPercentage === 100 && <CheckCircle size={16} className="text-green-500" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;