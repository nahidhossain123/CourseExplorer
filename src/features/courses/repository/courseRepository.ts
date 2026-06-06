
import { database } from '../../../db/watermelon/database';
import { Course } from '../../../db/watermelon/models/Course';

export const courseRepository = {
    /**
     * Fetches all local courses.
     */
    async getAllCourses(): Promise<Course[]> {
        return await database.get<Course>('courses').query().fetch();
    },

    /**
     * Fetches a single local course by ID.
     */
    async getCourseById(courseId: string): Promise<Course | null> {
        try {
            return await database.get<Course>('courses').find(courseId);
        } catch (error) {
            console.warn(`Course with ID ${courseId} not found in database`, error);
            return null;
        }
    },

    /**
     * Toggles the enrollment state of a course.
     */
    // async toggleEnrollment(courseId: string): Promise<Course> {
    //     const course = await database.get<Course>('courses').find(courseId);
    //     await course.toggleEnrollment();
    //     return course;
    // },

    /**
     * Synchronizes remote Supabase courses with the local database.
     * Ensures that 'is_enrolled' is preserved for existing courses.
     */
    // async syncCoursesWithRemote(remoteCourses: any[]): Promise<void> {
    //     await database.write(async () => {
    //         const coursesCollection = database.get<Course>('courses');
    //         const localCourses = await coursesCollection.query().fetch();
    //         const localMap = new Map<string, Course>();
    //         localCourses.forEach((c) => localMap.set(c.id, c));

    //         const batchToCreate: Course[] = [];
    //         const batchToUpdate: Course[] = [];

    //         for (const remote of remoteCourses) {
    //             const mapped = mapRemoteToLocalFields(remote);
    //             const existingLocal = localMap.get(mapped.id);

    //             if (existingLocal) {
    //                 // Update details from Supabase BUT ignore 'is_enrolled'
    //                 const hasChanges =
    //                     existingLocal.title !== mapped.title ||
    //                     existingLocal.description !== mapped.description ||
    //                     existingLocal.instructor !== mapped.instructor ||
    //                     existingLocal.image_url !== mapped.image_url ||
    //                     existingLocal.rating !== mapped.rating ||
    //                     existingLocal.price !== mapped.price ||
    //                     existingLocal.duration !== mapped.duration ||
    //                     existingLocal.lessons !== mapped.lessons ||
    //                     existingLocal.level !== mapped.level ||
    //                     existingLocal.category !== mapped.category ||
    //                     existingLocal.tags !== mapped.tags;

    //                 if (hasChanges) {
    //                     batchToUpdate.push(
    //                         existingLocal.prepareUpdate((record) => {
    //                             record.title = mapped.title;
    //                             record.description = mapped.description;
    //                             record.instructor = mapped.instructor;
    //                             record.image_url = mapped.image_url;
    //                             record.rating = mapped.rating;
    //                             record.price = mapped.price;
    //                             record.duration = mapped.duration;
    //                             record.lessons = mapped.lessons;
    //                             record.level = mapped.level;
    //                             record.category = mapped.category;
    //                             record.tags = mapped.tags;
    //                         })
    //                     );
    //                 }
    //             } else {
    //                 // Insert new course with is_enrolled set to false by default
    //                 batchToCreate.push(
    //                     coursesCollection.prepareCreate((record) => {
    //                         record._raw.id = mapped.id; // WatermelonDB allows setting custom ID
    //                         record.title = mapped.title;
    //                         record.description = mapped.description;
    //                         record.instructor = mapped.instructor;
    //                         record.image_url = mapped.image_url;
    //                         record.rating = mapped.rating;
    //                         record.price = mapped.price;
    //                         record.duration = mapped.duration;
    //                         record.lessons = mapped.lessons;
    //                         record.level = mapped.level;
    //                         record.category = mapped.category;
    //                         record.tags = mapped.tags;
    //                         record.is_enrolled = false;
    //                     })
    //                 );
    //             }
    //         }

    //         const allBatch = [...batchToCreate, ...batchToUpdate];
    //         if (allBatch.length > 0) {
    //             await database.batch(...allBatch);
    //         }
    //     });
    // },
};
