const express  = require('express')
const seriesRoutes = require('./series.routes');


function routerApi(app) {
    const router = express.Router();
    app.use('/api/v2', router);
    router.use('/series', seriesRoutes);
  }
  
module.exports = routerApi;