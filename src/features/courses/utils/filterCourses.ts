export type Course = {
    title: string;
    category: string;
};

export const filterCourses = (courses: Course[], query: string) => {
    const q = query.toLowerCase().trim();

    return courses.filter(course => {
        return (
            course.title.toLowerCase().includes(q) ||
            course.category.toLowerCase().includes(q)
        );
    });
};