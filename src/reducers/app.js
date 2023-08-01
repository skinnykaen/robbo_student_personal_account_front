import { handleActions } from 'redux-actions'

import { changeLanguage } from '@/actions'

const INITIAL_STATE = {
    language: 'en',
    locale: 'ru',
}

export default handleActions({
    [changeLanguage](state, { payload }) {
        return { ...state, language: payload.language }
    },
}, INITIAL_STATE)

export const getAppState = state => state