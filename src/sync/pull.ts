import { supabase } from '../services/supabaseClient';
import { database } from '../db/watermelon/database';
import { Course } from '../db/watermelon/models/Course';

export async function pullChanges(lastSync: number | null) {
    const lastSyncISO = lastSync
        ? new Date(lastSync).toISOString()
        : new Date(0).toISOString();

    const { data, error } = await supabase
        .from('courses')
        .select('*')


    if (error) {
        console.log('Pull error:', error);
        return;
    }

    console.log('Data', data)

    if (!data?.length) return;

    await database.write(async () => {
        const coursesCollection = database.get<Course>('courses');

        for (const item of data) {
            try {
                const existing = await coursesCollection
                    .query()
                    .fetch();

                const found = existing.find(
                    (c) => c.courseId === item.course_id
                );

                if (found) {
                    // ✅ UPDATE
                    await found.update((c) => {
                        c.title = item.title;
                        c.descriptionShort = item.description_short;
                        c.instructorName = item.instructor_name;
                        c.durationWeeks = item.duration_weeks;
                        c.priceUsd = item.price_usd;
                        c.isPremium = item.is_premium;
                        c.tags = item.tags;
                        c.rating = item.rating;
                        c.updatedAt = new Date(item.updated_at).getTime();
                        c.isDirty = false;
                        c.isDeleted = item.is_deleted ?? false;
                    });
                } else {
                    // ✅ CREATE
                    await coursesCollection.create((c) => {
                        c.courseId = item.course_id;
                        c.title = item.title;
                        c.descriptionShort = item.description_short;
                        c.instructorName = item.instructor_name;
                        c.durationWeeks = item.duration_weeks;
                        c.priceUsd = item.price_usd;
                        c.isPremium = item.is_premium;
                        c.tags = item.tags;
                        c.rating = item.rating;
                        c.updatedAt = new Date(item.updated_at).getTime();
                        c.isDirty = false;
                        c.isDeleted = item.is_deleted ?? false;
                    });
                }
            } catch (e) {
                console.log('Item sync error:', e);
            }
        }
    });
}