import React from 'react';
import DiaryCreator from 'components/diary/DiaryCreator';
import DiaryCover from 'components/diary/DiaryCover';
import Tag, { TagProps } from 'components/diary/Tag';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { v4 as uuid } from 'uuid';

// @todo delete this function
function initTags(): TagProps[] {
  return [
    // { id: uuid(), name: '개발', color: '#3b82f6', size: 'regular'},
    // { id: uuid(), name: '생각', color: '#f59e0b', size: 'regular'},
    // { id: uuid(), name: '생각2', color: '#f59e0b', size: 'regular'},
    // { id: uuid(), name: '코딩', color: '#10b981', size: 'regular'},
    // { id: uuid(), name: '부업', color: '#6366f1', size: 'regular'},
    // { id: uuid(), name: '부유', color: '#43221f', size: 'regular'},
    { id: uuid(), name: '개발', color: '#3b82f6', },
    { id: uuid(), name: '생각', color: '#f59e0b', },
    { id: uuid(), name: '생각2', color: '#f59e0b', },
    { id: uuid(), name: '코딩', color: '#10b981', },
    { id: uuid(), name: '부업', color: '#6366f1', },
    { id: uuid(), name: '부유', color: '#43221f', },
  ];
}  

export default function TagDiaryPage() {

  const [tagSet, setTagSet] = React.useState<Set<TagProps>>(new Set());

  React.useEffect(() => {
    setTagSet(new Set(initTags()));  
  }, []);

  const createTag = () => {
    const newTagName: string | null = prompt('태그 이름을 입력해주세요.');
    if (!newTagName) return ;
    
    const duplicated: boolean = Array.from(tagSet).some((tag) => tag.name === newTagName);
    if (duplicated) {
      alert('중복된 이름의 태그가 존재합니다.');
      return ;
    }

    const newTag: TagProps = { id: uuid(), name: newTagName, color: '#3b82f6' };
    setTagSet(new Set([...tagSet, newTag]));
  }

  return (
    <section className='p-8'>
      <div id='tags' className='border p-4'>
        <button onClick={createTag} className='text-xl rounded'>
          <AiOutlinePlusCircle />
        </button>
        {Array.from(tagSet).map((tag, index) => {
          const { id, name, color } = tag;
          return <Tag key={index} id={id} name={name} color={color} size='regular' />
        })}
      </div>
      {/* <div id='filter'>
        <span>필터 초기화 | </span>
        <span>날짜 필터 | </span>
        <span>조회하려고 선택된 태그 영역 | </span>
        <span>검색</span>
      </div> */}
      <div id='diarys' className='border p-4 grid grid-cols-5 gap-x-10 gap-y-6'>
        <DiaryCreator />
        {Array(7).fill(0).map((_, index) => {
          return <DiaryCover key={index} />
        })}
      </div>
    </section>
  )
}
