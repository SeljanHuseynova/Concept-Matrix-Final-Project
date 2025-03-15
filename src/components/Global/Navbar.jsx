import React, { useState, useMemo, useContext } from "react";
import {
  IoBagOutline,
  IoHeartOutline,
  IoPersonOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/concept.logo.png";
import { LuMenu } from "react-icons/lu";
import Modal from "../modals/Modal";
import { WishListContext } from "../../context/WishListProvider";
import { LanguageContext } from "../../context/LanguageProvider";


const Navbar = ({
  currentUser,
  isSticky,
  isMobileView,
  isOffcanvasOpen,
  setIsOffcanvasOpen,
  setIsSticky,
}) => {
  const {t} = useContext(LanguageContext);
  const [modalType, setModalType] = useState(null);
  const openModal = (type) => {
    setModalType(type);
  };
  const closeModal = () => {
    setModalType(null);
  };
  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
    if (!isOffcanvasOpen) {
      setIsSticky(false);
    } else {
      setIsSticky(window.scrollY > 50);
    }
  };
  const cart = useMemo(() => currentUser?.cart || [], [currentUser]);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const { wishlist } = useContext(WishListContext);
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg pt-2 pt-sm-3 pb-2 pb-sm-3 pb-lg-4 ${
          isSticky ? "sticky" : ""
        }`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="concept-logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            onClick={toggleOffcanvas}
          >
            <LuMenu className="toggle-icon" />
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                MENU
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={toggleOffcanvas}
              />
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav flex-grow-1 justify-content-center">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    {t("home")}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/products" className="nav-link">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Blog
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact
                  </a>
                </li>
                <li className="nav-item">
                  <Link to="/FAQs" className="nav-link">
                  FAQs
                  </Link>
                </li>
                {isMobileView && (
                  <div className="mobile-wishlist-cart">
                    <IoHeartOutline
                      className="icon"
                      onClick={() => openModal("wishlist")}
                    />
                    <IoBagOutline
                      className="icon"
                      onClick={() => openModal("cart")}
                    />
                  </div>
                )}
              </ul>
            </div>
          </div>
          {/* Icons Section */}
          <div
            className={`d-flex align-items-center ms-auto ${
              currentUser ? "icons-add" : "icons"
            }`}
          >
            <IoSearchOutline
              className="icon"
              onClick={() => openModal("search")}
            />

            <IoPersonOutline
              className="icon user-hover"
              onClick={() => openModal("account")}
            />
            {currentUser && (
              <div className="user-name">
                <span>{currentUser.name}</span>
              </div>
            )}
            {!isMobileView && (
              <>
              <div className="icon-container">
                <IoHeartOutline
                  className="icon"
                  onClick={() => openModal("wishlist")}
                />
                {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
                </div>
                <div className="icon-container">
                <IoBagOutline
                  className="icon"
                  onClick={() => openModal("cart")}
                />
                {totalItems > 0 && <span className="badge">{totalItems}</span>}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      {/* Modal */}
      {modalType && <Modal closeModal={closeModal} modalType={modalType} />}
    </>
  );
};
export default Navbar;
