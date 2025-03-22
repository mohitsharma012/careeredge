export const CUSTOM_BASE_URL = "http://localhost:8000";
export const BACKEND_BASE_URL = CUSTOM_BASE_URL + `/api/v1`;

export const LOGIN_API = BACKEND_BASE_URL + `/user/login/`;
export const REGISTER_API = BACKEND_BASE_URL + `/user/register/`;
export const USER_CLONE_API = BACKEND_BASE_URL + `/user/user-clone/`;
export const REFRESH_API = BACKEND_BASE_URL + `/token/refresh/`;


// export const REFRESH_API = BACKEND_BASE_URL+ `token/refresh/`;
export const GET_FILE_UPLOAD_SIGNATURE = BACKEND_BASE_URL+ `uploads/presigned_url/`;
export const USER_CLONE = BACKEND_BASE_URL+`users/user_clone/`;
export const EMPLOYEE_URL = BACKEND_BASE_URL+`admin_settings/employee/`;
export const PROJECT_URL = BACKEND_BASE_URL+`employee/project/`;
export const TASK_URL = BACKEND_BASE_URL+`employee/task/`;
export const TASK_COMMENTS_URL = BACKEND_BASE_URL+`employee/task_comments/`;
export const TASK_BULK_UPLOAD_URL = BACKEND_BASE_URL+`employee/task_bulk_upload/`;
export const TASK_MODIFICATION_HISTORY_URL = BACKEND_BASE_URL+`employee/task_modification_history/`;
export const WORK_LOG_URL = BACKEND_BASE_URL+`employee/work_log/`;
export const NOTIFICATION_READ_URL = BACKEND_BASE_URL+`employee/notification_read/`;
export const NOTIFICATION_VIEW_URL = BACKEND_BASE_URL+`employee/notification_view/`;
export const TASK_REPORT_URL = BACKEND_BASE_URL+`employee/task_report/`;
export const EMPLOYEE_TASK_REPORT_URL = BACKEND_BASE_URL+`employee/employee_task_report/`;
export const EMPLOYEE_WORK_LOG_REPORT_URL = BACKEND_BASE_URL+`employee/work_log_report/`;
export const DROPDOWN_URL = BACKEND_BASE_URL+`admin_settings/dropdown/`;
export const DYNAMIC_URL = BACKEND_BASE_URL+`admin_settings/`;
export const CHANGE_PASSWORD_URL = BACKEND_BASE_URL+`users/password_change/`;
export const PASSWORD_RESET_MAIL_URL = BACKEND_BASE_URL+`users/user_reset_mail/`;
export const PASSWORD_RESET_URL = BACKEND_BASE_URL+`users/reset_password/`;
export const LOGOUT_URL = BACKEND_BASE_URL+`logout/`;