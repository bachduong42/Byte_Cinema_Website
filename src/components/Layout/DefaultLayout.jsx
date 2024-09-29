import PropTypes from 'prop-types';
import Navbar from "./Navbar"
import Footer from './Footer';
function DefaultLayout({ children }) {
    return (
        <>
            <div className="bg-white ">
                <Navbar></Navbar>
                <div className="bg-bgGray ">
                    {children}
                </div>
                <Footer></Footer>
            </div>
        </>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;