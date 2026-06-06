export type SyncOperation = 'create' | 'update' | 'delete';

export interface SyncQueueItem {
    id: string;
    table: string;
    recordId: string;
    operation: SyncOperation;
    payload: any;
    status: 'pending' | 'done';
}