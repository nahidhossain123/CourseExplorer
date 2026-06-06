import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class Course extends Model {
    static table = 'courses';

    @field('course_id') courseId!: string;
    @field('title') title!: string;
    @field('description_short') descriptionShort!: string;
    @field('instructor_name') instructorName!: string;

    @field('duration_weeks') durationWeeks!: number;
    @field('price_usd') priceUsd!: number;

    @field('is_premium') isPremium!: boolean;

    @field('tags') tags!: string; // or string[] depending on your schema
    @field('rating') rating!: number;

    @field('updated_at') updatedAt!: number;
    @field('created_at') createdAt!: number;
    @field('is_dirty') isDirty!: boolean;
    @field('is_deleted') isDeleted!: boolean;
}