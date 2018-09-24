let {mongoose} = require('./../database/db.js')
let validator = require('validator');
let ObjectId = mongoose.Types.ObjectId;
let Schema = mongoose.Schema;

let urlSchema = new Schema({
    originalUrl: {
        type:String,
        required:true,
        minlength:10,
        validate: {
            validator: function(data) {
              return validator.isURL(data)
            },
            message: `Not a valid URL`
          },
    },
    shortUrl: {
        type: String
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
  });

let Url = mongoose.model('Url',urlSchema);

module.exports = ({Url,ObjectId})

