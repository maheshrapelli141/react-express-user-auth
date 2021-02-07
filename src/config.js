const config = {
    apiUrl: process.env.API_URL || 'http://localhost:8080',
    mongo: {
      url: 'mongodb://localhost:27017/test'
    },
    JWT: {
      secret: process.env.JWT_SEC || 'HelloWorld',
      expire: 28800000,
    },
    CRYPTR: {
      password: process.env.cryptrPassword || 'privateKeyPassword@123',
    },
}

module.exports = config;