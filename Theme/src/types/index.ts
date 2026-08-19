export interface NoteMedia {
  uri: string;
  type: 'image' | 'video';
  name?: string;
  mimeType?: string;
}

export interface NoteLink {
  name: string;
  url: string;
}