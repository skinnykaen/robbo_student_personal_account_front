import instance from './instance'

export const authAPI = {
    signUp(email, password) {
        return instance.post('auth/sign-up',
            {
                email: email,
                password: password,
            })
    },

    signIn(email, password) {
        return instance.post('auth/sign-in',
            {
                email: email,
                password: password,
            },
        )
    },

    signOut() {
        return instance.post('auth/sign-out')
    },

    refresh() {
        return instance.get('auth/refresh', {
            withCredentials: true,
        })
    },

    checkAuth(token) {
        return instance.get('auth/check-auth', {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    },
}