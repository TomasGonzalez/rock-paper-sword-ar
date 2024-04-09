import create from 'zustand';

interface State {
  gameOver: string,
  setGameOver: (newLabel) => void,
  handGesture2: number[];
  handGesture: number[];
  setHandGesture2: (newHandPosition: number[]) => void;
  setHandGesture: (newHandPosition: number[]) => void;
  showVideo: boolean;
  setShowVideo: (newShowVideo: boolean) => void;
}

const useMainStore = create<State>((set) => ({
  gameOver: '',
  setGameOver: (newLabel) => set(() => ({gameOver: newLabel })),
  handGesture2: [-1],
  handGesture: [-1],
  setHandGesture2: (newHandGesture) =>
    set(() => ({ handGesture2: newHandGesture })),
  setHandGesture: (newHandGesture) =>
    set(() => ({ handGesture: newHandGesture })),
  showVideo: true,
  setShowVideo: (newShowVideo) => set(() => ({ showVideo: newShowVideo })),
}));

export default useMainStore;
