const tryCatch = (methodName, callback) => {
  try {
    callback();
  } catch (err) {
    displayError(methodName, err);
  }
};

const displayError = (methodName, err) => {
  return console.error(
    `An error occurred in the ${methodName} function:`,
    err.message
  );
};

module.exports = {
  displayError,
  tryCatch,
};
