import React from 'react';
import { ArrowLeft, CheckCircle, Clock, Play } from 'lucide-react';
import { Course } from '../types';
import { useProgress } from '../context/ProgressContext';

interface CourseDetailsProps {
  course: Course;
  onBack: () => void;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course, onBack }) => {
  const { 
    isCourseEnrolled, 
    enrollInCourse, 
    markLessonAsComplete, 
    isLessonCompleted,
    getCourseProgress 
  } = useProgress();
  
  const isEnrolled = isCourseEnrolled(course.id);
  const progressPercentage = getCourseProgress(course.id);

  const handleEnroll = () => {
    enrollInCourse(course.id);
  };

  const handleLessonComplete = (lessonId: string) => {
    markLessonAsComplete(course.id, lessonId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-blue-500 hover:text-blue-700 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Courses
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-64 sm:h-80">
          <img 
            src={course.imageUrl} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <div className="flex items-center space-x-4 mb-2">
              <span className="bg-blue-500 px-2 py-1 rounded text-sm">{course.category}</span>
              <span className="bg-gray-700 px-2 py-1 rounded text-sm">{course.level}</span>
            </div>
            <p className="text-sm mb-4">Instructor: {course.instructor}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <p className="text-gray-700 max-w-2xl mb-4 sm:mb-0">{course.description}</p>
            
            {!isEnrolled ? (
              <button 
                onClick={handleEnroll}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition-colors flex items-center"
              >
                <Play size={16} className="mr-2" />
                Enroll Now
              </button>
            ) : (
              <div className="bg-gray-100 rounded-full p-2 flex items-center">
                <div className="h-6 relative w-32 bg-gray-300 rounded-full overflow-hidden">
                  <div 
                    className="absolute h-full bg-green-500 transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <span className="ml-3 font-medium">{progressPercentage}% Complete</span>
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold mb-4">Course Content</h2>
          <div className="space-y-4">
            {course.lessons.map((lesson, index) => {
              const isCompleted = isLessonCompleted(course.id, lesson.id);
              
              return (
                <div 
                  key={lesson.id} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  data-lesson-id={lesson.id}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-500 font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Clock size={14} className="mr-1" />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    {isEnrolled && (
                      isCompleted ? (
                        <div className="flex-shrink-0 text-green-500 flex items-center">
                          <CheckCircle size={20} />
                          <span className="ml-2">Completed</span>
                        </div>
                      ) : (
                        <button 
                          className="ml-4 px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
                          onClick={() => handleLessonComplete(lesson.id)}
                        >
                          Mark Complete
                        </button>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;