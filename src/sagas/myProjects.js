import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import {
    createProjectPage,
    createProjectPageFailed,
    createProjectPageSuccess,
    deleteProjectPage,
    deleteProjectPageFailed,
    deleteProjectPageSuccess,
    getProjectPageById,
    getProjectPageByIdFailed,
    getProjectPageByIdSuccess,
    updateProjectPage,
    updateProjectPageFailed,
    updateProjectPageSuccess,
    getProjectPagesByAccessToken,
    getProjectPageByAccessTokenSuccess,
    getProjectPageByAccessTokenFailed,
} from '@/actions'

import { projectPageMutationGraphQL, projectPageQueryGraphQL } from '@/graphQL'

function* getProjectPageByIdSaga(action) {
    try {
        const { id } = action.payload
        const response = yield call(projectPageQueryGraphQL.getProjectPageById, { projectPageID: id })

        console.log(response)
        yield put(getProjectPageByIdSuccess(response.data.GetProjectPageById))
    } catch (e) {
        yield put(getProjectPageByIdFailed(e.message))
    }
}

function* createProjectPageSaga(action) {
    try {
        const response = yield call(projectPageMutationGraphQL.createProjectPage)

        console.log(response)
        yield put(createProjectPageSuccess(response.data.CreateProjectPage))
    } catch (e) {
        yield put(createProjectPageFailed(e.message))
    }
}

function* updateProjectPageSaga(action) {
    try {
        const { projectPage } = action.payload
        const response = yield call(projectPageMutationGraphQL.updateProjectPage, { input: projectPage })
        console.log(response)
        yield put(updateProjectPageSuccess(response.data.UpdateProjectPage))
    } catch (e) {
        yield put(updateProjectPageFailed(e))
    }
}

function* deleteProjectPageSaga(action) {
    try {
        const { projectPageId, projectPageIndex } = action.payload
        const response = yield call(projectPageMutationGraphQL.deleteProjectPage, projectPageId)

        console.log(response)
        yield put(deleteProjectPageSuccess(projectPageIndex))
    } catch (e) {
        yield put(deleteProjectPageFailed(e.message))
    }
}

function* getProjectPagesByAccessTokenSaga(action) {
    try {
        const response = yield call(projectPageQueryGraphQL.getProjectPagesByAccessToken)

        console.log(response)
        yield put(getProjectPageByAccessTokenSuccess(response.data.GetAllProjectPagesByAccessToken.projectPages))
    } catch (e) {
        yield put(getProjectPageByAccessTokenFailed(e))
    }
}

export function* myProjectsSaga() {
    yield takeLatest(getProjectPageById, getProjectPageByIdSaga)
    yield takeEvery(createProjectPage, createProjectPageSaga)
    yield takeLatest(updateProjectPage, updateProjectPageSaga)
    yield takeLatest(deleteProjectPage, deleteProjectPageSaga)
    yield takeLatest(getProjectPagesByAccessToken, getProjectPagesByAccessTokenSaga)
}