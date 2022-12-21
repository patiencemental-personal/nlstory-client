import create from 'zustand';
import { floatingPopupType } from 'utils/freezeTypes';

type FloatingPopupType = keyof typeof floatingPopupType;

type mousePosition = {
  x: number;
  y: number;
}

type Config = {
  type: FloatingPopupType;
  mousePosition: mousePosition;
  option?: any;
}

type FloatingPopupState = {
  visible: boolean;
  config: Config | null;
  openFloatingPopup: (config: Config) => void;
  closeFloatingPopup: () => void;
  getOption: () => any;
}

export const useFloatingPopupStore = create<FloatingPopupState>((set, get) => ({
  visible: false,
  config: null,
  openFloatingPopup: (config) => set((state) => ({
    ...state,
    visible: true,
    config,
  })),
  closeFloatingPopup: () => set({ visible: false, config: null }),
  getOption: () => get().config?.option,
}));