import { diaryPopupModeType } from 'utils/freeze';

export type DiaryPopupModeType = keyof typeof diaryPopupModeType;

export type TagType = {
  id: string;
  name: string;
  color: string;
};

export type DiaryType = {
  id: string;
  summary: string;
  content: string;
  tagIds: string[];
  createdAt: Date;
  updatedAt: Date;
};