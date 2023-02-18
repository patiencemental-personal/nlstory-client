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
  const styleSize = styles[size];
  const styleLayout = styles[layout];
  const styleColor = styles[color];
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styleSize} ${styleLayout} ${styleColor}`}
    >{children}</button>
  )
}
