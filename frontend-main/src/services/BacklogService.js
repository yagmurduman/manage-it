import HttpService from "./HttpService";

export default class BacklogService {
  static baseURL() {
    return process.env.REACT_APP_BASE_URL;
  }

  static createProjectBacklog(payload) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${BacklogService.baseURL()}/backlog`,
        payload,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static retrieveProjectBacklogs(project_id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${BacklogService.baseURL()}/projectBacklogs/${project_id}`,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static removeBacklogItem(backlogItem_id) {
    return new Promise((resolve, reject) => {
      HttpService.delete(
        `${BacklogService.baseURL()}/backlog/${backlogItem_id}`,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static updateBacklogItem(backlogItem_id, data) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${BacklogService.baseURL()}/backlog/${backlogItem_id}`,
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
}
