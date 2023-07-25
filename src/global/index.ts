type ILoading = {
  loading: any;
  set: (loadingInput: any) => void;
  get: () => {
    show: () => void;
    hide: () => void;
  };
};

export const Loading: ILoading = {
  loading: null,
  set: (loadingInput: any) => {
    Loading.loading = loadingInput;
  },
  get: () => Loading.loading,
};
