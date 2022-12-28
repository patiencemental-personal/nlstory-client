import React from 'react'
import { fAddTag, fUpdateTag } from 'apis/firebase';
import { TagType } from 'utils/types';
import { useDispatch } from 'react-redux';
import { useAuthContext } from 'contexts/AuthContext';
import { useSelector } from 'react-redux';
import { generateId } from 'utils/common';
import { sAddTag, sUpdateTag } from 'stores/slices/tagDiarySlice';
import { usePopupStore } from 'stores/usePopupStore';
import { tagEditionPopupModeType } from 'utils/freezeTypes';

const palette = [
  '#3b82f6', '#f59e0b', '#10b981', '#6366f1', '#ec4899', '#ffc107',
  '#8bc34a', '#03a9f4', '#9c27b0', '#e91e63', '#795548', '#ff5722',
];

export default function TagEditionPopup() {
  const { getOption, closePopup } = usePopupStore();
  const { mode } = getOption();
  
  const dispatch = useDispatch();
  const { uid } = useAuthContext();
  const { tags }: { tags: TagType[] } = useSelector((state: any) => state.tagDiary);

  const [pickedColor, setPickedColor] = React.useState<string>(palette[0]);
  const [tagName, setTagName] = React.useState<string>('');

  const pickColor = (event: React.BaseSyntheticEvent) => {
    setPickedColor(event.target.dataset.color);
  }

  const getDuplicatedTagByName = () => {
    return tags.find((tag) => tag.name === tagName); // 중복된 이름의 태그가 존재하는지 확인
  }

  const updateTag = () => {
    const { tag } = getOption();
    const updatedTag = { ...tag, name: tagName, color: pickedColor };
    fUpdateTag(uid, updatedTag)
      .then(() => {
        dispatch(sUpdateTag(updatedTag));
        closePopup();
      })
      .catch((error) => {
        console.error(error);
        alert('태그 수정에 실패했습니다. 다시 시도해주세요.');
      });
  }

  const createTag = () => {
    const newTag = { id: generateId(), name: tagName, color: pickedColor }
    fAddTag(uid, newTag)
      .then(() => {
        dispatch(sAddTag(newTag));
        closePopup();
      })
      .catch((error) => {
        console.error(error);
        alert('태그 생성에 실패했습니다. 다시 시도해주세요.');
      });
  }

  const createOrUpdateTag = () => {
    const { length } = tagName;
    if (length === 0) {
      alert('태그 이름을 작성해주세요.');
      return ;
    }
    if (length > 10) {
      alert('태그 이름은 10자 이내로 작성해주세요.');
      return ;
    }

    const duplicatedTag = getDuplicatedTagByName();
    
    if (mode === tagEditionPopupModeType.CREATION) {
      if (duplicatedTag) alert('중복된 이름의 태그가 존재합니다.');
      else createTag();
    } else if (mode === tagEditionPopupModeType.UPDATION) {
      if (duplicatedTag && duplicatedTag.id !== getOption().tag.id) alert('중복된 이름의 태그가 존재합니다.');
      else updateTag();
    }
  }

  React.useEffect(() => {
    if (mode === tagEditionPopupModeType.UPDATION) {
      const { tag } = getOption();
      setTagName(tag.name);
      setPickedColor(tag.color);
    }
  }, []);

  return (
    <React.Fragment>
      <div className='p-4 flex justify-around'>
        <input
          value={tagName}
          onChange={(event) => setTagName(event.target.value)}
          className='rounded  p-4 text-center text-white font-bold placeholder:text-white'
          style={{backgroundColor: `${pickedColor}`, borderColor: `${pickedColor}`}} 
          placeholder='태그 이름을 작성하세요.'
        />
        <ul className='flex flex-row-reverse flex-wrap w-[35%]' onClick={pickColor}>
          {palette.map((color, index) => <li key={index} data-color={`${color}`} className='cursor-pointer rounded-full w-6 h-6 m-1' style={{backgroundColor: color}} />)}
        </ul>
      </div>
      <div className='p-4 text-center'>
        <button
          onClick={createOrUpdateTag}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >저장</button>
      </div>
    </React.Fragment>
  )
}
