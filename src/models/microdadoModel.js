const mongoose = require('mongoose');

const MicrodadoSchema = new mongoose.Schema({});

module.exports = mongoose.models.Microdado || mongoose.model('Microdado', MicrodadoSchema);

