const displayError = (methodName, err) => {
  return console.error(
    `🚨 (╯°□°)╯︵ ┻━┻ 🚨 An error occurred in the ${methodName} method:`,
    err.message
  );
};

const tryCatch = (methodName, callback, parameters = {}) => {
  try {
    return callback(parameters);
  } catch (err) {
    displayError(methodName, err);
  }
};

module.exports = {
  displayError,
  tryCatch,
};
