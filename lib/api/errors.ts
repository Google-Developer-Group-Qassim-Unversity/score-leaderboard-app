export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string, public resourceId?: string | number) {
    super(404, `${resource}${resourceId ? ` (${resourceId})` : ''} not found`)
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(401, message)
    this.name = 'UnauthorizedError'
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Network error - please check your connection') {
    super(message)
    this.name = 'NetworkError'
  }
}
