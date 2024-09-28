export interface Task {
    id: string;
    service_id: string;
    datetime: Date;
    location: string;
    status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
    user_id: string;
    tasker_id?: string;
    instruction?: string;
    created_at?: Date;
    updated_at?: Date;
}