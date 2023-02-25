import React, { useEffect } from 'react'
import { usePopupStore } from 'stores/usePopupStore'
import { popupType } from 'utils/freezeTypes';

export default function ErrorFallback({ 
  error, resetErrorBoundary 
}: { error: Error, resetErrorBoundary: () => void}) {

  const { openPopup } = usePopupStore();

  useEffect(() => {
    openPopup({
      type: popupType.MESSAGE,
      option: {
        hideHeader: true,
        message: '에러가 발생했습니다.',
        buttons: [
          {
            name: '메인으로',
            onClick: () => {
              window.location.href = process.env.NODE_ENV === 'production' ? 'https://nlstory.site' : 'http://localhost:3000';
            }
          },
        ]
      }
    });
  }, [])
  

  return <React.Fragment></React.Fragment>
}
