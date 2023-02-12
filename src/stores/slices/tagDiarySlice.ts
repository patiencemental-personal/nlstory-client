import { createSlice } from '@reduxjs/toolkit';
import { TagType, DiaryType } from 'utils/types';

// Define a type for the slice state
export type TagDiaryState = {
  tags: TagType[];
  diarys: DiaryType[];
}

// Define the initial state using that type
const initialState: TagDiaryState = {
  tags: [],
  diarys: [],
}

export const TagDiarySlice = createSlice({
  name: 'tagDiary',
  initialState,
  reducers: {
    sInitTags: (state, action: { payload: TagType[] }) => {
      state.tags = action.payload;
    },
    sAddTag: (state, action: { payload: TagType }) => {
      state.tags.push(action.payload);
    },
    sUpdateTag: (state, action: { payload: TagType }) => {
      const tag = state.tags.find(tag => tag.id === action.payload.id);
      if (tag) {
        const { name, color } = action.payload;
        tag.name = name;
        tag.color = color;
      }
    },
    sDeleteTag: (state, action: { payload: string }) => {
      const tagId = action.payload;
      state.tags = state.tags.filter(tag => tag.id !== tagId);
    },
    sInitDiarys: (state, action: { payload: DiaryType[] }) => {
      state.diarys = action.payload;
    },
    sAddDiary: (state, action: { payload: DiaryType }) => {
      state.diarys.push(action.payload);
    },
    sUpdateDiary: (state, action: { payload: DiaryType }) => {
      const diary = state.diarys.find(diary => diary.id === action.payload.id);
      if (diary) {
        diary.summary = action.payload.summary;
        diary.content = action.payload.content;
        diary.tagIds = action.payload.tagIds;
        diary.updatedAt = Date.now();
      }
    },
    sDeleteDiary: (state, action: { payload: string }) => {
      const diaryId = action.payload;
      state.diarys = state.diarys.filter(diary => diary.id !== diaryId);
    },
  },
})

export const { 
  sInitTags, sAddTag, sUpdateTag, sDeleteTag,
  sInitDiarys, sAddDiary, sUpdateDiary, sDeleteDiary
} = TagDiarySlice.actions;

export default TagDiarySlice.reducer;