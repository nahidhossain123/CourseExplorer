import { create } from 'zustand';
import { CourseFilters, CourseType } from '../features/courses/type';
import { courseRepository } from '../repositories/courseRepository';

type CourseState = {
    courses: CourseType[];
    isLoading: boolean;

    setCourses: (data: CourseType[]) => void;
    setLoading: (value: boolean) => void;
    filters: CourseFilters;

    setFilter: <K extends keyof CourseFilters>(
        key: K,
        value: CourseFilters[K]
    ) => void;

    resetFilters: () => void;

};

let debounceTimer: NodeJS.Timeout | null = null;

const defaultFilters: CourseFilters = {
    search: '',
    category: 'all',
    price: 'all',
    enrollment: 'all',
    level: 'all',
    sortBy: 'rating',
};

export const useCourseStore = create<CourseState>((set, get) => ({
    courses: [],
    isLoading: false,

    setCourses: (data) => set({ courses: data }),
    setLoading: (value) => set({ isLoading: value }),

    filters: defaultFilters,

    setFilter: (key, value) => {
        const updatedFilters = {
            ...get().filters,
            [key]: value,
        };

        set({ filters: updatedFilters });

        // 🔥 debounce ONLY search
        if (debounceTimer) clearTimeout(debounceTimer);

        debounceTimer = setTimeout(async () => {
            set({ isLoading: true });

            const data = await courseRepository.getFilteredCourses(updatedFilters);

            set({
                courses: data,
                isLoading: false,
            });
        }, key === 'search' ? 300 : 0);
    },

    resetFilters: async () => {
        set({ filters: defaultFilters, isLoading: true });

        const data = await courseRepository.getFilteredCourses(defaultFilters);

        set({
            courses: data,
            isLoading: false,
        });
    },


}));