import { handleActions } from 'redux-actions'

import {
    clearProfileState,
    getProfileById,
    getProfileByIdFailed,
    getProfileByIdSuccess,
    updateProfile,
    updateProfileFailed,
    updateProfileSuccess,
} from '@/actions/profile'

const INITIAL_STATE = {
    profile: {},
    loading: true,
    err: null,
}

export default handleActions({

    [clearProfileState](state) {
        return INITIAL_STATE
    },
    [getProfileById](state) {
        return { ...state, loading: true }
    },
    [getProfileByIdSuccess](state, { payload }) {
        return {
            ...state, loading: false, profile: payload.response,
        }
    },
    [getProfileByIdFailed](state, { payload }) {
        return { ...state, loading: true, err: payload.message }
    },
    [updateProfile](state, action) {
        return { ...state, loading: true }
    },
    [updateProfileSuccess](state, { payload }) {
        return {
            ...state, loading: false, profile: { ...state.profile, ...payload.response },
        }
    },
    [updateProfileFailed](state, { payload }) {
        return { ...state, loading: true, err: payload.message }
    },
}, INITIAL_STATE)

export const getProfileState = state => state
export const getProfile = state => state.profile
export const getProfileLoading = state => state.loading