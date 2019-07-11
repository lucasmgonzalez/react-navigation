import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import App from '../src/App';
import data from './navData';

const path = require('path');
const fs = require('fs');

export default (req, res) => {
  const filePath = path.resolve(__dirname, '../build/index.html');

  fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) {
      return res.status(500).end();
    }
    const sheet = new ServerStyleSheet()
    let content;
    let styleTags;
    
    try{
      content = renderToString(sheet.collectStyles(<App navData={data.navCatagories}/>));
      
      styleTags = sheet.getStyleTags();
    
    } catch (err) {
      console.log(err);
    } finally {
      sheet.seal();
    }

    return res.send(html.replace('<link name="styled-component"/>', styleTags).replace('<div id="root"></div>', `<div id="root">${content}</div>`));

  });  
};
