import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactTyped } from 'react-typed'

type TypedBackgroundProps = {
    children: ReactNode
}

const TypedBackground = ({ children }: TypedBackgroundProps) => {
    const { t } = useTranslation("typed-background");
    return (
        <>
            <div>
                <div className="overflow-hidden w-fit absolute -top-11 right-[6vw] animate-rise bg-alto-200 text-slate-800 py-2 px-3 rounded-3xl" style={{ animationDelay: "2s" }}>
                    <ReactTyped
                        className="w-full"
                        strings={[
                            t("var1"),
                            t("var2")
                        ]}
                        loop
                        typeSpeed={100}
                    />
                </div>
                <div className="overflow-hidden w-fit absolute -top-11 right-[10vw] animate-rise-2 bg-alto-200 text-slate-800 py-2 px-3 rounded-3xl" style={{ animationDelay: "1s" }}>
                    <ReactTyped
                        strings={[
                            t("var3"),
                            t("var4")
                        ]}
                        loop
                        typeSpeed={50}
                    />
                </div>
                <div className="overflow-hidden w-fit absolute -top-11 right-[60vw] animate-rise-3 bg-alto-200 text-slate-800 py-2 px-3 rounded-3xl" style={{ animationDelay: "2s" }}>
                    <ReactTyped
                        strings={[
                            t("var5"),
                            t("var6")
                        ]}
                        loop
                        typeSpeed={200}
                    />
                </div>
                <div className="overflow-hidden w-fit absolute -top-11 left-[5vw] animate-rise bg-blue-500 text-white py-2 px-3 rounded-3xl" style={{ animationDelay: "4s" }}>
                    <ReactTyped
                        strings={[
                            t("var7"),
                            t("var8")
                        ]}
                        loop
                        typeSpeed={100}
                    />
                </div>
                <div className="overflow-hidden w-fit absolute -top-11 left-[50vw] animate-rise-3 bg-blue-500 text-white py-2 px-3 rounded-3xl" style={{ animationDelay: "5s" }}>
                    <ReactTyped
                        strings={[
                            t("var1"),
                            t("var3")
                        ]}
                        loop
                        typeSpeed={150}
                    />
                </div>
                {children}
            </div>
        </>
    )
}

export default TypedBackground