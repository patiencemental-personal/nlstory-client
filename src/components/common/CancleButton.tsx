import React from 'react'
import { GiCancel } from 'react-icons/gi';
import styles from './CancleButton.module.css';

type CancleButtonProps = {
  onClick?: (event: React.BaseSyntheticEvent) => void;
}

export default function CancleButton({ onClick }: CancleButtonProps) {
  return (
    <button onClick={onClick} className={styles.button}><GiCancel/></button>
  )
}
