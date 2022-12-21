import React from 'react'
import { usePopupStore } from 'stores/usePopupStore'
import { popupType } from 'utils/freezeTypes';
import DiaryEditionOrViewerPopup from './DiaryEditionOrViewerPopup';
import PopupTemplate from './PopupTemplate';
import TagEditionPopup from './TagEditionPopup';

/**
 * @see https://github.com/Esportskorea/vss_frontent/blob/release/src/components/popup/GlobalPopup.jsx
 */
export default function GlobalPopup() {
  const {visible, config} = usePopupStore();
  if (visible) {
    const { type } = config!; 
    return <PopupTemplate>
      {type === popupType.DIARY_EDITION_OR_VIEWER && <DiaryEditionOrViewerPopup />}
      {type === popupType.TAG_EDITION && <TagEditionPopup />}
    </PopupTemplate>
  }

  return <React.Fragment />
}



