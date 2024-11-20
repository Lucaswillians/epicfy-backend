export interface ideaEntity {
  id: number,
  title: string,
  description: string,
  status: string,
  is_pinned: boolean,
  created_at: string,
  updated_at: string,
}

export interface IdeaData {
  title: string,
  description: string,
  status: string,
  is_pinned: boolean,
}