import { supabase } from '../services/supabaseClient';
import { Database } from '@nozbe/watermelondb';

export async function pushChanges(db: Database) {
    const queue = await db.get('sync_queue').query().fetch();

    for (const item of queue) {
        try {
            if (item.operation === 'create' || item.operation === 'update') {
                await supabase.from(item.table).upsert(item.payload);
            }

            if (item.operation === 'delete') {
                await supabase
                    .from(item.table)
                    .update({ deleted_at: new Date().toISOString() })
                    .eq('course_id', item.recordId);
            }

            await item.markAsDone();
        } catch (err) {
            console.log('Push failed', err);
        }
    }
}