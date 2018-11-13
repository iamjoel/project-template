module.exports = (str) => {
  return str.replace( /[_|-]([a-z])/g, function( all, letter ) {
    return letter.toUpperCase();
  })
}