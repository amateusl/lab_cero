import Footer from "./footer"
import Header from "./header"

const Layout = ({ children }) => {
    return (
        <div className="overflow-x-hidden font-lato">
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    )
}

export default Layout