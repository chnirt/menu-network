type ILoading = {
  loading: any;
  set: (loadingInput: any) => void;
  get: () => {
    show: () => void;
    hide: () => void;
  };
};

export const Loading: ILoading = {
  loading: {
    show: () => {},
    hide: () => {},
  },
  set: (loadingInput: any) => {
    if (loadingInput === undefined) return;
    Loading.loading = loadingInput;
  },
  get: () => Loading.loading,
};
