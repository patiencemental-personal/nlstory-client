import React from 'react'
import { GiCancel } from 'react-icons/gi';
import { usePopupStore } from 'stores/usePopupStore';

export default function PopupTemplate({children, title}: {
  children: React.ReactNode,
  title?: string,
}) {
  const { closePopup } = usePopupStore();
  const closePopupByBackgroundClick = (event: React.BaseSyntheticEvent) => {
    if (event.target.id === 'background') {
      closePopup();
    }
  }
  return (
    <div id='background' onClick={closePopupByBackgroundClick} className='fixed w-full h-full top-0 left-0 bg-slate-900/[.7] flex flex-col justify-center items-center'>
      {/* w-auto로 함으로써 팝업 구현체에서 default, max, min width를 지정 */}
      <div id='template' className='w-auto bg-slate-700 rounded'>
        <p className='text-xl flex justify-between items-center p-4 rounded-t-lg bg-slate-400'>
          {title ? <span>{title}</span> : <div></div>}
          <button onClick={closePopup}><GiCancel /></button>
        </p>
        {children}
      </div>
    </div>
  )
}
