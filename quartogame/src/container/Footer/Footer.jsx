import React from "react";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

import { FooterOverlay, Newsletter } from "../../components";
import { images } from "../../constants";
import "./Footer.css";

const Footer = () => (
  <div className="app__footer " id="login">
    <FooterOverlay />
    <div className="app__footer-links">
      <div className="app__footer-links_logo">
        <p className="p__opensans">
          &quot;Made with ♡ by Younes and Houssem&quot;
        </p>

        <div className="app__footer-links_icons">
          <FiFacebook />
          <FiTwitter />
          <FiInstagram />
        </div>
      </div>
    </div>
    <div className="footer__copyright">
      <p className="p__opensans">2021 Happy M. All Rights reserved.</p>
    </div>
  </div>
);

export default Footer;
