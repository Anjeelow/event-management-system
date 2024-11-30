export type User = {
    user_id: number
    username: string
    first_name: string | null
    last_name: string | null
    email: string | null
    password_hash: string | null
    profile_picture_url: string | null
    phone_number: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}

export type Event = {
    event_id: number;
    user_id: number;
    title: string | null;
    description: string | null;
    date: Date | null;
    start_time: Date | null;
    end_time: Date | null;
    address: string | null;
    max_attendeed: number | number;
    is_public: boolean | null;
    event_image_url: string | null;
    category_id: number | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
}