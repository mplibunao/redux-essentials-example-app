import { nanoid, createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: nanoid(), name: 'Tianna Jenkins' },
  { id: nanoid(), name: 'Kevin Grantt' },
  { id: nanoid(), name: 'Madison Price' },
]

export const getRandomInitialUser = () => {
  const randomIndex = Math.floor(Math.random() * initialState.length)
  return initialState[randomIndex]
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export const usersReducer = usersSlice.reducer
