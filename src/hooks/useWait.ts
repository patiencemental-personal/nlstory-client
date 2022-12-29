import { toast } from 'react-toastify';
import React from "react";
import { useNavigate } from 'react-router-dom';
import { path } from 'router/path';

export default function useWait() {
  const navigate = useNavigate();
  const [callbackOnWait, setCallbackOnWait] = React.useState<Function>();
  
  const goWaitPage = () => {
    if (callbackOnWait) {
      navigate(path.WAIT, { replace: true });
      callbackOnWait();
    } else {
      console.error('callbackOnWait을 세팅해주세요.')
    }
  };
  
  return { setCallbackOnWait, goWaitPage };
}