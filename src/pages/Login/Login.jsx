import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from 'react-router-dom'

import { PageLayout } from "@/layouts"
import {
    Card,
    MainContainer,
    WelcomeText,
    InputContainer,
    ButtonContainer,
    LoginWith,
    HorizontalRule,
    ForgotPassword,
    LoginForm,
    SwitchInOut,
    SignIn,
    SignOut,
    ErrorAlert,
    SuccessAlert,
} from "./components"

import { emailOnChange, passwordOnChange, signInRequest, signUpRequest } from "@/actions"
import {
    getEmail, getPassword, getToken,
    getSignInError, getSignUpError,
    getSuccessInResponse, getSuccessUpResponse,
    getIsAuth,
} from "@/reducers/login"

import Input from "@/components/UI/Input"
import Button from "@/components/UI/Button"

export default () => {
    const [signIn, setSignIn] = useState(false)
    const switchIn = () => setSignIn(false)
    const switchUp = () => setSignIn(true)

    const dispatch = useDispatch()
    const email = useSelector(state => getEmail(state.login))
    const password = useSelector(state => getPassword(state.login))
    const token = useSelector(state => getToken(state.login))
    const signInError = useSelector(state => getSignInError(state.login))
    const signUpError = useSelector(state => getSignUpError(state.login))
    const isAuth = useSelector(state => getIsAuth(state.login))
    const successInResponse = useSelector(state => getSuccessInResponse(state.login))
    const successUpResponse = useSelector(state => getSuccessUpResponse(state.login))


    const emailHandle = email => {
        dispatch(emailOnChange(email))
    }
    const passwordHandle = password => {
        dispatch(passwordOnChange(password))
    }
    const signInSubmit = () => {
        dispatch(signInRequest(email, password))
    }
    const signUpSubmit = () => {
        dispatch(signUpRequest(email, password))
    }

    if (isAuth) {
        return <Redirect to="/" />
    }

    return (
        <PageLayout>
            <Card>
                <LoginForm>
                    {signIn
                        ? <MainContainer>
                            <SwitchInOut>
                                <SignIn signIn={signIn} onClick={switchIn}><h4>??????????</h4></SignIn>
                                <SignOut signIn={signIn} onClick={switchUp}><h4>??????????????????????</h4></SignOut>
                            </SwitchInOut>
                            <WelcomeText>?????????? ????????????????????!</WelcomeText>
                            <InputContainer>
                                <Input type="text" placeholder="Email"
value={email} handleInput={emailHandle} />
                                <Input type="password" placeholder="Password"
value={password} handleInput={passwordHandle} />
                            </InputContainer>
                            <ButtonContainer>
                                <Button content="??????????????????????" handleSubmit={signUpSubmit} />
                            </ButtonContainer>
                            {/* <LoginWith>OR LOGIN WITH</LoginWith> */}
                            <HorizontalRule />
                            {/* <ForgotPassword>Forgot Password ?</ForgotPassword> */}
                            {signUpError &&
                                <ErrorAlert>
                                    <span>?????????????????? ????????????: {signUpError}</span>
                                </ErrorAlert>
                            }
                            {
                                successUpResponse &&
                                <SuccessAlert><span>??????????????!</span></SuccessAlert>
                            }
                          </MainContainer>
                        :                        <MainContainer>
                            <SwitchInOut>
                                <SignIn onClick={switchIn}><h4>??????????</h4></SignIn>
                                <SignOut onClick={switchUp}><h4>??????????????????????</h4></SignOut>
                            </SwitchInOut>
                            <WelcomeText>?????????? ????????????????????!</WelcomeText>
                            <InputContainer>
                                <Input type="text" placeholder="Email"
value={email} handleInput={emailHandle} />
                                <Input type="password" placeholder="Password"
value={password} handleInput={passwordHandle} />
                            </InputContainer>
                            <ButtonContainer>
                                <Button content="??????????" handleSubmit={signInSubmit} />
                            </ButtonContainer>
                            {/* <LoginWith>OR LOGIN WITH</LoginWith> */}
                            <HorizontalRule />
                            {/* <ForgotPassword>Forgot Password ?</ForgotPassword> */}
                            {signInError &&
                                <ErrorAlert>
                                    <span>?????????????????? ????????????: {signInError}</span>
                                </ErrorAlert>
                            }
                            {
                                successInResponse &&
                                <SuccessAlert><span>??????????????!</span></SuccessAlert>
                            }
                                                 </MainContainer>
                    }
                </LoginForm>
            </Card>
        </PageLayout >
    )
}