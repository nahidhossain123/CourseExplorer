import { create } from 'zustand';
import { CourseType } from '../features/courses/type';


type CourseState = {
    courses: CourseType[];
    isLoading: boolean;
    setCourses: (data: CourseType[]) => void;
    setLoading: (value: boolean) => void;
};

export const useCourseStore = create<CourseState>((set) => ({
    courses: [],
    isLoading: false,
    setCourses: (data) => set({ courses: data }),
    setLoading: (value) => set({ isLoading: value }),
}));