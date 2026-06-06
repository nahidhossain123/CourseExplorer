import { database } from "../db/watermelon/database";
import { SyncQueue } from "../db/watermelon/models/SyncQueue";

type Operation = 'create' | 'update' | 'delete';

export const syncRepository = {
    async enqueue({
        table,
        operation,
        recordId,
        payload,
    }: {
        table: string;
        operation: Operation;
        recordId: string;
        payload: any;
    }) {
        await database.write(async () => {
            await database.get<SyncQueue>('sync_queue').create((item) => {
                item.operation = operation;
                item.recordId = recordId;
                item.payload = JSON.stringify(payload);
                item.status = 'pending';
                item.createdAt = Date.now();
            });
        });
    },
};