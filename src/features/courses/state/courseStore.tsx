import { create } from "zustand";
import { checkIsConnected, subscribeToConnectionChange } from "../../../services/network";
import { CourseType, SyncStatus } from "../type";
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CourseState = {
    courses: CourseType[];
    searchQuery: string;
    selectedCategory: string; // 'All', 'Design', etc.
    selectedLevel: string; // 'All', 'Beginner', etc.
    selectedSort: string; // 'rating', 'price_asc', 'price_desc', 'duration'

    isLoading: boolean;
    syncStatus: SyncStatus;
    lastSyncedAt: number | null;
    isConnected: boolean;
    errorMessage: string | null;

    // Actions
    setConnectionStatus: (connected: boolean) => void;
    loadLocalCourses: () => Promise<void>;
    syncWithSupabase: () => Promise<void>;
    initializeStore: () => Promise<void>;
}

// Key for storage persistence of last sync timestamp
const LAST_SYNC_KEY = '@course_explorer:last_synced_at';

export const useCourseStore = create<CourseState>((set, get) => ({
    courses: [],
    searchQuery: '',
    selectedCategory: 'All',
    selectedLevel: 'All',
    selectedSort: 'rating',

    isLoading: false,
    syncStatus: 'idle',
    lastSyncedAt: null,
    isConnected: true,
    errorMessage: null,

    setConnectionStatus: (connected: boolean) => {
        set({ isConnected: connected });
    },

    loadLocalCourses: async () => {
        try {
            set({ isLoading: get().courses.length === 0 }); // Show loader only on first load
            //   const dbCourses = await courseRepository.getAllCourses();
            //   const mapped = dbCourses.map(mapDbCourseToType);
            //   set({ courses: mapped, isLoading: false });
        } catch (error: any) {
            set({
                isLoading: false,
                errorMessage: error?.message || 'Failed to load local courses',
            });
        }
    },

    syncWithSupabase: async () => {
        set({ syncStatus: 'syncing', errorMessage: null });

        // const res = await courseSync.pullFromRemote();

        // if (res.success) {
        //     const now = Date.now();
        //     await AsyncStorage.setItem(LAST_SYNC_KEY, String(now));
        //     set({ syncStatus: 'success', lastSyncedAt: now });
        //     // Reload the state from database to update UI with fresh data
        //     await get().loadLocalCourses();
        // } else {
        //     set({
        //         syncStatus: 'error',
        //         errorMessage: res.error || 'Failed to sync with server',
        //     });
        // }
    },

    initializeStore: async () => {
        // 1. Load connection status
        const connected = await checkIsConnected();
        set({ isConnected: connected });

        // 2. Subscribe to network changes
        subscribeToConnectionChange((status) => {
            get().setConnectionStatus(status);
            if (status) {
                // Automatically trigger sync in background when coming back online
                get().syncWithSupabase();
            }
        });

        // 3. Load persisted metadata (lastSyncedAt)
        try {
            const lastSyncStr = await AsyncStorage.getItem(LAST_SYNC_KEY);
            if (lastSyncStr) {
                set({ lastSyncedAt: Number(lastSyncStr) });
            }
        } catch (e) {
            console.warn('Failed to load last synced timestamp', e);
        }

        // 4. Load local database cached courses immediately
        await get().loadLocalCourses();

        // 5. Trigger sync in background if online
        if (connected) {
            get().syncWithSupabase();
        }
    },
}));