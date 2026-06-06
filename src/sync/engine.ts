import { pushChanges } from './push';
import { pullChanges } from './pull';

export async function sync(db: any, lastSync: number | null) {
    try {
        await pushChanges();
        await pullChanges(lastSync);
    } catch (err) {
        console.log('Sync failed:', err);
    }
}