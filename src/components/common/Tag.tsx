import React from 'react'
import { TagType } from 'utils/types';

export type TagProps = {
  tag: TagType;
  size?: 'regular' | 'small';
  onClick?: (event: React.BaseSyntheticEvent) => void;
}

const SIZE_CLASSNAME_MAP = {
  regular: 'px-2 py-1 mr-2 mb-2 text-base font-bold h-8',
  small: 'p-1 mr-1 mb-1 text-sm font-semibold',
}

export default function Tag({ tag, size = 'regular', onClick }: TagProps) {
  const { id, name, color } = tag;
  return (
    <span
      data-tag-id={id}
      onClick={onClick}
      style={{'backgroundColor': color, 'cursor': onClick ? 'pointer' : 'auto'}}
      className={`rounded cursor-pointer text-white ${SIZE_CLASSNAME_MAP[size]}`}
    >{name}</span>
  )
}
