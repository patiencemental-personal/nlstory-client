import { useAuthContext } from 'contexts/AuthContext';
import useWait from 'hooks/useWait';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
  const { login } = useAuthContext();
  const setWaitOption = useWait();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    
    if (login(password)) {
      setWaitOption({
        time: 1500,
        callback: () => navigate(from, { replace: true })
      }).goWaitPage();
    } else {
      toast.error(`올바른 인증 번호를 입력해주세요.`);      
    }
  }

  return (
    <form onSubmit={handleSubmit} className='shadow-lg shadow-slate-600 rounded w-[500px] flex flex-col mx-auto items-center mt-16'>
      <h1 className='text-3xl p-4 mb-4 text-center'>로그인</h1>
      <label className='w-[350px] flex justify-between items-center mb-4 rounded border-spacing-2 border-zinc-500'>
        <input name="password" type="password" placeholder='인증 번호를 입력하세요.' className='bg-white text-zinc-500 w-full py-1 px-2' />
      </label>
      <button type="submit" className='font-bold w-[350px] py-4 rounded bg-zinc-500 mb-4'>로그인</button>
    </form>
  );
}
