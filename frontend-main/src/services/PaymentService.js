import HttpService from "./HttpService";

export default class PaymentService {
  static baseURL() {
    return process.env.REACT_APP_BASE_URL;
  }

  static book_consultant(booking_info) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${PaymentService.baseURL()}/bookconsultationsession`,
        booking_info,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static check_consultant_session_status(session_id) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${PaymentService.baseURL()}/checkconsultationbookingstatus`,
        { session_id },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static one_time_payment(project_id) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${PaymentService.baseURL()}/onetimepayment`,
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

  static subscribe(project_id) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${PaymentService.baseURL()}/subscription`,
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

  static check_session_status(session_id) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${PaymentService.baseURL()}/success`,
        { session_id },
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
