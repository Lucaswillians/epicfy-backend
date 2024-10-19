export interface UserAddBody {
  username?: string;
  email?: string;
  is_company?: boolean;
}

export interface UserAddData {
  username: string;
  email: string;
  is_company: boolean;
}

export interface UserRow {
  id: number,
  username: string,
  email: string,
  is_company: number,
  created_at: string
}

export interface UserInsertRow extends UserAddData {}
