import './config/module-alias'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { config } from '@/infra/postgres/helpers'

import 'reflect-metadata'
import { createConnections } from 'typeorm'

createConnections([config])
  .then(() => app.listen(env.port, () => { console.log(`Server running at http://localhost:${env.port}`) }))
  .catch(console.error)
