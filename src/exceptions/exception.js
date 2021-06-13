
const InvalidFields = require('./errors/invalid-fields');
const InternalServerError = require('./errors/internal-server-error');


function getKnownError(error) {
  
  if (error.type == 'entity.parse.failed') {
    error = new InvalidFields('JSON error em require.body');
  }

  const knownErrors = [
    'InvalidFields',
    'InternalServerError'
  ]

  if (knownErrors.find((item => item == error.name))) {
    return error;
  }

  return new InternalServerError();

};

module.exports = {
  getKnownError,
  InvalidFields,
  InternalServerError,
};
