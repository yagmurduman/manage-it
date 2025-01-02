import HttpService from "./HttpService";

export default class ProjectService {
  static baseURL() {
    return process.env.REACT_APP_BASE_URL;
  }

  static create_a_project(project_info) {
    console.log("project_info", project_info);
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${ProjectService.baseURL()}/projects`,
        {
          title: project_info.title,
          description: project_info.description,
          start_date: project_info.start_date,
          end_date: project_info.end_date,
          assigned_employees: project_info.assigned_employees,
          project_managers: project_info.project_managers,
          image: project_info.image,
        },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static read_a_project(project_id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${ProjectService.baseURL()}/projects/${project_id}`,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static update_a_project(project_id, data) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${ProjectService.baseURL()}/projects/${project_id}`,
        data,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static get_projects() {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${ProjectService.baseURL()}/projects`,
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
