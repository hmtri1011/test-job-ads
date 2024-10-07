export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: string
  role: UserRole
  companyId: string
  iat: number
  exp: number
}
