import React from 'react';
import DiaryCreationCover from 'components/diary/DiaryCreationCover';
import DiaryCover from 'components/diary/DiaryCover';
import Tag from 'components/diary/Tag';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { DiaryType, TagType } from 'utils/types';
import { useDispatch } from 'react-redux';
import { sInitTags, sInitDiarys, } from 'stores/slices/tagDiarySlice';
import { fGetTags, fGetDiarys, fGetDiarysByTag } from 'apis/firebase';
import { useAuthContext } from 'contexts/AuthContext';
import { usePopupStore } from 'stores/usePopupStore';
import { floatingPopupType, popupType, tagEditionPopupModeType } from 'utils/freezeTypes';
import { useFloatingPopupStore } from 'stores/useFloatingPopupStore';

const tabType = Object.freeze({
  GLOBAL: 'GLOBAL',
  SEARCHED_TAG: 'SEARCHED_TAG',
})

type TabType = keyof typeof tabType;

export default function TagDiaryPage() {
  const { uid } = useAuthContext();
  const { openPopup } = usePopupStore();
  const { openFloatingPopup } = useFloatingPopupStore();
  const dispatch = useDispatch();

  const { tags, diarys }: { 
    tags: TagType[], 
    diarys: DiaryType[], 
  } = useSelector((state: any) => state.tagDiary);

  const [searchedTag, setSearchedTag] = React.useState<TagType>();
  const [selectedTab, setSelectedTab] = React.useState<TabType>(tabType.GLOBAL);
  const [diarysBySearchedTag, setDiarysBySearchedTag] = React.useState<DiaryType[]>([]);

  const searchTag = (event: React.BaseSyntheticEvent) => {
    const tagId = event.target.dataset.tagId;
    if (tagId) {
      setSearchedTag(() => tags.find(tag => tag.id === tagId));
      setSelectedTab(() => tabType.SEARCHED_TAG);
    }
  }
  
  const unSearchTag = (event: React.BaseSyntheticEvent) => {
    event.stopPropagation();
    setSearchedTag(() => undefined);
    setSelectedTab(() => tabType.GLOBAL);
    setDiarysBySearchedTag(() => []);
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

  const changeTab = (event: React.BaseSyntheticEvent) => {
    const tabId = event.target.dataset.tabId;
    if (tabId) setSelectedTab(() => tabId as TabType);
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

  React.useEffect(() => {
    if (searchedTag) {
      fGetDiarysByTag(uid, searchedTag.id)
        .then((diarys) => setDiarysBySearchedTag(diarys))
        .catch((error) => {
          console.error(error);
          alert('태그 다이어리를 불러오는데 실패했습니다. 다시 시도해주세요.');
        });
    }
  }, [searchedTag]);

  return (
    <section className='p-8'>
      <section id='tag' className='border-b-[3px] p-4'>
        <div id='tags' className='flex' onClick={searchTag} onContextMenu={openTagManagementSelectionFloatingPopup}>
          <button onClick={openTagCreationPopup} className='rounded text-rose-800 font-bold text-3xl'>
            <AiOutlinePlusCircle />
          </button>
          {tags?.map((tag, index) => <Tag key={index} tag={tag} size='regular' />)}
        </div>
      </section>
      <section id='tabs' className='p-4 flex' onClick={changeTab}>
        <div className={`border p-2 mr-2 ${selectedTab === tabType.GLOBAL && 'border-green-600'}`}><button data-tab-id={tabType.GLOBAL}>Global</button></div>
        {searchedTag && (
          <div className={`border p-2 mr-2 ${selectedTab === tabType.SEARCHED_TAG && 'border-green-600'}`}>
            <button data-tab-id={tabType.SEARCHED_TAG}>{searchedTag.name} | <span><button onClick={unSearchTag}>X</button></span></button>
          </div>
        )}
      </section>
      {selectedTab === tabType.GLOBAL && (
        <div id='global-diarys' className='p-4 grid grid-cols-5 gap-x-10 gap-y-6'>
          <DiaryCreationCover />
          {diarys.map((diary) => <DiaryCover key={diary.id} tags={tags} diary={diary} />)}
        </div>
      )}
      {selectedTab === tabType.SEARCHED_TAG && (
        <div id='searched-tag-diarys' className='p-4 grid grid-cols-5 gap-x-10 gap-y-6'>
          {diarysBySearchedTag.map((diary) => <DiaryCover key={diary.id} tags={tags} diary={diary} />)}
        </div>
      )}
    </section>
  )
}
