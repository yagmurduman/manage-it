import HttpService from "./HttpService";

export default class EmployeeService {
  static baseURL() {
    return process.env.REACT_APP_BASE_URL;
  }

  static get_company_employees() {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${EmployeeService.baseURL()}/users`,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static get_project_employees(project_id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${EmployeeService.baseURL()}/projectUsers/${project_id}`,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }


  static get_action_item_assignees(actionItemId) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${EmployeeService.baseURL()}/assigneesActionItems/${actionItemId}`,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }



  static get_project_pm(project_id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${EmployeeService.baseURL()}/projectPm/${project_id}`,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static read_a_user(user_id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${EmployeeService.baseURL()}/user/${user_id}`,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }


  static update_a_user(user_id, user_data) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${EmployeeService.baseURL()}/user/${user_id}`,
        user_data,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static delete_a_user(user_id) {
    return new Promise((resolve, reject) => {
      HttpService.delete(
        `${EmployeeService.baseURL()}/user/${user_id}`,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

}
