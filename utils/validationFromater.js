const joiErrorFormatter = (resErrors) => {
  const errors = {}
  const details = resErrors.details
  details.map(d => {
    errors[d.path] = [d.message]
  })
  return errors
}

const mongooseErrorFormatter = (resError) => {
  const errors = {}
  const details = resError.errors
  for (const key in details) {
    errors[key] = [details[key].message]
  }
  return errors
}

module.exports = { joiErrorFormatter, mongooseErrorFormatter }
