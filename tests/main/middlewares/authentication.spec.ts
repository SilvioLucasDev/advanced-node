import { ForbiddenError } from '@/application/errors'
import { auth } from '@/main/middlewares'
import { app } from '@/main/config/app'

import request from 'supertest'

describe('Authentication Middleware', () => {
  it('should return 403 if authorization header was not provider', async () => {
    app.get('/fake_routes', auth)

    const { status, body } = await request(app).get('/fake_routes')

    expect(status).toBe(403)
    expect(body.error).toBe(new ForbiddenError().message)
  })
})
