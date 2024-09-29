import PropTypes from 'prop-types';
import Navbar from "../../components/Layout/Navbar"
import { useState } from 'react';
function DefaultLayout({ children }) {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
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