import React from 'react'
import { Link } from 'react-router-dom'
import { path } from 'router/path'

export default function NotFound() {
  return (
    <div className='absolute left-0 w-full h-full flex flex-col justify-center items-center font-bold text-4xl'>
      <div className='mb-4'>존재하지 않는 페이지 입니다.</div>
      <Link to={path.ENTRY} className='p-4 rounded bg-sgnr-blue'><button>메인으로</button></Link>
    </div>
  )
}
