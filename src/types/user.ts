export interface UserAddBody {
  username?: string;
  email?: string;
  is_company?: boolean;
  password?: string;
}

export interface UserAddData {
  username: string;
  email: string;
  password: string;
  is_company: boolean;
}

export interface UserRow {
  id: number,
  username: string,
  email: string,
  password: string,
  is_company: number,
  created_at: string
}

export interface UserInsertRow extends UserAddData {}

export interface UserUpdateBody {
  username?: string;
  password?: string;
}

export interface UserUpdateData {
  username: string;
  password: string;
}

export interface UserUpdateRow extends UserUpdateData {}
