import React from 'react'
import { usePopupStore } from 'stores/usePopupStore'
import Button from 'components/common/Button';
import styles from './MessagePopup.module.css';

export default function MessagePopup() {
  const { getOption, closePopup } = usePopupStore();
  const { message, buttons } = getOption();
  
  return (
    <div className={styles.popup}>
      <div className={styles.message}>{message}</div>
      <div className={styles.buttons}>
        {
          buttons ? (
            buttons.map((button: any, index: number) => {
              const { name, onClick } = button;
              return <Button key={index} size='small' onClick={onClick}>{name}</Button>
            })
          ) : (
            <Button onClick={closePopup}>확인</Button>
          )
        }
      </div>
    </div>
  )
}
