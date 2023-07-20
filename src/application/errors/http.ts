export class ServerError extends Error {
  constructor (error?: Error | undefined) {
    super('Server failed. Try again soon')
    this.name = 'Server Error'
    this.stack = error?.stack
  }
}
