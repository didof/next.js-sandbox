const { parsed: localEnv } = require('dotenv').config()

module.exports = {
  env: {
    BASE_API_URL: localEnv.BASE_API_URL,
    SERVER_API_URL: localEnv.SERVER_API_URL
  },
  webpack: ((config, { isServer }) => {
    if(!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  })
}