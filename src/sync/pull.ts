import { supabase } from '../services/supabaseClient';
import { Database } from '@nozbe/watermelondb';

export async function pullChanges(db: Database, lastSync: string) {
    const { data, error } = await supabase
        .from('courses')
        .select('*')
        .gt('last_updated', '2000-01-01T00:00:00Z');
    console.log('GetData', data, error)
    await db.write(async () => {
        const courses = db.get('courses');

        for (const item of data || []) {
            await courses.create(record => {
                record.courseId = item.course_id;
                record.title = item.title;
                record.updatedAt = new Date(item.updated_at).getTime();
            });
        }
    });
}