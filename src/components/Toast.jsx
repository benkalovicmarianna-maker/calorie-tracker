import { useEffect } from 'react';
export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <Toast key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
      ))}
    </div>
  );
}
 
function Toast({ toast, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(onRemove, 3000);
    return () => clearTimeout(timer);
  }, [onRemove]); // Додаємо onRemove]);

  return (
    <div className={`toast${toast.type ? ` ${toast.type}` : ''}`}>
      {toast.message}
    </div>
  );
}
