import React from 'react'
import Tag, { TagProps } from 'components/diary/Tag';

export default function DiaryCover() {

  const tags: TagProps[] = [
    { id: '1', name: '이름', color: 'red' },
    { id: '2', name: 'ㅋㅋ', color: 'blue' },
    { id: '3', name: '오우', color: 'green' },
    { id: '4', name: '크앙', color: 'green' },
  ];

  return (
    <div className='border rounded w-full max-h-72 p-2 mx-auto flex flex-col justify-between'>
      <div id='main'>
        <h2 className='p-1 text-center font-bold truncate'>제목</h2>
        <div className='p-1 w-full h-24'>일기 요약...</div>
      </div>
      <div id='meta' className='border-solid border-t divide-slate-500 '>
        <div className='p-1 text-sm'>
          <p className='flex justify-between'><span>Created</span><span>2011-11-11</span></p>
          <p className='flex justify-between'><span>Updadted</span><span>2011-11-11</span></p>
        </div>
        <ul className='flex flex-wrap'>
          {tags.map((tag, index) => {
            const { id, name, color } = tag;
            return <Tag key={index} id={id} name={name} color={color} size='small' />
          })}
        </ul>
      </div>
    </div>
  )
}
