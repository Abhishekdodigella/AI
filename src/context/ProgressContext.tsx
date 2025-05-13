import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress } from '../types';

interface ProgressContextType {
  userProgress: UserProgress[];
  enrollInCourse: (courseId: string) => void;
  markLessonAsComplete: (courseId: string, lessonId: string) => void;
  isCourseEnrolled: (courseId: string) => boolean;
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
  getCourseProgress: (courseId: string) => number;
}

const ProgressContext = createContext<ProgressContextType>({
  userProgress: [],
  enrollInCourse: () => {},
  markLessonAsComplete: () => {},
  isCourseEnrolled: () => false,
  isLessonCompleted: () => false,
  getCourseProgress: () => 0,
});

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [userProgress, setUserProgress] = useState<UserProgress[]>(() => {
    const savedProgress = localStorage.getItem('userProgress');
    return savedProgress ? JSON.parse(savedProgress) : [];
  });

  // Save to localStorage whenever userProgress changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  const enrollInCourse = (courseId: string) => {
    setUserProgress((prevProgress) => {
      // Check if user is already enrolled
      const existingCourse = prevProgress.find((p) => p.courseId === courseId);
      
      if (existingCourse) {
        return prevProgress; // User is already enrolled
      }
      
      // Enroll user in the course
      return [...prevProgress, { 
        courseId, 
        enrolled: true, 
        completedLessons: [] 
      }];
    });
  };

  const markLessonAsComplete = (courseId: string, lessonId: string) => {
    setUserProgress((prevProgress) => {
      const existingCourseIndex = prevProgress.findIndex((p) => p.courseId === courseId);
      
      if (existingCourseIndex === -1) {
        // If not enrolled, enroll and mark lesson complete
        return [...prevProgress, { 
          courseId, 
          enrolled: true, 
          completedLessons: [lessonId] 
        }];
      }
      
      // Create a copy of the current progress
      const updatedProgress = [...prevProgress];
      const course = updatedProgress[existingCourseIndex];
      
      // If lesson is not already marked as complete, add it
      if (!course.completedLessons.includes(lessonId)) {
        updatedProgress[existingCourseIndex] = {
          ...course,
          completedLessons: [...course.completedLessons, lessonId]
        };
      }
      
      return updatedProgress;
    });
  };

  const isCourseEnrolled = (courseId: string) => {
    return userProgress.some((p) => p.courseId === courseId && p.enrolled);
  };

  const isLessonCompleted = (courseId: string, lessonId: string) => {
    const course = userProgress.find((p) => p.courseId === courseId);
    return course ? course.completedLessons.includes(lessonId) : false;
  };

  const getCourseProgress = (courseId: string) => {
    const course = userProgress.find((p) => p.courseId === courseId);
    if (!course || course.completedLessons.length === 0) {
      return 0;
    }
    
    // Get total lessons for this course from the actual courses data
    // We'll pass this information when calling this function
    const totalLessons = document.querySelectorAll(`[data-course-id="${courseId}"] [data-lesson-id]`).length;
    if (totalLessons === 0) return 0;
    
    return Math.round((course.completedLessons.length / totalLessons) * 100);
  };

  return (
    <ProgressContext.Provider
      value={{
        userProgress,
        enrollInCourse,
        markLessonAsComplete,
        isCourseEnrolled,
        isLessonCompleted,
        getCourseProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};