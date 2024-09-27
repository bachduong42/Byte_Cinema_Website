import PropTypes from 'prop-types';
import Navbar from "../../components/Layout/Navbar"
function DefaultLayout({ children }) {
    return (
        <>
            <div className="bg-white lg:pt-3 pt-2">
                <Navbar></Navbar>
                <div className="mx-6 bg-bgGray ">
                    {children}
                </div>
            </div>
        </>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;