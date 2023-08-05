export const env = process.env
export const eventNames = {
  SCREEN_VIEW: 'screen_view',
  LOGIN: 'login',
  REGISTER: 'register',
}

export const IS_DEVELOP = true && process.env.NODE_ENV === 'development'
export const ORIGIN = window.location.origin
