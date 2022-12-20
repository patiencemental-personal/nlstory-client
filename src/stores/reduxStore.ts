import { configureStore } from '@reduxjs/toolkit' ;
import TagDiaryReducer from './slices/tagDiarySlice';
import TestSliceReducer from './slices/testSlice';

/**
 * @see https://redux-toolkit.js.org/tutorials/typescript
 */
export default configureStore({
  reducer: {
    tagDiary: TagDiaryReducer,
    test: TestSliceReducer,
  },
});