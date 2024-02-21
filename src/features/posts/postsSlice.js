import { createSlice, nanoid } from '@reduxjs/toolkit'
import { getRandomInitialUser } from '../users/usersSlice'
import { sub } from 'date-fns'

const reactions = {
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
}

const initialState = [
  {
    id: nanoid(),
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    title: 'First Post!',
    content: 'Hello!',
    user: getRandomInitialUser().id,
    reactions,
  },
  {
    id: nanoid(),
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    title: 'Second Post!',
    content: 'More text',
    user: getRandomInitialUser().id,
    reactions,
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
          },
        }
      },
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
})

export const postsReducer = postsSlice.reducer
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
