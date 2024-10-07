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
  PERMISSION_DENIED: {
    code: '@403',
    message: 'Permission denied, you are not allowed to perform this action or access this resource'
  },
  FORBIDDEN: {
    code: '@403',
    message: 'Forbidden'
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
