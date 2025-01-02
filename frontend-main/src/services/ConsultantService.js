import HttpService from "./HttpService";

export default class ConsultantService {
  static baseURL() {
    return process.env.REACT_APP_BASE_URL;
  }

  static get_consultants() {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${ConsultantService.baseURL()}/consultants`,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static read_consultant(consultant_id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${ConsultantService.baseURL()}/consultant/${consultant_id}`,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static read_consultant_by_userId() {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${ConsultantService.baseURL()}/consultant/_`,
        {},
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static update_a_consultant(data) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${ConsultantService.baseURL()}/consultant/_`,
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

  static update_consultant_availability(data) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${ConsultantService.baseURL()}/consultant_availability`,
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

  static add_review(consultant_id, review) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${ConsultantService.baseURL()}/addConsultantReview/${consultant_id}`,
        review,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static create_temp_account(project_id) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${ConsultantService.baseURL()}/createConsultantAccount`,
        { project_id },
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
