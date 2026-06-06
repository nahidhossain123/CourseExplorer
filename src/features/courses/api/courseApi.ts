import { supabase } from "../../../services/supabaseClient";


export class CourseApi {
    async fetchCourses(lastSyncedAt?: string) {
        let query = supabase
            .from("courses")
            .select("*");

        if (lastSyncedAt) {
            query = query.gt("updated_at", lastSyncedAt);
        }

        const { data, error } = await query;

        if (error) throw error;

        return data;
    }
}