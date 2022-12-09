import { call, put, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'

import {
    getProfileById,
    getProfileByIdFailed,
    getProfileByIdSuccess,
    updateProfile,
    updateProfileFailed,
    updateProfileSuccess,
} from '@/actions'
import { userMutationGraphQL, usersQueryGraphQL } from '@/graphQL'

function* getProfileByIdSaga(action) {
    try {
        const response = yield call(usersQueryGraphQL.getStudentByAccessToken)
        console.log(response)

        yield put(getProfileByIdSuccess(response.data.GetStudentByAccessToken.userHttp))
    } catch (e) {
        yield put(getProfileByIdFailed(e))
        notification.error({ message: 'Ошибка', description: e.message })
    }
}

function* updateProfileSaga(action) {
    try {
        const { profile, role } = action.payload
        const response = yield call(userMutationGraphQL.updateProfile, { input: profile }, role)
        console.log(response)

        yield put(updateProfileSuccess(response.data.UpdateStudent.userHttp))
        notification.success({ message: 'Успешно обновлено!' })
    } catch (e) {
        yield put(updateProfileFailed(e))
        notification.error({ message: 'Ошибка', description: e.message })
    }
}

export function* profileSaga() {
    yield takeLatest(getProfileById, getProfileByIdSaga)
    yield takeLatest(updateProfile, updateProfileSaga)
}