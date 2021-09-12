/**
 * @Author Mohanbarman
 */
import React, {createContext, useState} from 'react';


export const NOTIFICATION_SEVERITIES = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success',
}

export const NotificationContext = createContext();

export default function NotificationProvider(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState(undefined)
  const [severity, setSeverity] = useState(undefined);

  function showNotification(message, severity) {
    setIsOpen(true);
    setMessage(message);
    setSeverity(severity);
  }

  function closeNotification() {
    setIsOpen(false);
    setMessage(undefined);
    setSeverity(undefined);
  }

  return(
    <NotificationContext.Provider
      value={{
        message,
        isOpen,
        severity,
        showNotification,
        closeNotification,
      }} {...props}
    />
  )
}
