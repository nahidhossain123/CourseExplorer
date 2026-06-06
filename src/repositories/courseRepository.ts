
import { database } from '../db/watermelon/database';
import { Course } from '../db/watermelon/models/Course';
import { syncRepository } from './syncRepository';

export const courseRepository = {

    async getAllCourses(): Promise<Course[]> {
        return await database
            .get<Course>('courses')
            .query()
            .fetch();
    },

    async createCourse(data: any) {
        const id = data.course_id;

        await database.write(async () => {
            await database.get<Course>('courses').create((course) => {
                course.courseId = id;
                course.title = data.title;
                course.descriptionShort = data.description_short;
                course.instructorName = data.instructor_name;
                course.durationWeeks = data.duration_weeks;
                course.priceUsd = data.price_usd;
                course.isPremium = data.is_premium;
                course.tags = data.tags;
                course.rating = data.rating;
                course.updatedAt = Date.now();
                course.isDirty = true;
                course.isDeleted = false;
            });
        });

        // 🔥 IMPORTANT: enqueue sync
        await syncRepository.enqueue({
            table: 'courses',
            operation: 'create',
            recordId: id,
            payload: data,
        });
    },
    async updateCourse(courseId: string, updates: any) {
        await database.write(async () => {
            const course = await database.get<Course>('courses').find(courseId);

            await course.update((c) => {
                Object.assign(c, {
                    ...updates,
                    updatedAt: Date.now(),
                    isDirty: true,
                });
            });
        });

        await syncRepository.enqueue({
            table: 'courses',
            operation: 'update',
            recordId: courseId,
            payload: updates,
        });
    },
    async deleteCourse(courseId: string) {
        await database.write(async () => {
            const course = await database.get<Course>('courses').find(courseId);

            await course.update((c) => {
                c.isDeleted = true;
                c.isDirty = true;
            });
        });

        await syncRepository.enqueue({
            table: 'courses',
            operation: 'delete',
            recordId: courseId,
            payload: { course_id: courseId },
        });
    }
};

