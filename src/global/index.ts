type ILoading = {
    loading: any
    set: (loadingInput: unknown) => void
    get: () => {
        show: () => void
        hide: () => void
    }
}

export const Loading: ILoading = {
    loading: {
        show: () => {},
        hide: () => {},
    },
    set: (loadingInput: unknown) => {
        if (loadingInput === undefined) return
        Loading.loading = loadingInput
    },
    get: () => Loading.loading,
}
