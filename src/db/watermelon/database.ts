import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema } from './schema/schema';
import { Course } from './models/Course';
import { SyncQueue } from './models/SyncQueue';

const adapter = new SQLiteAdapter({
    schema,
});

export const database = new Database({
    adapter,
    modelClasses: [Course, SyncQueue],
});