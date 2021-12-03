export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validateRegister = (user: any) => {
  if (!emailRegex.test(user.email)) throw 'INVALID_EMAIL'

  if (user.dni.toString().length != 8) throw 'INVALID_DNI'

  if (!user.name) throw 'INVALID_NAME'

  if (!user.lastname) throw 'INVALID_LASTNAME'

  if (
    !user.password ||
    !user.passwordConfirm ||
    user.password !== user.passwordConfirm
  )
    throw 'INVALID_PASSWORD'

  if (user.password.length < 6) throw 'INVALID_PASSWORD_LENGTH'

  if (!user.typeUser) throw 'INVALID_TYPEUSER'

  if (user.typeUser === 'PATIENT' && !user.obraSocial)
    throw 'INVALID_OBRASOCIAL'

  if (user.typeUser === 'SPECIALIST' && !user.especialidad)
    throw 'INVALID_ESPECIALIDAD'

  if (
    user.typeUser === 'SPECIALIST' &&
    user.especialidad.includes('OTHER') &&
    !user.other
  )
    throw 'INVALID_ESPECIALIDAD_OTHER'

  if (!user.photo || user.photo.length < 1) throw 'INVALID_PHOTO'

  if (user.typeUser === 'PATIENT' && user.photo.length != 2)
    throw 'INVALID_PHOTO_LENGTH'
}
