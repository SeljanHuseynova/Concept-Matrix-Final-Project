import React, { useEffect } from "react";
import { TfiClose } from "react-icons/tfi";
import CartModal from "./CartModal";
import AccountModal from "./AccountModal";
import WishListModal from "./WishListModal";
import SearchModal from "./SearchModal";
import FilterModal from "./FilterModal";

const Modal = ({ closeModal, modalType }) => {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const nav = document.querySelector("nav");
    if (nav) nav.style.display = "none";

    return () => {
      document.documentElement.style.overflow = "";
      if (nav) nav.style.display = "";
    };
  }, []);

  const renderModalContent = () => {
    switch (modalType) {
      case "cart":
        return <CartModal />;
      case "wishlist":
        return <WishListModal />;
      case "account":
        return <AccountModal />;
      case "search":
        return <SearchModal />;
      case "filter":
        return <FilterModal />;
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="icon-container" onClick={closeModal}>
          <TfiClose className="cls-icon" />
        </div>
        {renderModalContent()}
      </div>
    </div>
  );
};

export default Modal;
