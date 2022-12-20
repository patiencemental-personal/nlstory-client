import React from 'react'
import { TagType } from 'utils/types';

export type TagProps = {
  tag: TagType;
  size?: 'regular' | 'small';
}

const SIZE_CLASSNAME_MAP = {
  regular: 'px-2 py-1 m-2 text-base font-bold',
  small: 'px-1 py-1 m-1 text-xs font-bold',
}

export default function Tag({ tag, size = 'regular' }: TagProps) {
  const { id, name, color } = tag;
  return (
    <span
      data-tag-id={id}
      style={{'backgroundColor': color}}
      className={`rounded cursor-pointer text-white ${SIZE_CLASSNAME_MAP[size]}`}
    >{name}</span>
  )
}
