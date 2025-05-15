import { Button, Dropdown } from 'antd';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { MenuItemType } from 'antd/es/menu/interface';

const LoginBottomArea = () => {
    const { i18n, t } = useTranslation("login-bottom-area");
    const currentLanguage = i18n.language;

    const handleLanguageChange = (language: string) => {
        i18n.changeLanguage(language);
    };

    const languages: MenuItemType[] = [
        {
            label: "Magyar",
            key: "hu",
            onClick: () => handleLanguageChange("hu"),
            disabled: currentLanguage === "hu",
        },
        {
            label: "English",
            key: "en",
            onClick: () => handleLanguageChange("en"),
            disabled: currentLanguage === "en",
        }
    ];

    const currentLanguageLabel = languages.find(l => l?.key === currentLanguage)?.label;

    return (
        <div className="fixed bottom-0">
            <ul className="flex items-center border rounded-xl px-3 py-1 bottom-2 border-alto-200 shadow-sm relative bg-white/30 backdrop-blur-md">
                <li>
                    <Button href={"/forgotten-password"} type="link">{t("forgottenPassword")}</Button>
                </li>
                <li >
                    <Dropdown trigger={["click"]} menu={{ items: languages }}>
                        <Button type="link" onClick={(e) => e.preventDefault()} icon={<MdKeyboardArrowUp />} iconPosition="end">
                            {currentLanguageLabel}
                        </Button>
                    </Dropdown>
                </li>
            </ul>
        </div>
    );
};

export default LoginBottomArea;