import { handleActions } from 'redux-actions'

import {
    clearMyProjectsState,
    createProjectPage,
    createProjectPageFailed,
    createProjectPageSuccess,
    deleteProjectPage,
    deleteProjectPageFailed,
    deleteProjectPageSuccess,
    getProjectPageByAccessTokenFailed,
    getProjectPageByAccessTokenSuccess,
    getProjectPagesByAccessToken,
} from '@/actions'

const INITIAL_STATE = {
    loading: true,
    projectPages: [],
    err: null,
}

export default handleActions({
    [createProjectPage](state) {
        return { ...state, loading: true }
    },
    [createProjectPageSuccess](state, { payload }) {
        return {
            ...state, loading: false, projectPages: [...state.projectPages, payload.response],
        }
    },
    [createProjectPageFailed](state, action) {
        return { ...state, loading: true }
    },
    [deleteProjectPage](state, action) {
        return { ...state, loading: true }
    },
    [deleteProjectPageSuccess](state, { payload }) {
        const newProjectPages = [...state.projectPages]
        newProjectPages.splice(payload.projectPageIndex, 1)
        return { ...state, loading: false, projectPages: newProjectPages }
    },
    [deleteProjectPageFailed](state, action) {
        return { ...state, loading: false }
    },
    [clearMyProjectsState](state, action) {
        return INITIAL_STATE
    },
    [getProjectPagesByAccessToken](state) {
        return { ...state, loading: true }
    },
    [getProjectPageByAccessTokenSuccess](state, { payload }) {
        return { ...state, loading: false, projectPages: payload.response }
    },
    [getProjectPageByAccessTokenFailed](state, { payload }) {
        return { ...state, loading: false, err: payload.message }
    },
}, INITIAL_STATE)

export const getProjectPagesState = state => state