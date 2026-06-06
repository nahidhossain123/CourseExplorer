import { pushChanges } from './push';
import { pullChanges } from './pull';
import { Database } from '@nozbe/watermelondb';

export async function sync(db: Database, lastSync: string) {
    await pushChanges(db);
    await pullChanges(db, lastSync);
}