import { createSlice } from '@reduxjs/toolkit'
import { generateId } from 'utils/common';
import { TagType, DiaryType } from 'utils/types';

// Define a type for the slice state
export type TagDiaryState = {
  tags: TagType[];
  diarys: DiaryType[];
}

// Define the initial state using that type
const initialState: TagDiaryState = {
  tags: [
    { id: generateId(), name: '개발', color: '#3b82f6', },
    { id: generateId(), name: '생각', color: '#f59e0b', },
    { id: generateId(), name: '트레이딩', color: '#10b981', },
  ],
  diarys: [
    { id: generateId(), summary: '첫번째 일기', content: '첫번째 일기 내용', tagIds: [], createdAt: new Date(), updatedAt: new Date(), },
    { id: generateId(), summary: '두번째 일기', content: '두번째 일기 내용', tagIds: [], createdAt: new Date(), updatedAt: new Date(), },
    { id: generateId(), summary: '세번째 일기', content: '세번째 일기 내용', tagIds: [], createdAt: new Date(), updatedAt: new Date(), },
    { id: generateId(), summary: '네번째 일기', content: '네번째 일기 내용', tagIds: [], createdAt: new Date(), updatedAt: new Date(), },
    { id: generateId(), summary: '다섯번째 일기', content: '다섯번째 일기 내용', tagIds: [], createdAt: new Date(), updatedAt: new Date(), },
    { id: generateId(), summary: '여섯번째 일기', content: '여섯번째 일기 내용', tagIds: [], createdAt: new Date(), updatedAt: new Date(), },
    { id: generateId(), summary: '일곱번째 일기', content: '일곱번째 일기 내용', tagIds: [], createdAt: new Date(), updatedAt: new Date(), },
  ],
}

export const TagDiarySlice = createSlice({
  name: 'tagDiary',
  initialState,
  reducers: {
    addTag: (state, action: { payload: TagType }) => {
      state.tags.push(action.payload);
    },
    addDiary: (state, action: { payload: DiaryType }) => {
      state.diarys.push(action.payload);
    },
    updateDiary: (state, action: { payload: DiaryType }) => {
      const diary = state.diarys.find(diary => diary.id === action.payload.id);
      if (diary) {
        diary.summary = action.payload.summary;
        diary.content = action.payload.content;
        diary.tagIds = action.payload.tagIds;
        diary.updatedAt = new Date();
      }
    }
  },
})

export const { addTag, addDiary, updateDiary } = TagDiarySlice.actions;

export default TagDiarySlice.reducer;