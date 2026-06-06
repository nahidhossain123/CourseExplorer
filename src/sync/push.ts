import { supabase } from '../services/supabaseClient';
import { database } from '../db/watermelon/database';
import { SyncQueue } from '../db/watermelon/models/SyncQueue';

export async function pushChanges() {
    const queueItems = await database
        .get<SyncQueue>('sync_queue')
        .query()
        .fetch();

    for (const item of queueItems) {
        if (item.status === 'done') continue;

        try {
            const payload = JSON.parse(item.payload);

            // ✅ CREATE / UPDATE
            if (item.operation === 'create' || item.operation === 'update') {
                const { error } = await supabase
                    .from('courses')
                    .upsert(payload, {
                        onConflict: 'course_id',
                    });

                if (error) throw error;
            }

            // ❌ DELETE (soft delete)
            if (item.operation === 'delete') {
                const { error } = await supabase
                    .from('courses')
                    .update({ is_deleted: true })
                    .eq('course_id', item.recordId);

                if (error) throw error;
            }

            // ✅ mark done safely
            await database.write(async () => {
                await item.update((q) => {
                    q.status = 'done';
                });
            });
        } catch (err) {
            console.log('Push failed:', err);
        }
    }
}