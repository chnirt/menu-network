export const env = process.env
export const IS_DEVELOP = true && process.env.NODE_ENV === 'develop'

export const eventNames = {
  SCREEN_VIEW: 'screen_view',
  LOGIN: 'login',
  REGISTER: 'register',
}
