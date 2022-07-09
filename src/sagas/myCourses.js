import { call, put, take, takeLatest } from 'redux-saga/effects'
import { coursePageAPI } from '@/api'
import { 
    getAllCoursePages, getAllCoursePagesFailed, getAllCoursePagesSuccess,
    getCoursePageById, getCoursePageByIdFailed, getCoursePageByIdSuccess
} from '@/actions'


function* getAllCoursePagesSaga(action) {
    try {
        const { token } = action.payload
        const response = yield call(coursePageAPI.getAllCoursePages, token)
        console.log(response)

        yield put(getAllCoursePagesSuccess(response))
    } catch (e) {
        yield put(getAllCoursePagesFailed(e.message))
    }
}

function* getCoursePageByIdSaga(action) {
    try {

        const response = yield call(coursePageAPI.getCoursePageById)
        console.log(response)

        yield put(getCoursePageByIdSuccess(response))
    } catch (e) {
        yield put(getCoursePageByIdFailed(e.message))
    }
}

export function* myCoursesSaga() {
    yield takeLatest(getAllCoursePages, getAllCoursePagesSaga)
    yield takeLatest(getCoursePageById, getCoursePageByIdSaga)
}