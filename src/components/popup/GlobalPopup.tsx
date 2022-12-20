import React from 'react'
import { usePopupStore } from 'stores/usePopupStore'
import { popupType } from 'utils/freeze';
import DiaryEditionOrViewerPopup from './DiaryEditionOrViewerPopup';

/**
 * @see https://github.com/Esportskorea/vss_frontent/blob/release/src/components/popup/GlobalPopup.jsx
 */
export default function GlobalPopup() {
  const {visible, config} = usePopupStore();
  if (visible) {
    /**
     * !
     * The ! after config is the non-null assertion operator,
     * which tells the TypeScript compiler that the variable is definitely not null or undefined.
     */
    const { type } = config!; 
    if (type === popupType.DIARY_EDITION_OR_VIEWER) {
      return <DiaryEditionOrViewerPopup />
    }
  }

  return <React.Fragment />
}



