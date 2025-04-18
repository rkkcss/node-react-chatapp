import { Alert, Button, Form, Input, notification, } from 'antd'
import logo from "../assets/logo.webp";
import { useTranslation } from 'react-i18next';
import TypedBackground from '../components/TypedBackground';
import { NavLink, useNavigate } from 'react-router';
import LoginBottomArea from '../components/LoginBottomArea';
import { gql, useMutation } from '@apollo/client';

const REGISTRATION = gql`
    mutation register($name: String!, $email: String! $password: String!) {
        register(name: $name email: $email, password: $password) {
            message
        }
    }
`

const Registration = () => {
    const { t } = useTranslation("registration");
    const navigate = useNavigate();

    const [register, { error }] = useMutation(REGISTRATION, {
        onCompleted: async () => {
            notification.success({ message: t("registeredSuccessfully") });
            navigate("/login");
        },
    });

    return (
        <TypedBackground>
            <div className="h-dvh flex flex-col items-center justify-center">
                <div className="text-center flex justify-center flex-col items-center mb-7 relative z-20">
                    <img src={logo} className="h-12 min-w-16" alt="Logo" />
                    <h1 className="text-base font-bold text-slate-800 text-center max-w-sm">{t("motto")}</h1>
                </div>
                <div className="w-[90vw] md:w-[500px] p-6 rounded-lg border border-alto-200 shadow-sm backdrop-blur-lg bg-white/30">
                    <h1 className="text-3xl font-bold text-alto-950 mb-6">{t("register")}</h1>
                    {
                        error &&
                        <Alert className="!my-4" message={t(error.message)} type="error" showIcon />
                    }

                    <Form layout="vertical" onFinish={(data) => register({ variables: data })}>
                        <Form.Item
                            name="email"
                            label={t("email")}
                            rules={[
                                {
                                    required: true,
                                    message: t("required")
                                }
                            ]}
                        >
                            <Input placeholder={t("email")} />
                        </Form.Item>

                        <Form.Item label={t("name")}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: t("required")
                                }
                            ]}
                        >
                            <Input placeholder={t("email")} />
                        </Form.Item>

                        <Form.Item label={t("password")}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: t("required")
                                },
                                {
                                    min: 8,
                                    message: t("atLeast8Char"),
                                },
                                {
                                    pattern: /\d/,
                                    message: t("mustContainNumber"),
                                },
                                {
                                    pattern: /[A-Z]/,
                                    message: t("mustContainUpperCase"),
                                },
                            ]}
                        >
                            <Input.Password placeholder={t("email")} />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label={t("confirmPassword")}
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: t("required")
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error(t("passwordUnMatch")));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder={t("confirmPassword")} />
                        </Form.Item>
                        <Button type="primary" className="w-full mb-5" htmlType="submit">{t("createAccount")}</Button>
                        <div className="text-center">
                            <NavLink to={"/login"}>{t("haveAccount")}</NavLink>
                        </div>
                    </Form>
                </div>
                <LoginBottomArea />
            </div>
        </TypedBackground>
    )
}

export default Registration