import HttpService from "./HttpService";

export default class UserService {
  static baseURL() {
    return process.env.REACT_APP_BASE_URL;
  }

  static register(user, pass, isAdmin) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/register`,
        {
          username: user,
          password: pass,
          isAdmin: isAdmin,
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

  static getCurrentUser(user_id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${UserService.baseURL()}/user/${user_id}`,
        (data) => {
          resolve(data);
        },
        (textStatus) => {
          reject(textStatus);
        }
      );
    });
  }

  static login(email, password) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/login`,
        {
          email,
          password,
        },
        (data) => {
          resolve(data);
        },
        (textStatus) => {
          reject(textStatus);
        }
      );
    });
  }

  static forgot(email) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/forgot`,
        {
          email,
        },
        (data) => {
          resolve(data);
        },
        (textStatus) => {
          reject(textStatus);
        }
      );
    });
  }

  static resetPassword(email, password, salt) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/updatePassword`,
        {
          email,
          password,
          salt,
        },
        (data) => {
          resolve(data);
        },
        (textStatus) => {
          reject(textStatus);
        }
      );
    });
  }

  static logout() {
    window.localStorage.removeItem("persist:root");
    window.localStorage.removeItem("jwt_token");
    window.localStorage.clear();
  }

  static create_registeration_link(payload) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/createRegisterationLink`,
        payload,
        (data) => {
          resolve(data);
        },
        (textStatus) => {
          reject(textStatus);
        }
      );
    });
  }

  static create_user_from_registeration_link(payload) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/createUserFromRegisterationLink`,
        payload,
        (data) => {
          resolve(data);
        },
        (textStatus) => {
          reject(textStatus);
        }
      );
    });
  }

  static get_user_image(user_id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${UserService.baseURL()}/userImage/${user_id}`,
        (data) => {
          resolve(data);
        },
        (textStatus) => {
          reject(textStatus);
        }
      );
    });
  }

  static send_contact_form_mail(fullname, email, message) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/userContact`,
        {
          fullname,
          email,
          message,
        },
        (data) => {
          resolve(data);
        },
        (textStatus) => {
          reject(textStatus);
        }
      );
    });
  }
}
