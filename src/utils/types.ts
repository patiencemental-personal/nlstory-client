import { tagEditionPopupModeType } from './freezeTypes';
import { diaryPopupModeType } from 'utils/freezeTypes';

export type DiaryPopupModeType = keyof typeof diaryPopupModeType;
export type TagEditionPopupModeType = keyof typeof tagEditionPopupModeType;

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
  createdAt: number;
  updatedAt: number;
};