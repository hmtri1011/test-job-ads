export interface JobQueryParams {
  number: string
  size: string
}

export interface JobRequest {
  companyId: string
  currentPage: number
  pageSize: number
}

export interface DecodedToken {
  id: string
  role: string
  companyId: string
}
