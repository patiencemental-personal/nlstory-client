import React from 'react';
import DiaryCreationCover from 'components/diary/DiaryCreationCover';
import DiaryCover from 'components/diary/DiaryCover';
import Tag from 'components/diary/Tag';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { DiaryType, TagType } from 'utils/types';
import { useDispatch } from 'react-redux';
import { sInitTags, sInitDiarys } from 'stores/slices/tagDiarySlice';
import { fGetTags, fGetDiarys } from 'apis/firebase';
import { useAuthContext } from 'contexts/AuthContext';
import { usePopupStore } from 'stores/usePopupStore';
import { floatingPopupType, popupType, tagEditionPopupModeType } from 'utils/freezeTypes';
import { useFloatingPopupStore } from 'stores/useFloatingPopupStore';

export default function TagDiaryPage() {
  const { uid } = useAuthContext();
  const { openPopup } = usePopupStore();
  const { openFloatingPopup } = useFloatingPopupStore();
  const dispatch = useDispatch();

  const { tags, diarys }: { tags: TagType[], diarys: DiaryType[] } = useSelector((state: any) => state.tagDiary);
  const [selectedTagIds, setSelectedTagIds] = React.useState<string[]>([]);
  
  const selectTag = (event: React.BaseSyntheticEvent) => {
    setSelectedTagIds(prev => {
      const tagId = event.target.dataset.tagId;
      if (prev.some(tag => tag === tagId)) return prev; // already selected
      return [...prev, tagId];
    })
  }

  const unSelectTag = (event: React.BaseSyntheticEvent) => {
    setSelectedTagIds(prev => {
      const tagId = event.target.dataset.tagId;
      return prev.filter(tag => tag !== tagId);
    })
  }

  const openTagCreationPopup = (event: React.BaseSyntheticEvent) => {
    event.stopPropagation(); // prevent selectTag
    openPopup({ type: popupType.TAG_EDITION, option: { mode: tagEditionPopupModeType.CREATION } })
  }

  const openTagManagementSelectionFloatingPopup = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    const tagId = event.target.dataset.tagId;
    if (tagId) {
      const { clientX, clientY }: { 
        clientX: number,
        clientY: number
      } = event.nativeEvent as PointerEvent;
  
      openFloatingPopup({
        type: floatingPopupType.TAG_MANAGEMENT_SELECTION,
        mousePosition: { x: clientX, y: clientY },
        option: { tag: tags.find(tag => tag.id === event.target.dataset.tagId) }
      })
    }
  }

  React.useEffect(() => {
    if (uid) {
      fGetTags(uid)
        .then((tags) => dispatch(sInitTags(tags as TagType[])))
        .catch((error) => {
          console.error(error);
          alert('태그를 불러오는데 실패했습니다. 다시 시도해주세요.');
        });
      fGetDiarys(uid)
        .then((diarys) => dispatch(sInitDiarys(diarys as DiaryType[])))
        .catch((error) => {
          console.error(error);
          alert('다이어리를 불러오는데 실패했습니다. 다시 시도해주세요.');
        });
    } else {
      dispatch(sInitTags([]));
      dispatch(sInitDiarys([]));
    }
  }, [uid]);

  return (
    <section className='p-8'>
      <section id='tag' className='border p-4'>
        <div id='tags' className='flex' onClick={selectTag} onContextMenu={openTagManagementSelectionFloatingPopup}>
          <button onClick={openTagCreationPopup} className='rounded text-rose-800 font-bold text-3xl'>
            <AiOutlinePlusCircle />
          </button>
          {tags?.map((tag, index) => <Tag key={index} tag={tag} size='regular' />)}
        </div>
      </section>
      <section id='filter' className='border p-4'>
        <h2>filter</h2>
        {/* <div>검색 영역</div>
        <div>날짜 영역</div> */}
        {selectedTagIds.length > 0 && (
          <div id='filter-selected-tags'>
            {/* <h3>Selected Tags</h3> */}
            <ul id='selected-tags' onClick={unSelectTag}>
              {selectedTagIds.map((tagId, index) => {
                const tag = tags.find(tag => tag.id === tagId);
                return tag && <Tag key={index} tag={tag} size='regular' />
              })}
            </ul>
          </div>
        )}
      </section>
      <div id='diarys' className='border p-4 grid grid-cols-5 gap-x-10 gap-y-6'>
        <DiaryCreationCover />
        {diarys.map((diary) => <DiaryCover key={diary.id} tags={tags} diary={diary} />)}
      </div>
    </section>
  )
}
