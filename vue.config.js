module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/lor-master-leaderboard/'
    : '/',
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
            args[0].title = "LoR Master Leaderboard";
            return args;
        })
  }
}