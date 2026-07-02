import React, { useState, useEffect } from 'react';

export function Notification({ message, type, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible || !message) return null;

  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      <button onClick={() => { setVisible(false); onClose(); }}>&times;</button>
    </div>
  );
}