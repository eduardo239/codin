import React, { useState } from "react";
import Input from "../form/Input";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const [email, setEmail] = useState<string | number>("");
  return (
    <div className="footer">
      <div>
        <b>Produtos</b>
        <ul className="footer-menu">
          <li>Overview</li>
          <li>Email newsletters</li>
          <li>Marketing automation</li>
          <li>Webflow integration</li>
        </ul>
      </div>
      <div>
        <b>Resources</b>
        <ul className="footer-menu">
          <li>Help Center</li>
          <li>API docs</li>
          <li>Changelog</li>
          <li>Guides</li>
          <li>Emails</li>
          <li>Blog</li>
        </ul>
      </div>
      <div>
        <b>Company</b>
        <ul className="footer-menu">
          <li>Pricing</li>
          <li>Follow us on Twitter</li>
          <li>Email us</li>
          <li>GDPR</li>
        </ul>
      </div>
      <div>
        <b>Monthly newsletter</b>
        <div className="footer-menu ">
          <p className="light">
            Get pro tips for automating your marketing workflows and be the
            first to hear about new tools and features:
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
