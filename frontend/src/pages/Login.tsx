import { gql, useMutation } from "@apollo/client"
import { Alert, Button, Form, Input } from "antd"
import loginBg from "../assets/logo.png"
import { useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import LoginBottomArea from "../components/LoginBottomArea"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"

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
            // Refetch-eljük a me adatokat, miután bejelentkezett a felhasználó.
            await refetch();
            // Navigálunk a chat oldalra, miután a user adatokat megkaptuk.
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
        console.log("USER STATE", user);
        if (user) {
            navigate("/c/chat");
        }
    }, [user, navigate]);
    return (
        <div className="flex justify-center items-center min-h-dvh ">
            <div className="min-w-[300px] w-[500px] p-8 rounded-lg border border-alto-200 shadow-sm backdrop-blur-lg bg-white/30">
                <div className="flex justify-center">
                    <img src={loginBg} alt="Login background" className="w-[150px] object-cover" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 text-center">{t("login")}</h1>
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

                            <div className="w-full gap-2 flex">
                                <Button className="w-3/4" type="primary" htmlType="submit" loading={loading}>{t("login")}</Button>
                                <Button className="w-1/4" type="text" htmlType="button">{t("register")}</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            <LoginBottomArea />
        </div >
    )
}

export default Login