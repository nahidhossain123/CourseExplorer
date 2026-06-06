
import { database } from '../db/watermelon/database';
import { Course } from '../db/watermelon/models/Course';
import { CourseFilters } from '../features/courses/type';
import { syncRepository } from './syncRepository';
import { Q } from '@nozbe/watermelondb';

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
    },

    async getFilteredCourses(filters: CourseFilters) {
        const collection = database.get<Course>('courses');

        let query: any[] = [];

        // 🔎 SEARCH (NOW PART OF FILTER SYSTEM)
        if (filters.search) {
            query.push(
                Q.or(
                    Q.where('title', Q.like(`%${filters.search}%`)),
                    Q.where('instructor_name', Q.like(`%${filters.search}%`)),
                    Q.where('tags', Q.like(`%${filters.search}%`))
                )
            );
        }

        // 📂 CATEGORY
        if (filters.category !== 'all') {
            query.push(Q.where('category', filters.category));
        }

        // 💰 PRICE
        if (filters.price === 'free') {
            query.push(Q.where('price_usd', 0));
        }

        if (filters.price === 'premium') {
            query.push(Q.where('price_usd', Q.gte(1)));
        }

        // 🎓 ENROLLMENT
        if (filters.enrollment === 'enrolled') {
            query.push(Q.where('is_enrolled', true));
        }

        if (filters.enrollment === 'not_enrolled') {
            query.push(Q.where('is_enrolled', false));
        }

        // 📊 LEVEL
        if (filters.level !== 'all') {
            query.push(Q.where('level', filters.level));
        }

        // ↕ SORT
        let sortQuery: any[] = [];

        switch (filters.sortBy) {
            case 'rating':
                sortQuery = [Q.sortBy('rating', Q.desc)];
                break;

            case 'price_low':
                sortQuery = [Q.sortBy('price_usd', Q.asc)];
                break;

            case 'price_high':
                sortQuery = [Q.sortBy('price_usd', Q.desc)];
                break;

            case 'duration':
                sortQuery = [Q.sortBy('duration_weeks', Q.asc)];
                break;
        }

        return await collection.query(...query, ...sortQuery).fetch();
    },
};

