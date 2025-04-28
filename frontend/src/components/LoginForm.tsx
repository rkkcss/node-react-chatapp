import { Alert, Button, Form, Input } from 'antd'
import { NavLink, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { LoginFormType, loginQuery } from '../queries/AuthQueries'
import { useState } from 'react'
import { AxiosResponse } from 'axios'

const LoginForm = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("login");
    const [error, setError] = useState<string>("");

    const onFinish = async (values: LoginFormType) => {
        console.log(values)
        loginQuery(values).then((result) => {
            const response = result as AxiosResponse;
            const bearerToken = response?.headers?.authorization;
            if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                const jwt = bearerToken.slice(7, bearerToken.length);
                sessionStorage.setItem("jhi-authenticationToken", jwt);
                navigate("/c/chat")
            }
        }).catch(err => {
            setError(err)
        })
    };

    return (
        <>
            {
                error &&
                <Alert className="!my-4" showIcon type="error" message={t(error)}></Alert>
            }
            <div className="flex">
                <div className="flex flex-col justify-center w-full flex-1">
                    <Form layout="vertical" onFinish={onFinish} className="">
                        <Form.Item label={t("email")} name="username"
                            rules={[{ required: true, message: t("requiredField") }]}
                        >
                            <Input placeholder={t("emailPlaceholder")} />
                        </Form.Item>
                        <Form.Item label={t("password")} name="password"
                            rules={[{ required: true, message: t("requiredField") }]}
                        >
                            <Input type="password" placeholder={t("passwordPlaceholder")} />
                        </Form.Item>

                        <Button type="primary" htmlType="submit" className="mb-5 w-full">{t("login")}</Button>
                        <div className="text-center">
                            <NavLink to={"/registration"}>{t("dontHaveProfile")}</NavLink>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default LoginForm