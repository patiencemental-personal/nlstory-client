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
    let formData = new FormData(event.currentTarget);
    let password = formData.get("password") as string;
    let email = formData.get("email") as string;

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
    <div>
      <p>회원가입 페이지</p>
      <form onSubmit={handleSubmit}>
        <label>
          Email: <input name="email" type="email" className='bg-black' />
        </label>
        <label>
          Password: <input name="password" type="text" className='bg-black' />
        </label>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
