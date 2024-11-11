const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/apis", {
      target: "https://v2.coginsight.net",
      changeOrigin: true,
      pathRewrite: {
        "^/apis": "/apis",
      },
    })
  );
};
