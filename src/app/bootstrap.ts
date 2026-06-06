

import { courseRepository } from '../repositories/courseRepository';
import { useCourseStore } from '../store/courseStore';
import { syncController } from '../sync/syncController';

export async function bootstrapApp() {
    const store = useCourseStore.getState();

    try {
        store.setLoading(true);

        // 1. Load local DB first (offline-first UI)
        const localCourses = await courseRepository.getAllCourses();
        store.setCourses(localCourses);

        // 2. Start network listener
        syncController.listenNetwork();

        // // 3. Run initial sync (if needed)
        // await syncController.runSync();

        store.setLoading(false);
    } catch (err) {
        console.log('Bootstrap error:', err);
        store.setLoading(false);
    }
}