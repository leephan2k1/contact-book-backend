const handlePromise = (promise) => {
  return promise
    .then((data) => [null, data])
    .catch((err) => [err, undefined]);
};

module.exports = handlePromise;