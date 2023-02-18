import React from 'react'
import { useFloatingPopupStore } from 'stores/useFloatingPopupStore';
import styles from './FloatingPopupTemplate.module.css';

export default function FloatingPopupTemplate({children, mousePosition}: {
  children: React.ReactNode,
  mousePosition: {x: number, y: number}
}) {
  const { closeFloatingPopup } = useFloatingPopupStore();
  return (
    <div
      className={styles.background}
      onClick={closeFloatingPopup}
      onContextMenu={closeFloatingPopup}>
      <span 
        className={styles.template}
        style={{ top: `${mousePosition.y}px`, left: `${mousePosition.x}px`}}
      >{children}</span>
    </div>
  )
}
