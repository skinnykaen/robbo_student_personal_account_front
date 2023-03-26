import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Spin } from 'antd'

import {
  HOME_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  PROJECT_PAGE_ROUTE,
  MY_PROJECTS_ROUTE,
  MY_COURSES_ROUTE,
  COURSE_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  STUDENT,
  SUPER_ADMIN,
  STUDENTS_PAGE_ROUTE,
} from '@/constants'
import { ProtectedRoute } from '@/helpers'

const HomePage = lazy(() => import('@/pages/Home'))
const LoginPage = lazy(() => import('@/pages/Login'))
const MyProjects = lazy(() => import('@/pages/MyProjects'))
const ProjectPage = lazy(() => import('@/pages/ProjectPage'))
const MyCourses = lazy(() => import('@/pages/MyCourses'))
const CoursePage = lazy(() => import('@/pages/CoursePage'))
const ProfilePage = lazy(() => import('@/pages/Profile'))
const StudentsPage = lazy(() => import('@/pages/Students'))

export default () => {
  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route
          path={HOME_PAGE_ROUTE}
          element={
            <ProtectedRoute allowedRoles={[STUDENT, SUPER_ADMIN]}>
              <HomePage />
            </ProtectedRoute>}
        />
        <Route
          path={LOGIN_PAGE_ROUTE}
          element={<LoginPage />}
        />
        <Route
          path={MY_PROJECTS_ROUTE}
          element={
            <ProtectedRoute allowedRoles={[STUDENT, SUPER_ADMIN]}>
              <MyProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path={PROJECT_PAGE_ROUTE}
          element={
            <ProtectedRoute allowedRoles={[STUDENT, SUPER_ADMIN]}>
              <ProjectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={MY_COURSES_ROUTE}
          element={
            <ProtectedRoute allowedRoles={[STUDENT, SUPER_ADMIN]}>
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path={COURSE_PAGE_ROUTE}
          element={
            <ProtectedRoute allowedRoles={[STUDENT, SUPER_ADMIN]}>
              <CoursePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={PROFILE_PAGE_ROUTE}
          element={
            <ProtectedRoute allowedRoles={[STUDENT, SUPER_ADMIN]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={STUDENTS_PAGE_ROUTE}
          element={
            <ProtectedRoute allowedRoles={[SUPER_ADMIN]}>
              <StudentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/'
          element={<Navigate to={HOME_PAGE_ROUTE} replace />} />
      </Routes>
    </Suspense>
  )
}
