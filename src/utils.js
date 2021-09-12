/**
 * @Author Mohanbarman
 */
import React from 'react';


export function downloadFile(url, filename) {
  const anchorTag = document.createElement("a");
  anchorTag.download = filename;
  anchorTag.href = url;
  anchorTag.click();
}

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
