export interface ReminderType {
    id: number;
    text: string;
  }
  
  export interface TaskType {
    id: number;
    title: string;
    description: string;
    pinned: boolean;
    reminders: ReminderType[];
  }
  