import Tag from 'components/common/Tag'
import { useAuthContext } from 'contexts/AuthContext';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { sAddDiary, sUpdateDiary, sDeleteDiary } from 'stores/slices/tagDiarySlice';
import { usePopupStore } from 'stores/usePopupStore';
import { generateId } from 'utils/common';
import { diaryPopupModeType } from 'utils/freezeTypes';
import { DiaryType, TagType } from 'utils/types';

export default function DiaryEditionOrViewerPopup() {
  const { getOption, closePopup } = usePopupStore();
  const { mode } = getOption();

  const { uid } = useAuthContext();

  const tags: TagType[] = useSelector((state: any) => state.tagDiary.tags);
  const [selectedTagIds, setSelectedTagIds] = React.useState<string[]>([]);
  const [summary, setSummary] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');

  const dispatch = useDispatch();

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

  const validate = () => {
    if (!summary) {
      alert('요약을 입력해주세요.');
      return false;
    }
    if (!content) {
      alert('내용을 입력해주세요.');
      return false;
    }
    return true;
  }

  const createDiary = () => {
    // if (!validate()) return ;
    
    // const newDiary: DiaryType = {
    //   id: generateId(),
    //   summary,
    //   content,
    //   tagIds: selectedTagIds,
    //   createdAt: Date.now(),
    //   updatedAt: Date.now(),
    // };

    // fAddDiary(uid, newDiary)
    //   .then(() => {
    //     dispatch(sAddDiary(newDiary));
    //     closePopup();
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     alert('다이어리 생성에 실패했습니다. 다시 시도해주세요.')
    //   })
  }

  const updateDiary = () => {
    // if (!validate()) return ;

    // const updatedDiary: DiaryType = {
    //   ...getOption().diary,
    //   summary,
    //   content,
    //   tagIds: selectedTagIds,
    // };
    // fUpdateDiary(uid, updatedDiary)
    //   .then(() => {
    //     dispatch(sUpdateDiary(updatedDiary))
    //     closePopup();
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     alert('다이어리 수정에 실패했습니다. 다시 시도해주세요.')
    //   })
  }

  const deleteDiary = () => {
    // const diaryId = getOption().diary.id;
    // fDeleteDiary(uid, diaryId)
    //   .then(() => {
    //     dispatch(sDeleteDiary(diaryId));
    //     closePopup();
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     alert('다이어리 삭제에 실패했습니다. 다시 시도해주세요.')
    //   })
  }

  React.useEffect(() => {
    // if (mode === diaryPopupModeType.UPDATION) {
    //   const diary = getOption().diary;
    //   const { summary, content, tagIds }: {
    //     summary: string,
    //     content: string,
    //     tagIds: string[],
    //   } = diary;
      
    //   // 전체 태그 중 존재하지 않는 태그들을 제거
    //   const totalTagIds = tags.map((tag: TagType) => tag.id);
    //   const existTagIdsInTotal = tagIds?.filter((tagId: string) => totalTagIds.includes(tagId)); // 전체 태그들 중 존재하는 태그들
    //   if (existTagIdsInTotal && existTagIdsInTotal.length < tagIds.length) {
    //     const diaryWithExistTags = { ...diary, tagIds: existTagIdsInTotal };
    //     fUpdateDiary(uid, diaryWithExistTags)
    //       .then(() => dispatch(sUpdateDiary(diaryWithExistTags)))
    //       .catch(console.error);
    //   }
      
    //   setSummary(summary);
    //   setContent(content);
    //   setSelectedTagIds(tagIds || []);
    // }
  }, [])

  return (
    <div className='p-4 w-144'>
      <section className='mb-4'>
        <h3 className='mb-3 pl-2 border-l-4 font-semibold'>Summary</h3>
        <textarea
          id="summaryArea"
          value={summary}
          rows={7}
          readOnly={false}
          className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="요약본을 작성해주세욧!"
          onChange={(event) => { setSummary(event.target.value); }}
        />
      </section>

      <section className='mb-4'>
        <h3 className='mb-2 pl-2 border-l-4 font-semibold'>Content</h3>
        <textarea
          id="contentArea"
          value={content}
          rows={12}
          readOnly={false}
          className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="생각을 정리하세욧!"
          onChange={(event) => { setContent(event.target.value); }}
        />
      </section>

      <section className='mb-4'>
        <h3 className='mb-3 pl-2 border-l-4 font-semibold'>Tags</h3>
        <ul id='tags' className='flex flex-wrap' onClick={selectTag}>
          {tags.map((tag, index) => <Tag key={index} tag={tag} size='small' />)}
        </ul>
      </section>

      {selectedTagIds?.length > 0 && (
        <section className='mb-4'>
          <h3 className='mb-3 pl-2 border-l-4 font-semibold'>Selected Tags</h3>
          <ul id='selected-tags' className='flex flex-wrap' onClick={unSelectTag}>
            {selectedTagIds.map((tagId, index) =>   {
              const tag = tags.find(tag => tag.id === tagId);
              return tag && <Tag key={index} tag={tag} size='small' />
            })}
          </ul>
        </section>
      )}

      <footer className='mt-4 flex justify-center'>
        {
          mode === diaryPopupModeType.CREATION && (
            <button
              onClick={createDiary}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >저장</button>)
        }
        {
          mode === diaryPopupModeType.UPDATION && (
            <React.Fragment>
              <button
                onClick={updateDiary}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >수정</button>
              <button
                onClick={deleteDiary}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >삭제</button>
            </React.Fragment>
          )
        }
      </footer>
    </div>
  )
}