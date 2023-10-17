module.exports = {
    runtimeCompiler: true,

    chainWebpack: (config) => {
        // GraphQL Loader
        config.module
            .rule('mjs')
            .test(/\.mjs$/)
            .use('file-loader')
            .loader('file-loader')
            .end()
    },
}
