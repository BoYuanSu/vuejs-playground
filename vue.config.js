module.exports = {
  productionSourceMap: false,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/vuejs-playground/' : '/',
  lintOnSave: process.env.NODE_ENV !== 'production'
}
