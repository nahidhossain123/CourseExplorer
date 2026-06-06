import { filterCourses } from "../utils/filterCourses.ts";



const courses = [
    { title: 'React Native', category: 'mobile' },
    { title: 'Node JS', category: 'backend' },
];

describe('Course Filter', () => {
    it('filters by search keyword', () => {
        const result = filterCourses(courses, 'react');

        expect(result.length).toBe(1);
        expect(result[0].title).toBe('React Native');
    });

    it('filters by category', () => {
        const result = filterCourses(courses, 'backend');

        expect(result.length).toBe(1);
    });
});