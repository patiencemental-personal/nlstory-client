import React from 'react'

export type TagProps = {
  id: string;
  name: string;
  color: string;
  size?: 'regular' | 'small';
}

const SIZE_CLASSNAME_MAP = {
  regular: 'px-2 py-1 m-2 text-base font-bold',
  small: 'px-1 py-1 m-1 text-xs font-bold',
}

export default function Tag({ id, name, color, size = 'regular' }: TagProps) {
  return (
    <span 
      style={{'backgroundColor': color}}
      className={`rounded cursor-pointer text-white ${SIZE_CLASSNAME_MAP[size]}`}
    >{name}</span>
  )
}
