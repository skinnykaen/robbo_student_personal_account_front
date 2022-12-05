import { handleActions } from 'redux-actions'

import {
    clearProjectPageState,
    getProjectPageById,
    getProjectPageByIdFailed,
    getProjectPageByIdSuccess,
    updateProjectPage,
    updateProjectPageFailed,
    updateProjectPageSuccess,
} from '@/actions'

const INITIAL_STATE = {
    projectPage: {},
    loading: true,
}

export default handleActions({
    [getProjectPageById](state, action) {
        return { ...state, loading: true }
    },
    [getProjectPageByIdSuccess](state, { payload }) {
        return { ...state, loading: false, projectPage: payload.response }
    },
    [getProjectPageByIdFailed](state, action) {
        return { ...state, loading: false }
    },
    [updateProjectPage](state, action) {
        return { ...state, loading: true }
    },
    [updateProjectPageSuccess](state, { payload }) {
        return { ...state, loading: false, projectPage: { ...state.projectPage, ...payload.response } }
    },
    [updateProjectPageFailed](state, action) {
        return { ...state, loading: false }
    },
    [clearProjectPageState](state) {
        return INITIAL_STATE
    },
}, INITIAL_STATE)

export const getProjectPage = state => state