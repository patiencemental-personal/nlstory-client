import useWait from 'hooks/useWait';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './LoginPage.module.css';
import textStyles from 'styles/Text.module.css';
import Button from 'components/common/Button';
import { useAuthStore } from 'stores/useAuthStore';

export default function LoginPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
  const { login } = useAuthStore();
  const setWaitOption = useWait();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    
    try {
      const response = await login(password);
      setWaitOption({
        time: 1500,
        callback: async () => {
          toast.success(response.data.message);
          navigate(from, { replace: true });
        }
      }).goWaitPage();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={`${textStyles.xl3} ${styles.title}`}>로그인</h1>
      <label className={styles.label}>
        <input name="password" type="password" placeholder='인증 번호를 입력하세요.' className={styles.input} />
      </label>
      <Button layout='fullWidth' color='secondary'>로그인</Button>
    </form>
  );
}
