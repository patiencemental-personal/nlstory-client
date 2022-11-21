import { useAuthContext } from 'contexts/AuthContext';
import React from 'react'
import { path } from 'router/path';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginPage() {

  const navigate = useNavigate();
  const { signup } = useAuthContext();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;

    signup(email, password)
      .then(() => {
        alert('회원가입 성공. 이메일 인증 이후 로그인 해주세요.');
        navigate(path.LOGIN, { replace: true });
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`[${errorCode}] ${errorMessage}`);
      });
  }

  return (
    <form onSubmit={handleSubmit} className='shadow-lg shadow-slate-600 rounded w-[500px] flex flex-col mx-auto items-center mt-16'>
      <h1 className='text-3xl p-4 mb-4 text-center'>회원가입</h1>
      <label className='border w-[350px] flex justify-between items-center mb-4 p-2 rounded border-spacing-2 border-zinc-500'>
        이메일 <input name="email" type="email" className='bg-white text-zinc-500 w-[220px] py-1 px-2' />
      </label>
      <label className='border w-[350px]  flex justify-between items-center mb-4 p-2 rounded border-spacing-2 border-zinc-500'>
        비밀번호 <input name="password" type="text" className='bg-white text-zinc-500 w-[220px] py-1 px-2' />
      </label>
      <button type="submit" className='font-bold w-[350px] py-4 rounded bg-zinc-500 mb-4'>회원가입</button>
    </form>
  );
}
