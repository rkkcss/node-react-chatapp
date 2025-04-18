import logo from "../assets/logo.webp";
import { useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import LoginBottomArea from "../components/LoginBottomArea"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"
import LoginForm from "../components/LoginForm";
import TypedBackground from "../components/TypedBackground";

const Login = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("login");
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/c/chat");
        }
    }, [user, navigate]);

    return (
        <>
            <TypedBackground>
                <div className="flex flex-col justify-center items-center min-h-dvh relative overflow-hidden">
                    <div className="text-center flex justify-center flex-col items-center mb-7 relative z-20">
                        <img src={logo} className="h-12 min-w-16" alt="Logo" />
                        <h1 className="text-base font-bold text-slate-800 text-center max-w-sm">{t("motto")}</h1>
                    </div>
                    <div className="w-[90vw] md:w-[500px] p-6 rounded-lg border border-alto-200 shadow-sm backdrop-blur-lg bg-white/30">
                        <h1 className="text-3xl font-bold text-alto-950 mb-6">{t("login")}</h1>
                        <LoginForm />
                    </div>
                    <LoginBottomArea />
                </div>
            </TypedBackground>
        </>
    )
}

export default Login