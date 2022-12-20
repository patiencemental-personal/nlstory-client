import React from 'react'
import { usePopupStore } from 'stores/usePopupStore';
import { popupType, diaryPopupModeType } from 'utils/freeze';

export default function DiaryCreationCover() {

  const { openPopup } = usePopupStore();
  const openDiaryCreationPopup = () => {
    openPopup({
      type: popupType.DIARY_EDITION_OR_VIEWER,
      option: {
        mode: diaryPopupModeType.CREATION
      }
    })
  }

  return (
    <div onClick={openDiaryCreationPopup} className='border rounded w-full h-72 p-2 m-auto flex justify-center items-center cursor-pointer'>
      작성
    </div>
  )
}
