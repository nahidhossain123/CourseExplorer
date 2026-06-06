import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class SyncQueue extends Model {
    static table = 'sync_queue';

    @field('operation') operation!: 'create' | 'update' | 'delete';
    @field('payload') payload!: string;
    @field('record_id') recordId!: string;
    @field('status') status!: string;
}