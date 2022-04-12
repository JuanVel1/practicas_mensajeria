const serieSchema = require('../models/series.model');
const Boom = require('@hapi/boom')
class SeriesService{
  async createSerie(serie) {
    serie.save();
    return serie;
  }

  async listSeries() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(serieSchema.find()), 3000);
    });
  }

  async showSerie(serieId) {
    return serieSchema.findById({ _id: serieId }).then(
      (serieFound)=>{
        if(!serieFound) throw Boom.notFound('No se encontro la serie')
        return serieFound
      }
    );
  }

  async filterSerie(actorName){
    return listSeries().then(
      (data)=>{
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

        if(!series) throw Boom.notFound('No se encontraron coincidencias')
        return series
        });
      })
    }

  async editSerie(
    serieId,
    serie,
    num_seasons,
    original_languaje,
    features_seasons
  ) {
    return serieSchema.findById({ _id: serieId }).then(() => {
      if (!serieId) throw Boom.notFound('Serie no encontrada');
      return serieSchema.updateOne(
        { serieId },
        { serie, num_seasons, original_languaje, features_seasons }
      );
    });
  }

  async removeSerie(serieId) {
    return serieRemove = serieSchema.findById({ _id: serieId }).then(
      (serieFound)=>{
        if(!serieFound) throw Boom.notFound('Serie no encontrada');
        return serieSchema.deleteOne(serieRemove);
      }
    );
  }
}

module.exports = SeriesService;