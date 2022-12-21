import React from 'react'
import { useFloatingPopupStore } from 'stores/useFloatingPopupStore';

export default function FloatingPopupTemplate({children, mousePosition}: {
  children: React.ReactNode
  mousePosition: {x: number, y: number}
}) {
  const { closeFloatingPopup } = useFloatingPopupStore();
  return (
    <React.Fragment>
      <div
        id='background'
        onClick={closeFloatingPopup}
        onContextMenu={closeFloatingPopup}
        className='fixed w-full h-full left-0' />
      <span 
        className='fixed'
        style={{ top: `${mousePosition.y}px`, left: `${mousePosition.x}px`}}
      >{children}</span>
    </React.Fragment>
  )
}
