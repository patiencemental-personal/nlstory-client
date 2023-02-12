import { useAuthContext } from 'contexts/AuthContext'
import React from 'react'

export default function ProfilePage() {
  const { user, sendEmailVerification } = useAuthContext();
  const requestEmailVerification = () => {
    sendEmailVerification();
  }

  return (
    <div className='break-words shadow-lg shadow-slate-600 rounded w-[500px] flex flex-col mx-auto items-center mt-16'>
      <h1 className='text-3xl p-4 mb-4 text-center'>프로필 정보</h1>
      <div className='mb-4'>
        <label>
          {/* 이메일 <input name="email" type="text" className='bg-white text-zinc-500 w-[220px] py-1 px-2' readOnly={true} value={user.email} />
          {!user.emailVerified && <button onClick={requestEmailVerification} className='ml-2 border rounded p-2'>이메일 인증</button> } */}
        </label>
      </div>
    </div>
  )
}
