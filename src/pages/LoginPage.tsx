import { useAuthContext } from 'contexts/AuthContext';
import useWait from 'hooks/useWait';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { path } from 'router/path';
import { NEED_EMAIL_VERIFICATION } from 'utils/constants';

export default function LoginPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();
  const { setCallbackOnWait, goWaitPage } = useWait();

  const from = location.state?.from?.pathname || "/";

  const redirectToWaitPage = (user: any) => {
    setCallbackOnWait(() => {
      setTimeout(() => {
        if (user.emailVerified) {
          navigate(from, { replace: true });
        } else {
          alert(NEED_EMAIL_VERIFICATION)
          navigate(path.PROFILE, { replace: true });
        }
      }, 1500);
    });
    goWaitPage();
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let password = formData.get("password") as string;
    let email = formData.get("email") as string;

    try {
      const loginedUser = await login(email, password);
      redirectToWaitPage(loginedUser);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(`[${errorCode}] ${errorMessage}`);      
    }
  }

  return (
    <div>
      <p>로그인 페이지</p>

      <form onSubmit={handleSubmit}>
        <label>
          Email: <input name="email" type="email" className='bg-black' />
        </label>
        <label>
          Password: <input name="password" type="text" className='bg-black' />
        </label>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
