export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validateRegister = ({
  name,
  email,
  password,
  passwordConfirm,
}: any) => {
  if (!emailRegex.test(email)) throw 'INVALID_EMAIL'

  if (!name) throw 'INVALID_NAME'

  if (!password || password !== passwordConfirm) throw 'INVALID_PASSWORD'
}
