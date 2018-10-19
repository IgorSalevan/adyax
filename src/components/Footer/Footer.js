import React from 'react';
import { texts } from '../../data';

const Footer = () => {
  return (
    <div>
      <div className="bottom-white-block"/>
      <div className="footer">
        <div className="resume">{ texts.resume }</div>
      </div>
    </div>
  );
}

export default Footer;
