import validator from 'validator'

export const validMail = value => {
  let isValid = false
  value = value.trim()
  if (value.length >= 1 && validator.isEmail(value)) {
    isValid = true
  }
  return isValid
}

export const validPassword = value => {
  let isValid = false
  value = value.trim()
  if (value.length >= 8) {
    isValid = true
  }
  return isValid
}

export const confirmPassword = (pwd, confirmpwd) => {
  let isValid = false
  if (pwd === confirmpwd) {
    isValid = true
  }
  return isValid
}
