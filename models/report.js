const mongoose = require('mongoose');

const problemReportSchema = new mongoose.Schema({
    title: String,
    description: String,
    image:String

  });

  
  
  
  const ProblemReport = mongoose.model('ProblemReport', problemReportSchema);
  module.exports= ProblemReport