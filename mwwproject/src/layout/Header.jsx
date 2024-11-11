import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div style={styles.headerContainer}>
        <div style={styles.headerDiv}>
          <Link to="/">
            <img src={process.env.PUBLIC_URL + "/logo-mind.png"}></img>
          </Link>
        </div>
      </div>
    </>
  );
};
const styles = {
  headerContainer: {
    height: "10vh",
    borderBottom: "1px silid black",
  },
  headerDiv: {
    height: "100%",
    padding: "20px 100px",
  },
};
export default Header;
