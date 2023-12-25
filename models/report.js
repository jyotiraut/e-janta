const mongoose = require('mongoose');

const problemReportSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User1'
  }
});

const ProblemReport = mongoose.model('ProblemReport', problemReportSchema);

module.exports = ProblemReport;
