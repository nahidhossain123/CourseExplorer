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

export type LocalSyncStatus =
  | 'synced'
  | 'pending_create'
  | 'pending_update'
  | 'pending_delete'
  | 'failed';

export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';

export type RootStackParamList = {
  MainTabs: undefined
  CourseDetail: { id: string }
}

export type BottomTabParamList = {
  Home: undefined
  Courses: undefined
  Enrolled: undefined
  Profile: undefined
}
