import { createAction } from 'redux-actions'

import {
    GET_PROJECT_PAGE_BY_ID,
    GET_PROJECT_PAGE_BY_ID_FAILED,
    GET_PROJECT_PAGE_BY_ID_SUCCESS,
    UPDATE_PROJECT_PAGE,
    UPDATE_PROJECT_PAGE_FAILED,
    UPDATE_PROJECT_PAGE_SUCCESS,
    CREATE_PROJECT_PAGE,
    CREATE_PROJECT_PAGE_FAILED,
    CREATE_PROJECT_PAGE_SUCCESS,
    DELETE_PROJECT_PAGE,
    DELETE_PROJECT_PAGE_SUCCESS,
    DELETE_PROJECT_PAGE_FAILED,
    CLEAR_PROJECT_PAGE_STATE,
    CLEAR_MY_PROJECTS_STATE,
    GET_PROJECT_PAGE_BY_ACCESS_TOKEN,
    GET_PROJECT_PAGE_BY_ACCESS_TOKEN_SUCCESS,
    GET_PROJECT_PAGE_BY_ACCESS_TOKEN_FAILED,
} from '@/constants'

export const getProjectPageById = createAction(GET_PROJECT_PAGE_BY_ID, id => ({ id }))
export const getProjectPageByIdSuccess = createAction(GET_PROJECT_PAGE_BY_ID_SUCCESS, response => ({ response }))
export const getProjectPageByIdFailed = createAction(GET_PROJECT_PAGE_BY_ID_FAILED, err => err)

export const createProjectPage = createAction(CREATE_PROJECT_PAGE)
export const createProjectPageSuccess = createAction(CREATE_PROJECT_PAGE_SUCCESS, response => ({ response }))
export const createProjectPageFailed = createAction(CREATE_PROJECT_PAGE_FAILED, err => err)

export const updateProjectPage = createAction(UPDATE_PROJECT_PAGE, projectPage => ({ projectPage }))
export const updateProjectPageSuccess = createAction(UPDATE_PROJECT_PAGE_SUCCESS, response => ({ response }))
export const updateProjectPageFailed = createAction(UPDATE_PROJECT_PAGE_FAILED, err => err)

export const deleteProjectPage = createAction(DELETE_PROJECT_PAGE, (projectPageId, projectPageIndex) => ({ projectPageId, projectPageIndex }))
export const deleteProjectPageSuccess = createAction(DELETE_PROJECT_PAGE_SUCCESS, projectPageIndex => ({ projectPageIndex }))
export const deleteProjectPageFailed = createAction(DELETE_PROJECT_PAGE_FAILED, err => err)

export const getProjectPagesByAccessToken = createAction(GET_PROJECT_PAGE_BY_ACCESS_TOKEN, page => ({ page }))
export const getProjectPageByAccessTokenSuccess = createAction(GET_PROJECT_PAGE_BY_ACCESS_TOKEN_SUCCESS, response => ({ response }))
export const getProjectPageByAccessTokenFailed = createAction(GET_PROJECT_PAGE_BY_ACCESS_TOKEN_FAILED, err => err)

export const clearProjectPageState = createAction(CLEAR_PROJECT_PAGE_STATE)
export const clearMyProjectsState = createAction(CLEAR_MY_PROJECTS_STATE)