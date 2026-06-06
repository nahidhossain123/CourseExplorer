import { supabase } from "../../../services/supabaseClient";
import { pushChanges } from "../../../sync/push";


jest.mock('../services/supabaseClient', () => ({
    supabase: {
        from: jest.fn(() => ({
            upsert: jest.fn(),
        })),
    },
}));

describe('Sync Repository', () => {
    it('should push create operations to server', async () => {
        const db = {
            get: () => ({
                query: () => ({
                    fetch: async () => [
                        {
                            operation: 'create',
                            table: 'courses',
                            payload: { id: '1', title: 'React Native' },
                        },
                    ],
                }),
            }),
        } as any;

        await pushChanges();

        expect(supabase.from).toHaveBeenCalledWith('courses');
    });
});