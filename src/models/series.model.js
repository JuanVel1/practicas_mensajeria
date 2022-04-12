const mongoose = require('mongoose')
const serieSchema = mongoose.Schema({
  serie:{
    type:String,
    require:true
  },
  num_seasons:{
    type:Number,
    require:true
  },
  original_languaje:{
    type:String,
    require:true
  },
  features_seasons:{
    type:Array,
    require:true,
    season_number:{
      type:Number,
      require:true
    },
    season_name:{
      type:String,
      require:true
    },
    premier_date:{
      type:Date,
      require:true
    },
    cast:{
      type:Array,
      require:true,
    },
    episodes:{
      type:Array,
      require:true,
      episode_name:{
        type:String,
        require:true
      },
      time_duration:{
        type:Number,
        require:true
      }
    }
  }
})



module.exports = mongoose.model('SerieCollection', serieSchema)