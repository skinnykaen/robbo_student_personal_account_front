import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import {
  HOME_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  PROJECT_PAGE_ROUTE,
  MY_PROJECTS_ROUTE,
  MY_COURSES_ROUTE,
  COURSE_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
} from '@/constants'

import Loader from '@/components/Loader'

const HomePage = lazy(() => import('@/pages/Home'))
const LoginPage = lazy(() => import('@/pages/Login'))
const MyProjects = lazy(() => import('@/pages/MyProjects'))
const ProjectPage = lazy(() => import('@/pages/ProjectPage'))
const MyCourses = lazy(() => import('@/pages/MyCourses'))
const CoursePage = lazy(() => import('@/pages/CoursePage'))
const ProfilePage = lazy(() => import('@/pages/Profile'))

export default () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path={HOME_PAGE_ROUTE}
          element={<HomePage />}
        />
        <Route
          path={LOGIN_PAGE_ROUTE}
          element={<LoginPage />}
        />
        <Route
          path={MY_PROJECTS_ROUTE}
          element={<MyProjects />}
        />
        <Route
          path={PROJECT_PAGE_ROUTE}
          element={<ProjectPage />}
        />
        <Route
          path={MY_COURSES_ROUTE}
          element={<MyCourses />}
        />
        <Route
          path={COURSE_PAGE_ROUTE}
          element={<CoursePage />}
        />
        <Route
          path={PROFILE_PAGE_ROUTE}
          element={<ProfilePage />}
        />
        <Route
          path='/'
          element={<Navigate to={HOME_PAGE_ROUTE} replace />} />
      </Routes>
    </Suspense>
  )
}
