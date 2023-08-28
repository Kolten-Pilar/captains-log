const mongoose = require("mongoose");

const logsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  entry: { type: String, required: true },
  shipIsBroken: {type: Boolean, default: true}, 
}, {timestamps: true});

const logsDB = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


const Log = logsDB.model('Logs', logsSchema);

module.exports = Log;