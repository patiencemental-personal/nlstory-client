import React from 'react'
import styles from './Tag.module.css';
import textStyles from 'styles/Text.module.css';

type TagType = {
  id: string;
  name: string;
  color: string;
};

type TagProps = {
  tag: TagType;
  size?: 'regular' | 'small';
  onClick?: (event: React.BaseSyntheticEvent) => void;
}

const SIZE_CLASSNAME_MAP = {
  regular: `${styles.regular} ${textStyles.xl}`,
  small: `${styles.small} ${textStyles.sm}`,
}

export default function Tag({ tag, size = 'regular', onClick }: TagProps) {
  const { id, name, color } = tag;
  return (
    <span
      data-tag-id={id}
      onClick={onClick}
      style={{'backgroundColor': color}}
      className={`${styles.tag} ${SIZE_CLASSNAME_MAP[size]} ${onClick ? 'pointer' : 'auto'}`}
    >{name}</span>
  )
}
