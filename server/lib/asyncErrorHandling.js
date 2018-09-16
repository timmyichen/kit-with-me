// using async/await by itself will make errors fail silently.
// this function will return an array of two elements:
// 0 - error
// 1 - actual result returned by promise
module.exports = function run(promise) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
};
