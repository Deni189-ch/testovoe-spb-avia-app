const createProxyMiddleware = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api/*',
    createProxyMiddleware({
      target: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/',
      changeOrigin: true,
      paathRewrite: {
        '^/api':'/',
      },
    })
  )
}