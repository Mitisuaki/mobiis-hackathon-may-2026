export interface Meeting {
  id: string;
  subject: string;
  startDateTime: string;
  endDateTime: string;
}

export interface Transcript {
  id: string;
  createdDateTime: string;
}

export interface TranscriptContent {
  plainText?: string;
  segments?: Array<{ speaker: string; text: string }>;
  content?: string;
}
