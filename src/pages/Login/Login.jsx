import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PageLayout } from "@/layouts";
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
} from "./components";

import { emailOnChange, passwordOnChange, signInRequest, signUpRequest } from "@/actions";
import { getEmail, getPassword } from "@/reducers/login";

import Input from "@/components/Input";
import Button from "@/components/Button";

export default () => {
    const [signIn, setSignIn] = useState(false);
    const switchIn = () => setSignIn(false);
    const switchUp = () => setSignIn(true);

    const dispatch = useDispatch();
    const email = useSelector(state => getEmail(state.login));
    const password = useSelector(state => getPassword(state.login));
    const emailHandle = (email) => {
        dispatch(emailOnChange(email))
    }
    const passwordHandle = (password) => {
        dispatch(passwordOnChange(password))
    }
    const signInSubmit = () => {
        dispatch(signInRequest(email, password))
    }
    const signUpSubmit = () => {
        dispatch(signUpRequest(email, password))
    }

    return (
        <PageLayout>
            <Card>
                <LoginForm>
                    {signIn &&
                        <MainContainer>
                            <SwitchInOut>
                                <SignIn signIn={signIn} onClick={switchIn}><h4>Войти</h4></SignIn>
                                <SignOut signIn={signIn} onClick={switchUp}><h4>Регистрация</h4></SignOut>
                            </SwitchInOut>
                            <WelcomeText>Добро пожаловать!</WelcomeText>
                            <InputContainer>
                                <Input type="text" placeholder="Email" value={email} handleInput={emailHandle} />
                                <Input type="password" placeholder="Password" value={password} handleInput={passwordHandle} />
                            </InputContainer>
                            <ButtonContainer>
                                <Button content="Регистрация" handleSubmit={signUpSubmit} />
                            </ButtonContainer>
                            {/* <LoginWith>OR LOGIN WITH</LoginWith> */}
                            <HorizontalRule />
                            {/* <ForgotPassword>Forgot Password ?</ForgotPassword> */}
                        </MainContainer>
                    }
                    {!signIn &&
                        <MainContainer>
                            <SwitchInOut>
                                <SignIn onClick={switchIn}><h4>Войти</h4></SignIn>
                                <SignOut onClick={switchUp}><h4>Регистрация</h4></SignOut>
                            </SwitchInOut>
                            <WelcomeText>Добро пожаловать!</WelcomeText>
                            <InputContainer>
                                <Input type="text" placeholder="Email" value={email} handleInput={emailHandle} />
                                <Input type="password" placeholder="Password" value={password} handleInput={passwordHandle} />
                            </InputContainer>
                            <ButtonContainer>
                                <Button content="Войти" handleSubmit={signInSubmit} />
                            </ButtonContainer>
                            {/* <LoginWith>OR LOGIN WITH</LoginWith> */}
                            <HorizontalRule />
                            {/* <ForgotPassword>Forgot Password ?</ForgotPassword> */}
                        </MainContainer>
                    }
                </LoginForm>
            </Card>
        </PageLayout >
    )
}