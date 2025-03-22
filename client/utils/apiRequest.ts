import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { displayMessage, handleErrorResponse } from "./common";
import * as lockr from "lockr";
import { AUTH_TOKEN, REFRESH_TOKEN, SUCCESS_MSG_TYPE } from "../constants/dataKeys";
// import { _get } from "./lodashUtils";
import { REFRESH_API, GET_FILE_UPLOAD_SIGNATURE } from "../constants/api";
import { jwtDecode } from "jwt-decode";



interface JwtClaims {
  exp: number;
  [key: string]: any;
}

interface TokenResponse {
  access: string;
  refresh: string;
}

interface UploadInfo {
  file: {
    status: string;
    name: string;
  };
}

interface FileUploadProps {
  maxCount: number;
  action: string;
  method: string;
  onChange: (info: UploadInfo) => void;
  beforeUpload: (file: File) => void;
  headers: {
    "Content-Type": string;
  };
}

interface CustomRequestProps {
  file: File;
  onSuccess: () => void;
  onProgress: (progress: { percent: number }) => void;
}

export const validateJWT = (token: string): boolean => {
  let claims: JwtClaims | undefined;
  try {
    claims = jwtDecode<JwtClaims>(token);
  } catch (e) {
    clearStorage();
    // window.location.reload();
  }
  const expirationTimeInSeconds = claims?.exp ? claims.exp * 1000 : 0;
  const now = new Date();
  const isValid = expirationTimeInSeconds >= now.getTime();

  return isValid;
};

export const getAuthToken = async function (): Promise<string | null> {
  let token: string | null = lockr.get(AUTH_TOKEN);

  if (!token) return null;

  const isValid = validateJWT(token);

  if (token && !isValid) {
    try {
      const response = await axios({
        method: "post",
        url: REFRESH_API,
        data: { refresh: lockr.get(REFRESH_TOKEN) },
      });
      const data: TokenResponse = response.data;
      token = data.access;
      lockr.set('refresh', data.refresh);
      lockr.set('access', data.access);
    } catch (error) {
      // handleErrorResponse(error as AxiosError);
    }
  }

  return token;
};

export const clearStorage = function (): void {
  localStorage.clear();
};

export const putAPI = async function (
  URL: string,
  data: any,
  successFn: (data: any) => void,
  errorFn: (data: any) => void,
  headerConfig: Record<string, string> = {}
): Promise<void> {
  let token = await getAuthToken();
  let authHeaders: Record<string, string> = {};
  if (token) {
    authHeaders.Authorization = `Bearer ${token}`;
  }
  axios({
    method: "put",
    url: URL,
    data: data,
    headers: {
      ...authHeaders,
      ...headerConfig,
    },
  })
    .then(function (response: AxiosResponse) {
      let data = response.data;
      successFn(data);
    })
    .catch(function (error: AxiosError) {
    //   if (_get(error, "request.status") === 500) {
    //     // logErrorToSlackChannel(
    //     //   JSON.stringify(data),
    //     //   (errorInfo = { componentStack: _get(error, "request.status") })
    //     // );
    //   }
      handleErrorResponse(error);
      if (error.response) {
        errorFn(error.response.data);
      }
    });
};

export const postAPI = async function (
  URL: string,
  data: any,
  successFn: (data: any) => void,
  errorFn: (data: any) => void,
  headerConfig: Record<string, string> = {}
): Promise<void> {
  let token = await getAuthToken();
  let authHeaders: Record<string, string> = {};
  if (token) {
    authHeaders.Authorization = `Bearer ${token}`;
  }
  axios({
    method: "post",
    url: URL,
    data: data,
    headers: {
      ...authHeaders,
      ...headerConfig,
    },
  })
    .then(function (response: AxiosResponse) {
      let data = response.data;
      successFn(data);
    })
    .catch(function (error: AxiosError) {
    //   if (_get(error, "request.status") === 500) {
    //     // logErrorToSlackChannel(
    //     //   JSON.stringify(data),
    //     //   (errorInfo = { componentStack: _get(error, "request.status") })
    //     // );
    //   }
      handleErrorResponse(error);
      if (error.response) {
        errorFn(error.response);
      }
    });
};

export const postOuterAPI = async function (
  URL: string,
  data: any,
  successFn: (data: any) => Promise<void>,
  errorFn: (data: any) => Promise<void>,
  headerConfig: Record<string, string> = {}
): Promise<void> {
  axios({
    method: "post",
    url: URL,
    data: data,
    headers: {
      ...headerConfig,
    },
  })
    .then(async function (response: AxiosResponse) {
      let data = response.data;
      await successFn(data);
    })
    .catch(async function (error: AxiosError) {
      handleErrorResponse(error);
      if (error.response) {
        await errorFn(error.response.data);
      }
    });
};

export const getAPI = async function (
  URL: string, 
  successFn: (data: any) => void, 
  errorFn: (error: any) => void, 
  params: Record<string, any> = {}
): Promise<void> {
  let token = await getAuthToken();
  let authHeaders: Record<string, string> = {};
  if (token) {
    authHeaders.Authorization = `Bearer ${token}`;
  }
  axios({
    method: "get",
    url: URL,
    headers: {
      ...authHeaders,
    },
    params: params,
  })
    .then(function (response: AxiosResponse) {
      let data = response.data;
      successFn(data);
    })
    .catch(function (error: AxiosError) {
      // handleErrorResponse(error);
      errorFn(error);
    });
};

export const getOuterAPI = async function (
  URL: string, 
  successFn: (data: any) => void, 
  errorFn: (error: any) => void, 
  params: Record<string, any> = {}
): Promise<void> {
  axios({
    method: "get",
    url: URL,
    headers: {},
    params: params,
  })
    .then(function (response: AxiosResponse) {
      let data = response.data;
      successFn(data);
    })
    .catch(function (error: AxiosError) {
      handleErrorResponse(error);
      errorFn(error);
    });
};

export const deleteAPI = function (
  URL: string, 
  successFn: (data: any) => void, 
  errorFn: () => void
): void {
  axios({
    method: "delete",
    url: URL,
    headers: {
      // Authorization: 'Bearer ' + getAuthToken()
    },
  })
    .then(function (response: AxiosResponse) {
      let data = response.data;
      successFn(data);
    })
    .catch(function (error: AxiosError) {
      handleErrorResponse(error);
      errorFn();
    });
};

export const postWithOutTokenAPI = function (
  URL: string,
  data: any,
  successFn: (data: any) => void,
  errorFn: (data: any) => void,
  headerConfig: Record<string, string> = {}
): void {
  axios({
    method: "post",
    url: URL,
    data: data,
    headers: {
      ...headerConfig,
    },
  })
    .then(function (response: AxiosResponse) {
      let data = response.data;
      successFn(data);
    })
    .catch(function (error: AxiosError) {
      // handleErrorResponse(error);
      if (error.response) {
        errorFn(error.response.data);
      }
    });
};

export const putOuterAPI = function (
  URL: string, 
  data: any, 
  successFn: (data: any) => void, 
  errorFn: (data: any) => void, 
  headerConfig: Record<string, string> = {}
): void {
  axios({
    method: 'put',
    url: URL,
    data,
    headers: {
      ...headerConfig
    },
  }).then(function (response: AxiosResponse) {
    let data = response.data;
    successFn(data);
  }).catch(function (error: AxiosError) {
    handleErrorResponse(error);
    // errorFn(_get(error, 'response.data'));
  });
};

export const handleFileUpload = (info: UploadInfo): void => {
  console.log(info);
  if (info.file.status !== "uploading") {
    // Do nothing
  }
  if (info.file.status === "done") {
    displayMessage(SUCCESS_MSG_TYPE, `${info.file.name} file uploaded successfully`);
  } else if (info.file.status === "error") {
    handleErrorResponse(`${info.file.name} file upload failed.`);
  }
};

let s3SignatureUrl: string = "", s3FileUploadType: string = "";
export const fileUploadProps: FileUploadProps = {
  maxCount: 1,
  action: s3SignatureUrl,
  method: "put",
  onChange: handleFileUpload,
  beforeUpload: (file: File) => {
    let successFn = function (data: { url: string }) {
      s3SignatureUrl = data.url;
      s3FileUploadType = file.type;
    };
    let errorFn = function () {
      // Do nothing
    };
    postAPI(
      GET_FILE_UPLOAD_SIGNATURE,
      { image: file.name },
      successFn,
      errorFn
    );
  },
  headers: {
    "Content-Type": s3FileUploadType
  },
};

export const customRequest = (props: CustomRequestProps): void => {
  let successFn = function (data: any) {
    props.onSuccess();
    // that.setState(function (prevState) {
    //   return {
    //     profileData: {
    //       ...prevState.profileData,
    //       image: s3SignatureUrl.split("?")[0]
    //     }
    //   };
    // });
  };
  let errorFn = function () {
    // Do nothing
  };
  setTimeout(function () {
    putOuterAPI(
      s3SignatureUrl,
      props.file,
      successFn,
      errorFn,
      {
        "Content-Type": props.file.type
      }
    );
  }, 500);
};