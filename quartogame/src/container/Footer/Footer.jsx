import React from "react";

import {FooterOverlay} from "../../components";
import "./Footer.css";

const Footer = () => (
  <div className="app__footer " id="login">
    <FooterOverlay />
    <div className="app__footer-links">
      <div className="app__footer-links_logo">
        <p className="p__opensans">
          &quot;Made with ♡ by Younes and Houssem&quot;
        </p>
      </div>
    </div>
    <div className="footer__copyright">
      <p className="p__opensans">2021 Quarto Proj. All Rights reserved.</p>
    </div>
  </div>
);

export default Footer;
