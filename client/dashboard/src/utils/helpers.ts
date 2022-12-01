import { Notification } from '@/store/notifications'

const buildMsgObject = (title: string, message: string, type: Notification['type']) => ({
  type,
  title,
  message,
});

export const getErrorMsg = (title: string, message: string) => buildMsgObject(title, message, 'error');
export const getSuccessMsg = (title: string, message: string) => buildMsgObject(title, message, 'success');
export const getInfoMsg = (title: string, message: string) => buildMsgObject(title, message, 'info');
export const getWarningMsg = (title: string, message: string) => buildMsgObject(title, message, 'warning');