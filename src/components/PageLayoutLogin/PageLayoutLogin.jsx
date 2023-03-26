import React from 'react'
import { Layout, notification, Tabs } from 'antd'
import { useIntl } from 'react-intl'
import { compose } from 'redux'
import { graphql } from '@apollo/client/react/hoc'

import SignInForm from '@/components/SignInForm'
import SignUpForm from '@/components/SignUpForm'
import { useActions } from '@/helpers'
import { signInRequest, signUpRequest } from '@/actions'

import { authMutationsGQL, studentMutationsGQL } from '@/graphQL'

const { Content } = Layout

const PageLayoutLogin = ({
    intl,
    SignUpRequest,
}) => {
    const actions = useActions({ signInRequest, signUpRequest }, [])
    return (
        <Layout style={{ background: 'linear-gradient(to bottom, #008000, #f0fff0)', margin: '5rem 10rem' }}>
            <Content style={{ display: 'flex', justifyContent: 'center', background: 'white', padding: '5rem 10rem' }}>
                <Tabs
                    defaultActiveKey='1'
                    items={[
                        {
                            label: intl.formatMessage({ id: 'login_page.title' }),
                            key: '1',
                            children: <SignInForm handleSubmit={user => actions.signInRequest(user)} />,
                        },
                        {
                            label: intl.formatMessage({ id: 'login_page.registration' }),
                            key: '2',
                            children: <SignUpForm
                                handleSubmit={SignUpRequest}
                                parentId=''
                                robboGroupId=''
                                robboUnitId=''
                            />,
                        },
                    ]}
                />
            </Content>
        </Layout >
    )
}

const PageLayoutLoginContainer = () => {
    const intl = useIntl()
    const WithGraphQLComponent = compose(
        graphql(
            authMutationsGQL.SIGN_UP_REQUEST,
            {
                name: 'SignUpRequest',
                options: props => {
                    return {
                        onCompleted: () => {
                            notification.success({
                                description: 'Запрос на регистрацию отправлен!',
                                message: 'Ждите подтверждения активации',
                            })
                        },
                        onError: error => {
                            notification.error({
                                message: intl.formatMessage({ id: 'notification.error_message' }),
                                description: error?.message,
                            })
                        },
                    }
                },
            },
        ),
    )
        (PageLayoutLogin)

    return (
        <WithGraphQLComponent intl={intl} />
    )
}

export default PageLayoutLoginContainer