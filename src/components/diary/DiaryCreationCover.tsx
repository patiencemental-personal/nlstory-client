import { usePopupStore } from 'stores/usePopupStore';
import { popupType, diaryPopupModeType } from 'utils/freezeTypes';
import { TfiWrite } from 'react-icons/tfi';

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
    <div onClick={openDiaryCreationPopup} className='cursor-pointer border rounded w-[250px] h-72 p-2 mx-auto flex justify-center items-center'>
      <button className='text-7xl'><TfiWrite/></button>
    </div>
  )
}
