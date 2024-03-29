import { useSessionTokenStore } from '@/store';
import { Notification, useNotificationStore } from '@/store/notifications'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { handleError } from './errorhandler';
import { ApolloError, DocumentNode, OperationVariables, QueryFunctionOptions, useQuery } from '@apollo/client';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import calendar from "dayjs/plugin/calendar";
import utc from "dayjs/plugin/utc";

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

export const MAX_PLAYERS = 3092;

export const COMMON_NAMES = ['smith', 'williams', 'johnson', 'davis', 'jones', 'brown', 'jackson'];

type MessageObject = {
  title: string,
  message: string,
  type: Notification['type']
}

const buildMsgObject = (title: string, message: string, type: Notification['type']): MessageObject => ({
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

export const handleErrorService = (dispatch: (obj: MessageObject) => void) => (error: ApolloError) => {
  const errorResponses = handleError(error);
  if (errorResponses.length === 1 && errorResponses[0].statusCode === 401) {
    dispatch(getInfoMsg('Expired Token', 'Please login again.'));
    return;
  }
  errorResponses.forEach((item) => {
    dispatch(getErrorMsg(`Error status ${item.statusCode}`, item.message));
  });
}

export const getWeekInterval = (date: Dayjs | string) => {
  dayjs.extend(customParseFormat);
  const day = dayjs(date).day();
  return [
    dayjs(date).subtract(day, 'day').format(DEFAULT_DATE_FORMAT),
    dayjs(date).add(6 - day, 'day').format(DEFAULT_DATE_FORMAT)
  ];
}

export const useFetchService = (params: OperationVariables, query: DocumentNode, configOption?: QueryFunctionOptions) => {
  const { addNotification } = useNotificationStore();
  const onError = handleErrorService(addNotification);
  const [state, toggle] = useState(false);
  const { data, loading, fetchMore, refetch } = useQuery(query, {
    variables: { ...params },
    onError,
    onCompleted: () => {
      toggle(false);
    },
    ...configOption
  });
  return { data, loading, fetchMore, refetch, loadingMore: { state, toggle } }
}

export const objectKeys = <Obj extends object>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[];
}

const dateTime = () => {
  dayjs.extend(calendar);
  dayjs.extend(utc);

  const getLastSeason = () => {
    //NOTE: Regular seasons span from October to April's next year. Playoff extends to June.
    const currentMonth = dayjs().month();
    return currentMonth > 9 ? dayjs().year() : dayjs().year() - 1
  }

  return {
    today: dayjs(),
    calendar: (date: string | Dayjs) => dayjs(date).utc().calendar(),
    dayAndMonth: (date: string | Dayjs) => dayjs(date).utc().format("D MMM"),
    lastSeason: getLastSeason(),
    validate: (date: string) => dayjs(date).isValid(),
  }
}


export const parseDate = dateTime();