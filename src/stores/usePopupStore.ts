import create from 'zustand';
import { popupType } from 'utils/freeze';

type PopupType = keyof typeof popupType;

type Config = {
  type: PopupType;
  option?: any;
}

type PopupState = {
  visible: boolean;
  config: Config | null;
  getOption: () => any;
  openPopup: (config: Config) => void;
  closePopup: () => void;
}

export const usePopupStore = create<PopupState>((set, get) => ({
  visible: false,
  config: null,
  getOption: () => get().config?.option,
  openPopup: (config) => set((state) => ({
      ...state,
      visible: true,
      config,
    })),
  closePopup: () => set({ visible: false, config: null }),
}));