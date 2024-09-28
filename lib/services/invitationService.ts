// src/lib/services/invitationService.ts

export async function createInvitations(taskId: string, taskerIds: string[]) {
    try {
      const promises = taskerIds.map(taskerId => {
        return databases.createDocument('your-database-id', 'invitations-collection-id', uniqueID(), {
          task_id: taskId,
          tasker_id: taskerId,
          status: 'pending',
        }, [
          'user:' + taskerId,
          'user:' + taskerId,
        ]);
      });
  
      await Promise.all(promises);
    } catch (error) {
      console.error('Error creating invitations:', error);
      throw error;
    }
  }