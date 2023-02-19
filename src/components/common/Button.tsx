import React from 'react'
import styles from './Button.module.css'

type ButtonProps = {
  children: string | React.ReactNode;
  onClick?: (event: React.BaseSyntheticEvent) => void;
  size?: 'small' | 'medium';
  layout?: 'inline' | 'fullWidth';
  color?: 'primary' | 'secondary';
  active?: boolean;
}

export default function Button({ 
  children, onClick,
  size = 'medium', layout = 'inline',
  color = 'primary', active = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[size]} ${styles[layout]} ${styles[color]}`}
    >{children}</button>
  )
}
