import PropTypes from 'prop-types';
import Navbar from "../../components/Layout/Navbar"
function DefaultLayout({ children }) {
    return (
        <>
            <div className="bg-white ">
                <Navbar></Navbar>
                <div className="bg-bgGray ">
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