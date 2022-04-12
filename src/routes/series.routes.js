const SeriesService = require('../services/series.service');
const SerieModel = require('../models/series.model');
const service = new SeriesService();
const express = require('express');
const serieRoutes = express.Router();

serieRoutes.post('/serie', async (req, res, next) => {
  try {
    const serie = SerieModel(req.body);
    const data = await service.createSerie(serie);
    //res.status(201).json({ data });
  } catch (error) {
    next(error)
    //res.status(404).json({message: error,});
  }
});

serieRoutes.get('/', async (req, res, next) => {
  try {
    const data = await service.listSeries();
    //res.status(200).json({ data });
  } catch (error) {
    next(error)
    //res.status(404).json({message: error});
  }
});


serieRoutes.get('./:actorName', async (req, res, next)=>{
  try {
    const { actorName } = req.params;
    const data = await service.filterSerie(actorName);
    res.json(data);
  } catch (error) {
    next(error)
  }
})

serieRoutes.get('/:actorName', async (req, res, next)=>{
   try {
     const { actorName } = req.params;
     const data = await service.listSeries()
      //variable para guardar todas las series que encuentre
     const series = []

     data.forEach(async serie => {
       //se accede al arreglo de cast que esta en features_seasons
       const actores =serie.features_seasons[0][0].cast

       //se filtra y se agregan al arreglo series
       await actores.forEach( actor => {
         if (actor.toLowerCase() == actorName.toLowerCase()) {
           series.push(serie)
         }
        })
     });
   } catch (error) {
     next(error)
   }
})


serieRoutes.get('/date/:premier_date', async (req, res, next)=>{
  try {
    const { premier_date } = req.params;
    const data = await service.listSeries()
    // variable para guardar todas las series que encuentre
    const series = []

    data.forEach(async serie => {
      //se filtra y se agregan al arreglo series
      //con fecha de estreno de la primer temporada igual
      const date =serie.features_seasons[0][0].premier_date
      if (date == premier_date) {
        series.push(serie)
      }
    });
    //res.status(200).json({ series })
  } catch (error) {
    next(error)
    //res.status(204).json({ message: error });
  }
})

serieRoutes.put('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params;
    const { serie, num_seasons, original_languaje, features_seasons } = req.body;
    const data = await service.editSerie(
      serieId,
      serie,
      num_seasons,
      original_languaje,
      features_seasons
    );
    res.status(200).json({ data });
  } catch (error) {
    next(error)
    //res.status(204).json({ message: err });
  }
});

serieRoutes.delete('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params;
    const data = await service.removeSerie(serieId);
    //res.status(200).json({ data });
  } catch (error) {
    next(error)
    //res.status(204).json({ message: err });
  }
});

module.exports = serieRoutes;