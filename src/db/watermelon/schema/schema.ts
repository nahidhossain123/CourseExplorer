import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'courses',
            columns: [
                { name: 'course_id', type: 'string' },

                { name: 'title', type: 'string' },
                { name: 'description_short', type: 'string' },
                { name: 'instructor_name', type: 'string' },
                { name: 'duration_weeks', type: 'number' },
                { name: 'price_usd', type: 'number' },
                { name: 'is_premium', type: 'boolean' },
                { name: 'is_enrolled', type: 'boolean' },
                { name: 'tags', type: 'string' },
                { name: 'rating', type: 'number' },

                { name: 'updated_at', type: 'number' },

                { name: 'is_dirty', type: 'boolean' },
                { name: 'is_deleted', type: 'boolean' },
            ],
        }),

        tableSchema({
            name: 'sync_queue',
            columns: [
                { name: 'table', type: 'string' },
                { name: 'operation', type: 'string' }, // create | update | delete
                { name: 'record_id', type: 'string' },
                { name: 'payload', type: 'string' },
                { name: 'status', type: 'string' }, // pending | done
                { name: 'created_at', type: 'number' },
            ],
        }),
    ],
});