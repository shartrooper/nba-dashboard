import { useSessionTokenStore } from '@/store';
import { Notification } from '@/store/notifications'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
const buildMsgObject = (title: string, message: string, type: Notification['type']) => ({
  type,
  title,
  message,
});

export const getErrorMsg = (title: string, message: string) => buildMsgObject(title, message, 'error');
export const getSuccessMsg = (title: string, message: string) => buildMsgObject(title, message, 'success');
export const getInfoMsg = (title: string, message: string) => buildMsgObject(title, message, 'info');
export const getWarningMsg = (title: string, message: string) => buildMsgObject(title, message, 'warning');


export const arrayRange = (start: number, stop: number, step: number) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (_value, index) => start + index * step
  );


export const useRedirectionToRoot = () => {
  const { removeToken } = useSessionTokenStore();
  const navigate = useNavigate();

  const clearSession = () => {
    removeToken();
    navigate('/');
  }

  return clearSession;
}

interface Size {
  width?: number;
  height?: number;
}

export function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({});
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.outerWidth,
        height: window.outerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}