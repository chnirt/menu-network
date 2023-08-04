export type ILoading = {
  get:
    | any
    | {
        show: () => void
        hide: () => void
      }
  set: (loadingInput: unknown) => void
  
}
