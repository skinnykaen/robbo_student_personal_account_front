import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useActions } from './useActions'

import { getLoginState } from '@/reducers/login'

export function useUserIdentity() {
    const { checkAuthRequest } = useActions()
    useEffect(() => {
        const accessToken = localStorage.getItem('token')
        checkAuthRequest(accessToken)
    }, [])
    return useSelector(({ login }) => getLoginState(login))
}