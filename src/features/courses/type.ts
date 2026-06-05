export interface CourseType {
  id: string;
  title: string;
  description: string;
  instructor: string;
  imageUrl: string;
  rating: number;
  price: number;
  duration: string;
  lessons: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  tags: string[];
  isEnrolled: boolean;
  createdAt: number;
  updatedAt: number;
}

export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';

export type RootStackParamList = {
  CourseList: undefined;
  CourseDetail: { courseId: string };
};
