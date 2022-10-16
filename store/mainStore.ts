import create from 'zustand';

interface State {
  handPosition: number;
  setHandPosition: (newHandPosition: number) => void;
  showVideo: boolean;
  setShowVideo: (newShowVideo: boolean) => void;
}

const useMainStore = create<State>((set) => ({
  handPosition: 0,
  setHandPosition: (newHandPosition) =>
    set(() => ({ handPosition: newHandPosition })),
  showVideo: false,
  setShowVideo: (newShowVideo) => set(() => ({ showVideo: newShowVideo })),
}));

export default useMainStore;
