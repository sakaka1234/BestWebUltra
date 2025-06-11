import { HomeFooter } from "../../../../components/layouts/home/footer";
import { HeaderHome } from "../../../../components/layouts/home/header";
import { MainHome } from "../../../../components/layouts/home/main";
export const HomeRouter = () => {
    return (
        <>
            <HeaderHome />
            <MainHome />
            <HomeFooter />
        </>
    )
}
