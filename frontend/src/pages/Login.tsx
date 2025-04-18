import { gql, useMutation } from "@apollo/client"
import { Alert, Button, Form, Input } from "antd"
import logo from "../assets/logo.webp";
import { useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import LoginBottomArea from "../components/LoginBottomArea"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"
import { ReactTyped } from "react-typed";

const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            message
        }
    }
`

type LoginProps = {
    email: string
    password: string
}

const Login = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("login");
    const { user, refetch } = useAuth();
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

    useEffect(() => {
        if (user) {
            navigate("/c/chat");
        }
    }, [user, navigate]);
    return (
        <>

            <div className="flex flex-col justify-center items-center min-h-dvh relative overflow-hidden">
                <div className="text-center flex justify-center flex-col items-center mb-7 relative z-20">
                    <img src={logo} className="h-12 min-w-16" alt="Logo" />
                    <h1 className="text-base font-bold text-slate-800 text-center max-w-sm">{t("motto")}</h1>
                </div>
                <div>
                    <div className="overflow-hidden w-fit absolute -top-11 right-[6vw] animate-rise bg-alto-200 text-slate-800 py-2 px-3 rounded-3xl" style={{ animationDelay: "2s" }}>
                        <ReactTyped
                            className="w-full"
                            strings={[
                                "What's new? Got anything exciting going on recently?",
                                "I'm fine thank you!"
                            ]}
                            loop
                            typeSpeed={100}
                        />
                    </div>
                    <div className="overflow-hidden w-fit absolute -top-11 right-[10vw] animate-rise-2 bg-alto-200 text-slate-800 py-2 px-3 rounded-3xl" style={{ animationDelay: "1s" }}>
                        <ReactTyped
                            strings={[
                                "How are you?",
                                "I'm curious—any fun plans for the weekend?"
                            ]}
                            loop
                            typeSpeed={50}
                        />
                    </div>
                    <div className="overflow-hidden w-fit absolute -top-11 right-[60vw] animate-rise-3 bg-alto-200 text-slate-800 py-2 px-3 rounded-3xl" style={{ animationDelay: "2s" }}>
                        <ReactTyped
                            strings={[
                                "Have you checked out how nice the weather is today?",
                                "Have you seen the latest movie? Is it worth watching?"
                            ]}
                            loop
                            typeSpeed={200}
                        />
                    </div>
                    <div className="overflow-hidden w-fit absolute -top-11 left-[5vw] animate-rise bg-blue-500 text-white py-2 px-3 rounded-3xl" style={{ animationDelay: "4s" }}>
                        <ReactTyped
                            strings={[
                                "Lately, I feel like every day is the same. How about you?",
                                "I'm fine thank you!"
                            ]}
                            loop
                            typeSpeed={100}
                        />
                    </div>
                    <div className="overflow-hidden w-fit absolute -top-11 left-[50vw] animate-rise-3 bg-blue-500 text-white py-2 px-3 rounded-3xl" style={{ animationDelay: "5s" }}>
                        <ReactTyped
                            strings={[
                                "How are you?",
                                "It's always great to chat with you—you make my day brighter!"
                            ]}
                            loop
                            typeSpeed={150}
                        />
                    </div>
                </div>
                <div className="w-[90vw] md:w-[500px] p-8 rounded-lg border border-alto-200 shadow-sm backdrop-blur-lg bg-white/30">
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

                                <div className="w-full flex-col gap-2 flex">
                                    <Button type="primary" htmlType="submit" loading={loading}>{t("login")}</Button>
                                    <Button className="!text-xs" type="text" htmlType="button">{t("register")}</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                <LoginBottomArea />
            </div>
        </>
    )
}

export default Login