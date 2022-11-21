import { useNavigate } from 'react-router-dom';
import { path } from 'router/path';

export default function useWait() {
  const navigate = useNavigate();
  const setWaitOption = ({ time = 0, callback = () => {} }: { 
    time?: number, callback?: Function 
  }) => {
    return { 
      goWaitPage: () => {
        navigate(path.WAIT, { replace: true });
        setTimeout(() => {
          callback?.();
        }, time);
      }
    };
  }

  return setWaitOption;
}