import React, { memo, useState, useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { PropTypes } from 'prop-types'

const SignUpForm = memo(({
    handleSubmit,
    needSelectRole,
}) => {
    const [form] = Form.useForm()
    const [, forceUpdate] = useState({})
    useEffect(() => {
        forceUpdate({})
    }, [])

    return (
        <Form
            name='normal_login'
            className='signup-form'
            onFinish={({ email,
                password,
                role,
                nickname,
                lastname,
                firstname,
                middlename,
            }) => {
                return handleSubmit({
                    email, password, nickname, lastname, firstname, middlename,
                }, 0)
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
                    placeholder='Email'
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
                    type='password'
                    placeholder='Пароль'
                    size='large'
                />
            </Form.Item>
            <Form.Item
                name='nickname'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите ваш Nickname!',
                    },
                ]}
            >
                <Input
                    placeholder='Nickname'
                    size='large'
                />
            </Form.Item>
            <Form.Item
                name='firstname'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите ваше Имя!',
                    },
                ]}
            >
                <Input
                    placeholder='Имя'
                    size='large'
                />
            </Form.Item>
            <Form.Item
                name='lastname'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите вашу Фамилию!',
                    },
                ]}
            >
                <Input
                    placeholder='Фамилия'
                    size='large'
                />
            </Form.Item>
            <Form.Item
                name='middlename'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите ваше Отчество!',
                    },
                ]}
            >
                <Input
                    placeholder='Отчество'
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
                            Зарегистрироваться
                        </Button>
                    )
                }

            </Form.Item>
        </Form >
    )
})


SignUpForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    needSelectRole: PropTypes.bool,
}

export default SignUpForm