import React from 'react';
import DiaryCreationCover from 'components/diary/DiaryCreationCover';
import DiaryCover from 'components/diary/DiaryCover';
import Tag from 'components/diary/Tag';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { DiaryType, TagType } from 'utils/types';
import { generateId } from 'utils/common';
import { useDispatch } from 'react-redux';
import { addTag } from 'stores/slices/tagDiarySlice';

export default function TagDiaryPage() {
  const { tags, diarys }: { tags: TagType[], diarys: DiaryType[] } = useSelector((state: any) => state.tagDiary);
  const dispatch = useDispatch();

  const createTag = () => {
    const newTagName: string | null = prompt('태그 이름을 입력해주세요.');
    if (!newTagName) return ;
    
    const duplicated: boolean = tags.some((tag) => tag.name === newTagName);
    if (duplicated) {
      alert('중복된 이름의 태그가 존재합니다.');
      return ;
    }

    const newTag = { id: generateId(), name: newTagName, color: '#3b82f6' };
    dispatch(addTag(newTag));
  }

  return (
    <section className='p-8'>
      <div id='tags' className='border p-4'>
        <button onClick={createTag} className='text-xl rounded'>
          <AiOutlinePlusCircle />
        </button>
        {/* <button onClick={initTags} className='text-xl rounded'>initTags</button> */}
        {tags.map((tag, index) => <Tag key={index} tag={tag} size='regular' />)}
      </div>
      {/* <div id='filter'>
        <span>필터 초기화 | </span>
        <span>날짜 필터 | </span>
        <span>조회하려고 선택된 태그 영역 | </span>
        <span>검색</span>
      </div> */}
      <div id='diarys' className='border p-4 grid grid-cols-5 gap-x-10 gap-y-6'>
        <DiaryCreationCover />
        {diarys.map((diary) => <DiaryCover key={diary.id} tags={tags} diary={diary} />)}
      </div>
    </section>
  )
}
