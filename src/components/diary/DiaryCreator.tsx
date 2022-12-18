import React from 'react'

export default function DiaryCreator() {
  
  const openDiaryEditor = () => {
    alert('openDiaryEditor');
  }

  return (
    <div onClick={openDiaryEditor} className='border rounded w-full h-72 p-2 m-auto flex justify-center items-center cursor-pointer'>
      작성
    </div>
  )
}
