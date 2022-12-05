import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useActions } from './useActions'

import { getLoginState } from '@/reducers/login'
import { checkAuthRequest } from '@/actions'

export function useUserIdentity() {
    const action = useActions({ checkAuthRequest }, [])
    useEffect(() => {
        const accessToken = localStorage.getItem('token')
        action.checkAuthRequest(accessToken)
    }, [])
    return useSelector(({ login }) => getLoginState(login))
}