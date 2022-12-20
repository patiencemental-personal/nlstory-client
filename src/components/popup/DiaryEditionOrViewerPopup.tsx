import Tag from 'components/diary/Tag'
import React from 'react'
import { GiCancel } from 'react-icons/gi';
import { useSelector, useDispatch } from 'react-redux';
import { addDiary, updateDiary } from 'stores/slices/tagDiarySlice';
import { usePopupStore } from 'stores/usePopupStore';
import { generateId } from 'utils/common';
import { diaryPopupModeType } from 'utils/freeze';
import { DiaryType, TagType } from 'utils/types';

const BACKGROUND_CLASSNAME = 'fixed w-full h-full left-0'

export default function DiaryEditionOrViewerPopup() {
  const { getOption, closePopup } = usePopupStore();
  const { mode } = getOption();

  const tags: TagType[] = useSelector((state: any) => state.tagDiary.tags);
  const [selectedTags, setSelectedTags] = React.useState<TagType[]>([]);
  const [summary, setSummary] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');

  const dispatch = useDispatch();

  const selectTag = (event: React.BaseSyntheticEvent) => {
    setSelectedTags(prev => {
      const tagId = event.target.dataset.tagId;
      const tag = tags.find(tag => tag.id === tagId);
      if (!tag) return prev;
      if (prev.some(tag => tag.id === tagId)) return prev;
      return [...prev, tag];
    })
  }

  const unSelectTag = (event: React.BaseSyntheticEvent) => {
    setSelectedTags(prev => {
      const tagId = event.target.dataset.tagId;
      return prev.filter(tag => tag.id !== tagId);
    })
  }

  const handleSubmit = (event: React.BaseSyntheticEvent) => {
    if (mode === diaryPopupModeType.CREATION) {
      const newDiary: DiaryType = {
        id: generateId(),
        summary,
        content,
        tagIds: selectedTags.map(tag => tag.id),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      dispatch(addDiary(newDiary));
      closePopup();
    } else if (mode === diaryPopupModeType.EDITION) {
      const updatedDiary: DiaryType = {
        ...getOption().diary,
        summary,
        content,
        tagIds: selectedTags.map(tag => tag.id),
      };
      // dispatch(updateDiary(updatedDiary));
      dispatch(updateDiary(updatedDiary));
      closePopup();
    }
  }

  React.useEffect(() => {
    if (mode === diaryPopupModeType.EDITION) {
      const { summary, content, tagIds }: { 
        summary: string,
        content: string,
        tagIds: string[],
       } = getOption().diary;
      setSummary(summary);
      setContent(content);
      setSelectedTags(tags.filter(tag => tagIds.includes(tag.id)));
    }
  }, [])

  return (
    <React.Fragment>
      <div id='background' className={`${BACKGROUND_CLASSNAME} bg-slate-900 opacity-70`} />
      <div id='container' className={`${BACKGROUND_CLASSNAME} flex justify-center items-center`}>
        <div id='template' className='absolute w-136 h-2/3 p-4 bg-slate-700 rounded'>
          <div id='diaryEditionOrViewerPopup'>
            <h3>Summary</h3>
            <textarea 
              id="summaryArea"
              value={summary}
              rows={7}
              readOnly={false}
              className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              onChange={(event) => { setSummary(event.target.value); }}
            />

            <Divider />

            <h3>Content</h3>
            <textarea 
              id="contentArea"
              value={content}
              rows={12}
              readOnly={false}
              className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              onChange={(event) => { setContent(event.target.value); }}
            />

            <Divider />

            <h3>Tags</h3>
            <ul id='tags' onClick={selectTag}>
              {tags.map((tag, index) => <Tag key={index} tag={tag} size='small' />)}
            </ul>

            {selectedTags.length > 0 && (
              <React.Fragment>
                <Divider />
                <h3>Selected Tags</h3>
                <ul id='selected-tags' onClick={unSelectTag}>
                  {selectedTags.map((tag, index) => <Tag key={index} tag={tag} size='small' />)}
                </ul>
              </React.Fragment>
            )}

            <Divider />

            <footer className='flex justify-center'>
              {
                mode === diaryPopupModeType.CREATION && (
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >저장</button>)
              }
              {
                mode === diaryPopupModeType.EDITION && (
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >수정</button>)
              }
            </footer>
          </div>
        </div>
      </div>
      <button onClick={closePopup} className='fixed right-4 top-4 text-5xl'><GiCancel/></button>      
    </React.Fragment>
  )
}


const Divider = () => {
  return <div className='w-full border my-4' />
}