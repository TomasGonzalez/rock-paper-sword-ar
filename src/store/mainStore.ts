import create from 'zustand';

interface State {
  handGesture: number[];
  setHandGesture: (newHandPosition: number[]) => void;
  showVideo: boolean;
  setShowVideo: (newShowVideo: boolean) => void;
}

const useMainStore = create<State>((set) => ({
  handGesture: [-1],
  setHandGesture: (newHandGesture) =>
    set(() => ({ handGesture: newHandGesture })),
  showVideo: true,
  setShowVideo: (newShowVideo) => set(() => ({ showVideo: newShowVideo })),
}));

export default useMainStore;
