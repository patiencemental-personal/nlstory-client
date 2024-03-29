import useWait from 'hooks/useWait';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './LoginPage.module.css';
import textStyles from 'styles/Text.module.css';
import Button from 'components/common/Button';
import { useAuthStore } from 'stores/useAuthStore';
import useInputRef from 'hooks/useInputRef';

export default function LoginPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
  const { login } = useAuthStore();
  const setWaitOption = useWait();
  const passwordInputRef = useInputRef({ 
    validRules: [
      { rule: 'require', message: '인증 번호를 입력하세요.' },
      { rule: 'password', message: '유효하지 않은 인증 번호 입니다.' }
    ]  
  });
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { valid, message } = passwordInputRef.validate();

    if (!valid) {
      toast.error(message);
      return ;
    }

    try {
      const response = await login(passwordInputRef.get());
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
        <input
          ref={passwordInputRef.reference}
          name="password"
          type="password"
          placeholder='인증 번호를 입력하세요.'
          className={styles.input}
        />
      </label>
      <Button layout='fullWidth' color='secondary'>로그인</Button>
    </form>
  );
}