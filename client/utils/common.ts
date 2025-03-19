import { ERROR_MESSAGE_400, ERROR_MESSAGE_401, ERROR_MESSAGE_404, ERROR_MESSAGE_500 } from '../constants/message';
import { ERROR_MSG_TYPE, INFO_MSG_TYPE, SUCCESS_MSG_TYPE, WARNING_MSG_TYPE } from '../constants/dataKeys';
import { clearStorage } from './apiRequest';
import { message } from 'antd';
import Swal from "sweetalert2";

type SwalIconType = 'success' | 'error' | 'warning' | 'info' | 'question';

interface ErrorObject {
  detail?: string;
}

export const successFn = (data: string): void => {
  Swal.fire({
    icon: "success",
    title: data,
    showConfirmButton: false,
    timer: 500,
  });
};

export const errorFn = (data: string): void => {
  Swal.fire({
    icon: "error",
    title: data,
  });
};

export const emptyFn = (): void => {
  Swal.fire({
    title: "Input Fields are Empty!",
    allowOutsideClick: () => {
      const popup = Swal.getPopup();
      popup.classList.remove("swal2-show");
      setTimeout(() => {
        popup.classList.add("animate_animated", "animate_headShake");
      });
      setTimeout(() => {
        popup.classList.remove("animate_animated", "animate_headShake");
      }, 500);
      return false;
    },
  });
};

export const swalFn = (icon: SwalIconType, data: string): void => {
  Swal.fire({
    icon: icon,
    title: data,
    allowOutsideClick: () => {
      const popup = Swal.getPopup();
      popup.classList.remove("swal2-show");
      setTimeout(() => {
        popup.classList.add("animate_animated", "animate_headShake");
      });
      setTimeout(() => {
        popup.classList.remove("animate_animated", "animate_headShake");
      }, 500);
      return false;
    },
  });
};

export const handleErrorResponse = function(error: any): void {
  let response = error.response;
  if (response) {
    let status: number = response.status;
    if (status === 400) {
      if (Array.isArray(response.data)) {
        response.data.forEach(function(errObject: ErrorObject) {
          if (errObject.detail) {
            errorFn(errObject.detail);
          }
        });
      } else if (response.data.detail) {
        errorFn(response.data.detail);
      } else {
        errorFn(ERROR_MESSAGE_400);
      }
    } else if (status === 404) {
      if (response.data.detail) {
        errorFn(response.data.detail);
      } else {
        errorFn(ERROR_MESSAGE_404);
      }
    } else if (status === 500) {
      errorFn(ERROR_MESSAGE_500);
    } else if (status === 401) {
      clearStorage();
      window.location.reload();
      if (response.data.detail) {
        errorFn(response.data.detail);
      } else {
        errorFn(ERROR_MESSAGE_401);
      }
    } else if (status === 403) {
      errorFn(ERROR_MESSAGE_401);
      // clearStorage();
      // window.location.reload();
    }
  } else {
    // errorFn(ERROR_INTERNET_CONNECTIVITY);
  }
};

export const interpolate = function(theString: string, argumentArray: string[]): string {
  const regex = /%s/;
  const _r = function(p: string, c: string): string {
    return p.replace(regex, c);
  };
  return argumentArray.reduce(_r, theString);
};

export const displayMessage = function(type: string, msg: string): void {
  if (type === SUCCESS_MSG_TYPE) successFn(msg);
  else if (type === INFO_MSG_TYPE) swalFn("info", msg);
  else if (type === WARNING_MSG_TYPE) swalFn("warning", msg);
  else if (type === ERROR_MSG_TYPE) errorFn(msg);
};

export const startLoadingMessage = function(msg: string): any {
  return message.loading(msg, 0);
};

export const stopLoadingMessage = function(
  msgFn: () => void, 
  finishMsgType?: string, 
  finishMsg?: string
): boolean {
  msgFn();
  if (finishMsgType && finishMsg) displayMessage(finishMsgType, finishMsg);
  return true;
};