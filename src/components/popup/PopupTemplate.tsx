import React from 'react'
import { GiCancel } from 'react-icons/gi';
import { usePopupStore } from 'stores/usePopupStore';

const BACKGROUND_CLASSNAME = 'fixed w-full h-full left-0'

export default function PopupTemplate({children}: {children: React.ReactNode}) {
  const { closePopup } = usePopupStore();
  return (
    <React.Fragment>
      <div id='background' className={`${BACKGROUND_CLASSNAME} bg-slate-900 opacity-70`} />
      <div id='container' className={`${BACKGROUND_CLASSNAME} flex justify-center items-center`}>
        <div id='template' className='absolute w-136 p-4 bg-slate-700 rounded'>
          {children}
        </div>
      </div>
      <button onClick={closePopup} className='fixed right-4 top-4 text-5xl'><GiCancel /></button>
    </React.Fragment>
  )
}
