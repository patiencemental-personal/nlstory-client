import React from 'react'
import Tag  from 'components/common/Tag';
import { DiaryType, TagType } from 'utils/types';
import { usePopupStore } from 'stores/usePopupStore';
import { diaryPopupModeType, popupType } from 'utils/freezeTypes';

type Props = {
  tags: TagType[];
  diary: DiaryType;
}

export default function DiaryCover({ tags, diary }: Props) {
  const { summary, tagIds, createdAt, updatedAt } = diary;

  const { openPopup } = usePopupStore();
  const openDiaryViewerPopup = () => {
    openPopup({
      type: popupType.DIARY_EDITION_OR_VIEWER,
      option: {
        mode: diaryPopupModeType.UPDATION,
        diary: diary
      }
    })
  }

  if (diary) {
    return (
      <div onClick={openDiaryViewerPopup} className='cursor-pointer border rounded w-[250px] h-72 p-2 mx-auto flex flex-col justify-between'>
        <div id='main' className='h-full'>
          <div id='summary' className='p-1 w-full text-base whitespace-pre-line line-clamp-[5]'>{summary}</div>
        </div>
        <div id='meta' className='border-solid border-t divide-slate-500'>
          <div className='p-1 text-sm'>
            <p className='flex justify-between'><span>생성일</span><span>{new Date(createdAt).toLocaleDateString()}</span></p>
            <p className='flex justify-between'><span>수정일</span><span>{new Date(updatedAt).toLocaleDateString()}</span></p>
          </div>
          <ul className='flex flex-wrap'>
            {tags?.filter(tag => tagIds?.includes(tag.id)).map((tag, index) => <Tag key={index} tag={tag} size='small' />)}
          </ul>
        </div>
      </div>
    )
  }
  return <React.Fragment></React.Fragment>
}
