import React, { memo, useState, useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { PropTypes } from 'prop-types'

import { LockOutlined, MailOutlined } from '@ant-design/icons'

const SignInForm = memo(({
    handleSubmit,
    needSelectRole,
}) => {
    const [form] = Form.useForm()
    console.log(handleSubmit)
    return (
        <Form
            name='normal_login'
            className='login-form'
            onFinish={({ email, password }) => {
                return handleSubmit({ email, password, role: 0 })
            }}
            form={form}
        >
            <Form.Item
                name='email'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите ваш Email!',
                    },
                ]}
            >
                <Input
                    prefix={<MailOutlined className='site-form-item-icon' />} placeholder='Email'
                    size='large'
                />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите ваш Пароль!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    type='password'
                    placeholder='Пароль'
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
                            Войти
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