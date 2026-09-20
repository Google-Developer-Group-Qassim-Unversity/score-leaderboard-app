export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
    /** Stable identifier from the backend (e.g. `token_malformed`).
     *  Switch on this rather than on `message`: `message` is the backend's
     *  English `detail`, written for logs, and is not safe to show a user. */
    public code?: string
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
