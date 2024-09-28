// src/lib/models/Invitation.ts

export interface Invitation {
    id: string; // Unique identifier
    sentby_id: string; // The user who sent the invitation (customer)
    sentto_id: string; // The user who receives the invitation (tasker)
    task_id: string; // The associated task
    invitation_status: 'pending' | 'accepted' | 'declined';
    created_at?: Date;
    updated_at?: Date;
  }