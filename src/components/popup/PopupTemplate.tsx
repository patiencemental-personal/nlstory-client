import React from 'react'
import { GiCancel } from 'react-icons/gi';
import { usePopupStore } from 'stores/usePopupStore';

export default function PopupTemplate({children}: { children: React.ReactNode }) {
  const { getOption, closePopup } = usePopupStore();
  const { title } = getOption();

  const closePopupByBackgroundClick = (event: React.BaseSyntheticEvent) => {
    if (event.target.id === 'background') {
      closePopup();
    }
  }
  return (
    <div id='background' className='fixed w-full h-full top-0 left-0 bg-slate-900/[.7] flex flex-col justify-center items-center'>
      {/* w-auto로 함으로써 팝업 구현체에서 default, max, min width를 지정 */}
      <div id='template' className='w-auto bg-slate-700 rounded'>
        <div className='text-xl flex justify-between items-center p-4 rounded-t-lg bg-slate-400'>
          {title ? <span className='px-4'>{title}</span> : <div></div>}
          <button onClick={closePopup} className='pr-4'><GiCancel /></button>
        </div>
        {children}
      </div>
    </div>
  )
}
