import create from 'zustand';
import { popupType } from 'utils/freezeTypes';

type PopupType = keyof typeof popupType;

type Config = {
  type: PopupType;
  option?: any;
}

type PopupState = {
  visible: boolean;
  config: Config | null;
  openPopup: (config: Config) => void;
  closePopup: () => void;
  getOption: () => any;
}

export const usePopupStore = create<PopupState>((set, get) => ({
  visible: false,
  config: null,
  openPopup: (config) => set((state) => ({
      ...state,
      visible: true,
      config,
    })),
  closePopup: () => set({ visible: false, config: null }),
  getOption: () => get().config?.option,
}));