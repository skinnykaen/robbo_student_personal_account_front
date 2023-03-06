import React, { memo } from 'react'
import { Button, Select, Form, Input, notification } from 'antd'
import { PropTypes } from 'prop-types'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { useIntl, FormattedMessage } from 'react-intl'

import { LockOutlined, MailOutlined } from '@ant-design/icons'

import {
    FREE_LISTENER,
    PARENT,
    STUDENT,
    TEACHER,
    UNIT_ADMIN,
    SUPER_ADMIN,
    userRole,
} from '@/constants'
import { authMutationsGQL } from '@/graphQL'


const SignInForm = memo(({
    handleSubmit,
    needSelectRole,
}) => {
    const intl = useIntl()
    const roles = [
        { value: STUDENT, label: userRole[STUDENT] },
        { value: TEACHER, label: userRole[TEACHER] },
        { value: PARENT, label: userRole[PARENT] },
        { value: FREE_LISTENER, label: userRole[FREE_LISTENER] },
        { value: UNIT_ADMIN, label: userRole[UNIT_ADMIN] },
        { value: SUPER_ADMIN, label: userRole[SUPER_ADMIN] },
    ]

    const [form] = Form.useForm()
    const navigate = useNavigate()

    const [login] = useMutation(authMutationsGQL.SIGN_IN, {
        onCompleted: ({ SingIn }) => {
            localStorage.setItem('token', SingIn.accessToken)
            navigate('/')
        },
        onError: error => {
            notification.error({
                message: intl.formatMessage({ id: 'notification.error_message' }),
                description: error?.message,
            })
        },
    })


    return (
        <Form
            name='normal_login'
            className='login-form'
            onFinish={({ email, password, role }) => {
                login({
                    variables: {
                        input: {
                            email,
                            password,
                            userRole: role,
                        },
                    },
                })
            }}
            form={form}
        >
            <Form.Item
                name='email'
                rules={[
                    {
                        required: true,
                        message: <FormattedMessage id='sign_up_form.email_rule' />,
                    },
                ]}
            >
                <Input
                    prefix={<MailOutlined className='site-form-item-icon' />}
                    placeholder={intl.formatMessage({ id: 'sign_up_form.email_placeholder' })}
                    size='large'
                />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[
                    {
                        required: true,
                        message: <FormattedMessage id='sign_up_form.password_rule' />,
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    type='password'
                    placeholder={intl.formatMessage({ id: 'sign_up_form.password_placeholder' })}
                    size='large'
                />
            </Form.Item>

            <Form.Item
                label={intl.formatMessage({ id: 'sign_in_form.select_role' })}
                name='role'
                rules={[
                    {
                        required: true,
                        message: <FormattedMessage id='sign_in_form.role_rule' />,
                    },
                ]}
            >
                <Select
                    options={roles}
                    size='large'
                />
            </Form.Item>

            <Form.Item shouldUpdate>
                {
                    () => (
                        <Button
                            type='primary' htmlType='submit'
                            className='login-form-button'
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            <FormattedMessage id='sign_in_form.sign_in' />
                        </Button>
                    )
                }
            </Form.Item>
        </Form >
    )
})

SignInForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    needSelectRole: PropTypes.bool,
}

export default SignInForm