import { all } from 'redux-saga/effects'

import { loginWather } from './login'
import { myProjectsSaga } from './myProjects'
import { myCoursesSaga } from './myCourses'
import { profileSaga } from './profile'

export default function* rootSaga() {
  yield all([
    loginWather(),
    myProjectsSaga(),
    myCoursesSaga(),
    profileSaga(),
  ])
}
