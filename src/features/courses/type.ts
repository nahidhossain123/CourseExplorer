export interface CourseType {
  courseId: string;
  title: string;
  descriptionShort: string;
  instructorName: string;
  durationWeeks: number;
  priceUsd: number;
  isEnrolled: boolean;
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


export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export type SortOption =
  | 'rating'
  | 'price_low'
  | 'price_high'
  | 'duration';

export type CourseFilters = {
  search: string;

  category: string;

  price: 'all' | 'free' | 'premium';

  enrollment: 'all' | 'enrolled' | 'not_enrolled';

  level: 'all' | 'beginner' | 'intermediate' | 'advanced';

  sortBy: 'rating' | 'price_low' | 'price_high' | 'duration';
};
