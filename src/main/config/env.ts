export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '983398992805030',
    clientSecret: process.env.FB_CLIENT_SECRET ?? 'deace0b01bde316541d1495755b1ce16'
  },
  port: process.env.PORT ?? '8080',
  jwtSecret: process.env.JWT_SECRET ?? 'd08f98ds7'
}
