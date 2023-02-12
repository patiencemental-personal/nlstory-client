import React from 'react';
import DiaryCreationCover from 'components/diary/DiaryCreationCover';
import DiaryCover from 'components/diary/DiaryCover';
import Tag from 'components/common/Tag';
import { AiFillPlusSquare } from 'react-icons/ai';
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
      <section id='tagSection' className='border-gray-700 rounded p-4 bg-gray-700'>
        <div className='flex items-center font-bold text-2xl'>
          <span className='m-2 text-2xl'>Tags</span>
          <button onClick={openTagCreationPopup} className='rounded text-sgnr-blue text-3xl'>
            <AiFillPlusSquare />
          </button>
        </div>
        <ul id='tags' className='flex flex-wrap' onClick={searchTag} onContextMenu={openTagManagementSelectionFloatingPopup}>
          {tags?.map((tag, index) => <Tag key={index} tag={tag} size='regular' />)}
        </ul>
      </section>
      <section id='tabSection' className='pt-8 pb-0 flex' onClick={changeTab}>
        <div
          data-tab-id={tabType.GLOBAL}
          className={`cursor-pointer w-[180px] text-center py-8 px-10 font-bold text-3xl ${selectedTab === tabType.GLOBAL && 'bg-gray-700'}`}
        >
          <button data-tab-id={tabType.GLOBAL}>Global</button>
        </div>
        {searchedTag && (
          <div
            data-tab-id={tabType.SEARCHED_TAG}
            className={`cursor-pointer relative min-w-[180px] text-center py-8 px-10 font-bold text-3xl ${selectedTab === tabType.SEARCHED_TAG && 'bg-gray-700'}`}
          >
            <button data-tab-id={tabType.SEARCHED_TAG}>{searchedTag.name}</button>
            {selectedTab === tabType.SEARCHED_TAG && <button onClick={unSearchTag} className='absolute top-4 right-4 text-xl'>X</button>}
          </div>
        )}
      </section>
      <section 
        id='diarySection'
        className='p-4 grid 2xl:grid-cols-5 xl:grid-cols-4 min-[950px]:grid-cols-3 min-[700px]:grid-cols-2 min-[300px]:grid-cols-1 auto-rows-min gap-10 bg-gray-700 min-h-screen'
      >
        {selectedTab === tabType.GLOBAL && (
          <React.Fragment>
            <DiaryCreationCover />
            {diarys.map((diary) => <DiaryCover key={diary.id} tags={tags} diary={diary} />)}
          </React.Fragment>
        )}
        {selectedTab === tabType.SEARCHED_TAG && (
          <React.Fragment>
            {diarysBySearchedTag.map((diary) => <DiaryCover key={diary.id} tags={tags} diary={diary} />)}
          </React.Fragment>
        )}
      </section>
    </section>
  )
}
