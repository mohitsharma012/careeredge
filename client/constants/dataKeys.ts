export const AUTH_TOKEN = 'access';
export const REFRESH_TOKEN = 'refresh';

export const SUCCESS_MSG_TYPE = 'success';
export const WARNING_MSG_TYPE = 'warning';
export const ERROR_MSG_TYPE = 'error';
export const INFO_MSG_TYPE = 'info';
export const SUCCESS_MESSAGE = 'success';

export const INPUT_FIELD = 'input';
export const RADIO_FIELD = 'radio';
export const SELECT_FIELD = 'select';
export const SEARCH_FIELD = 'search_select';
export const MULTI_SELECT_FIELD = 'multiselect';
export const CHECKBOX_FIELD = 'checkbox';
export const SINGLE_CHECKBOX_FIELD = 'singlecheckbox';
export const NUMBER_FIELD = 'number';
export const DATE_PICKER = 'datepicker';
export const DATE_TIME_PICKER = 'datetimepicker';
export const TEXT_FIELD = 'textfield';
export const TEXT = "text";
export const TIME_PICKER = 'timepicker';
export const LABEL = "Label";
export const TYPE = "Issue Type";
export const STATUS = "Status";
export const PRIORITY = "Priority";
export const DESIGNATION = "Designation";
export const DEFAULT_PAGE_SIZE = 10;
export const PERIOD_CHOICES = [
    {name: "Today", key: "today"},
    {name: "Yesterday", key: "yesterday"},
    {name: "Current Week", key: "current_week"},
    {name: "Last Week", key: "last_week"},
    {name: "Current Month", key: "current_month"},
    {name: "Last Month", key: "last_month"},
    {name: "Current Year", key: "current_year"},
    {name: "Last Year", key: "last_year"}
]

export const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'Minor':
            return 'green';
        case 'Low':
            return 'blue';
        case 'Medium':
            return 'orange';
        case 'High':
            return 'volcano';
        case 'Urgent':
            return 'red';
        default:
            return 'default';
    }
};

export const getStatusColor = (status: string) => {
    switch (status) {
        case 'Open':
            return 'volcano';
        case 'Pending':
            return 'gold';
        case 'In Progress':
            return 'geekblue';
        case 'Blocked':
            return 'red';
        case 'Ready for Testing':
            return 'lime';
        case 'Completed':
            return 'green';
        case 'Closed':
            return 'default';
        case 'To Discuss':
            return 'magenta';
        case 'Over Due':
            return 'orange';
        default:
            return 'default';
    }
};
