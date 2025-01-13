import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import { AuthContext } from "../../context/auth";

export function Navbar() {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.n}>N</span>
        <span className={styles.rest}>EKI - GERENCIADOR DE EVENTO</span>
      </div>
      {user && (
        <div className={styles.logoutContainer}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      )}
    </div>
  );
}
