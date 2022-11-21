// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../../app/store'
import { createSlice } from '@reduxjs/toolkit'

export type TestState = {
  test: string;
}

const initialState: TestState = {
  test: 'test-string',
}

export const TestSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
  },
})

export default TestSlice.reducer