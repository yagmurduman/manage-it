import HttpService from "./HttpService";

export default class ActionItemService {
  static baseURL() {
    return process.env.REACT_APP_BASE_URL;
  }

  static createProjectActionItem(payload) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${ActionItemService.baseURL()}/actionitems`,
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

  static updateActionItem(actionItem_id, data) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${ActionItemService.baseURL()}/actionitem/${actionItem_id}`,
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

  static deleteActionItem(actionItem_id) {
    return new Promise((resolve, reject) => {
      HttpService.delete(
        `${ActionItemService.baseURL()}/actionitem/${actionItem_id}`,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static retrieveProjectActionItems(project_id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${ActionItemService.baseURL()}/projectActionItems/${project_id}`,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static retrieveBacklogActionItems(backlogItem_id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${ActionItemService.baseURL()}/backlogActionItems/${backlogItem_id}`,
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
