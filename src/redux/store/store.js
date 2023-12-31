import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../reducer/userSlice'

export default configureStore({
  reducer: {
    user: userSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
