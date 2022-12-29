import { useAuthContext } from 'contexts/AuthContext';
import useWait from 'hooks/useWait';
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { path } from 'router/path';
import { NEED_EMAIL_VERIFICATION } from 'utils/constants';

export default function LoginPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();
  const setWaitOption = useWait();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;

    try {
      const loginedUser = await login(email, password);
      setWaitOption({
        time: 1500,
        callback: () => {
          if (loginedUser.emailVerified) {
            navigate(from, { replace: true });
          } else {
            alert(NEED_EMAIL_VERIFICATION)
            navigate(path.PROFILE, { replace: true });
          }
        }
      }).goWaitPage();
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(`[${errorCode}] ${errorMessage}`);      
    }
  }
  // shadow-teal-900
  return (
    <form onSubmit={handleSubmit} className='shadow-lg shadow-slate-600 rounded w-[500px] flex flex-col mx-auto items-center mt-16'>
      <h1 className='text-3xl p-4 mb-4 text-center'>로그인</h1>
      <label className='border w-[350px] flex justify-between items-center mb-4 p-2 rounded border-spacing-2 border-zinc-500'>
        이메일 <input name="email" type="email" className='bg-white text-zinc-500 w-[220px] py-1 px-2' />
      </label>
      <label className='border w-[350px]  flex justify-between items-center mb-4 p-2 rounded border-spacing-2 border-zinc-500'>
        비밀번호 <input name="password" type="text" className='bg-white text-zinc-500 w-[220px] py-1 px-2' />
      </label>
      <div className='text-sm text-neutral-400 font-bold w-[350px] text-left pl-2 mb-4'><Link to={path.SIGNUP}>비밀번호 찾기</Link></div>
      <button type="submit" className='font-bold w-[350px] py-4 rounded bg-zinc-500 mb-4'>로그인</button>
      <div className='mb-4'>아직 회원이 아니신가요? <Link to={path.SIGNUP}>회원가입</Link></div>
    </form>
  );
}
