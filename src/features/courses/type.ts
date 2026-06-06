export interface CourseType {
  courseId: string;
  title: string;
  descriptionShort: string;
  instructorName: string;
  durationWeeks: number;
  priceUsd: number;
  isPremium: boolean;
  tags: string;
  rating: number;
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
  CourseDetail: { courseId: string }
}

export type BottomTabParamList = {
  Home: undefined
  Courses: undefined
  Enrolled: undefined
  Profile: undefined
}
