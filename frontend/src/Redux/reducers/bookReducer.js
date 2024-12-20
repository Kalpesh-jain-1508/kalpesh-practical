import { createReducer } from '@reduxjs/toolkit'

export const bookReducer = createReducer(
    {books: []},
    {
        getAllBooksRequest: state => {
            state.loading = true
        },
        getAllBooksSuccess: (state, action) => {
            state.loading = false
            state.books = action.payload
        },
        getAllBooksFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
)