import React from 'react'
import { usePopupStore } from 'stores/usePopupStore'
import { popupType } from 'utils/freezeTypes';
import PopupTemplate from './PopupTemplate';
import KeywordNoteDetailPopup from './KeywordNoteDetailPopup';

/**
 * @see https://github.com/Esportskorea/vss_frontent/blob/release/src/components/popup/GlobalPopup.jsx
 */
export default function GlobalPopup() {
  const {visible, config} = usePopupStore();
  if (visible) {
    const { type } = config!;
    return <PopupTemplate>
      {type === popupType.KEYWORD_NOTE_DETAIL && <KeywordNoteDetailPopup /> }
    </PopupTemplate>
  }

  return <React.Fragment />
}



