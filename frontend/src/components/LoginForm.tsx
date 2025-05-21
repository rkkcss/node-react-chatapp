import { Alert, Button, Form, Input } from 'antd'
import { NavLink } from 'react-router'
import { useTranslation } from 'react-i18next'
import { LoginFormType } from '../queries/AuthQueries'
import { useAuth } from '../contexts/AuthContext'

const LoginForm = () => {
    const { t } = useTranslation("login");

    const { login, error } = useAuth();

    const onFinish = async (values: LoginFormType) => {
        login(values)
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
                        <Form.Item label={t("username")} name="username"
                            rules={[{ required: true, message: t("requiredField") }]}
                        >
                            <Input placeholder={t("usernamePlaceholder")} />
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