import React from 'react'
import { usePopupStore } from 'stores/usePopupStore'
import { popupType } from 'utils/popup';
import PopupTemplate from './PopupTemplate';
import KeywordNoteDetailPopup from './KeywordNoteDetailPopup';
import MessagePopup from './MessagePopup';

export default function GlobalPopup() {
  const {visible, config} = usePopupStore();
  if (visible) {
    const { type } = config!;
    return <PopupTemplate>
      {type === popupType.MESSAGE && <MessagePopup /> }
      {type === popupType.KEYWORD_NOTE_DETAIL && <KeywordNoteDetailPopup /> }
    </PopupTemplate>
  }

  return <React.Fragment />
}



