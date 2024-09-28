// models/TaskApplication.ts

export interface TaskApplication {
    service_id: string;
    tasker_id: string;
    status: 'pending' | 'accepted' | 'rejected';
    applied_at: Date;
}