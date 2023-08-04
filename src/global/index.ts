import { ILoading } from './type'

export const Loading: ILoading = {
  get: {
    show: () => {},
    hide: () => {},
  },
  set: (loadingInput: unknown) => {
    if (loadingInput === undefined) return
    Loading.get = loadingInput
  },
}
