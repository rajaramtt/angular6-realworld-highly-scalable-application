import { Attachments } from './attachments.model';

export interface Application {
    id ?: number;
    type: string;
    notes: string;
    attachments: Attachments[];
  }

 

