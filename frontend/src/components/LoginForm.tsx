import { gql, useMutation } from '@apollo/client'
import { Alert, Button, Form, Input } from 'antd'
import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'

type LoginProps = {
    email: string
    password: string
}


const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            message
        }
    }
`

const LoginForm = () => {
    const navigate = useNavigate();
    const { refetch } = useAuth();
    const { t } = useTranslation("login");

    const [login, { loading, error }] = useMutation(LOGIN, {
        onCompleted: async () => {
            await refetch();
            navigate("/c/chat");
        },
    });

    const onFinish = async (values: LoginProps) => {
        try {
            await login({ variables: { email: values.email, password: values.password } });
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <>
            {
                error &&
                <Alert className="!my-4" showIcon type="error" message={t(error.message)}></Alert>
            }
            <div className="flex">
                <div className="flex flex-col justify-center w-full flex-1">
                    <Form layout="vertical" onFinish={onFinish} className="">
                        <Form.Item label={t("email")} name="email"
                            rules={[{ required: true, message: t("requiredField") }]}
                        >
                            <Input placeholder={t("emailPlaceholder")} />
                        </Form.Item>
                        <Form.Item label={t("password")} name="password"
                            rules={[{ required: true, message: t("requiredField") }]}
                        >
                            <Input type="password" placeholder={t("passwordPlaceholder")} />
                        </Form.Item>

                        <Button type="primary" htmlType="submit" className="mb-5 w-full" loading={loading}>{t("login")}</Button>
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