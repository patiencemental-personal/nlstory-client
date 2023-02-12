import React from 'react'
import { useFloatingPopupStore } from 'stores/useFloatingPopupStore';
import { usePopupStore } from 'stores/usePopupStore';
import { popupType, tagEditionPopupModeType } from 'utils/freezeTypes';
import { useAuthContext } from 'contexts/AuthContext';
import { useDispatch } from 'react-redux';
import { sDeleteTag } from 'stores/slices/tagDiarySlice';

export default function TagManagementSelectionFloatingPopup() {
  const { getOption, closeFloatingPopup } = useFloatingPopupStore();
  const { tag } = getOption();
  const { openPopup } = usePopupStore();
  const { uid } = useAuthContext();
  const dispatch = useDispatch();

  const openTagEditionPopup = () => {
    closeFloatingPopup();
    openPopup({
      type: popupType.TAG_EDITION,
      option: { mode: tagEditionPopupModeType.UPDATION, tag }
    });
  }
  
  const deleteTag = () => {
    // closeFloatingPopup();
    // fDeleteTag(uid, tag.id)
    //   .then(() => dispatch(sDeleteTag(tag.id)))
  }

  return (
    <div className='bg-sgnr-blue rounded p-2 font-bold'>
      <button onClick={openTagEditionPopup}>수정</button>
      <span> | </span>
      <button onClick={deleteTag}>삭제</button>
    </div>
  )
}
