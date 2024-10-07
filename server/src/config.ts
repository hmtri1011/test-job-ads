export const PAGE_SIZE = 10

export const ERRORS = {
  UNAUTHORIZED: {
    code: '@401',
    message: 'Unauthorized'
  },
  BAD_REQUEST: {
    code: '@400',
    message: 'Bad Request'
  },
  INTERNAL_SERVER_ERROR: {
    code: '@500',
    message: 'Internal Server Error'
  },
  NOT_FOUND: {
    USER: {
      code: '@404:USER',
      message: 'User not found'
    },
    JOB: {
      code: '@404:JOB',
      message: 'Job not found'
    },
    COMPANY: {
      code: '@404:COMPANY',
      message: 'Company not found'
    }
  }
}
