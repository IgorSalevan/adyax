import React from 'react';
import { texts } from '../../data';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <div className="image"/>
        <div className="slogan">{ texts.slogan }</div>
      </div>
      <div className="title">{ texts.position }<span>.</span></div>
      <div className="annonce">{ texts.annonce }</div>
    </div>
  );
}

export default Header;
