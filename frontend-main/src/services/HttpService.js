export default class HttpService {
  static extractUser(token) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    let userJson = JSON.parse(window.atob(base64));
    console.log("userJson", userJson);
    return {
      user_id: userJson.user_id,
      first_name: userJson.first_name,
      username: userJson.username,
      email: userJson.email,
      company_id: userJson.company_id,
      company_name: userJson.company_name,
      rights: userJson.rights,
    };
  }

  static async get(url, onSuccess, onError) {
    let token = window.localStorage["jwt_token"];
    let header = new Headers();
    if (token) {
      header.append("Authentication", `${token}`);
    }

    try {
      let resp = await fetch(url, {
        method: "GET",
        headers: header,
      });

      if (this.checkIfUnauthenticated(resp)) {
        window.location = "/login";
      } else {
        resp = await resp.json();
      }

      if (resp.error) {
        onError(resp.error);
      } else {
        if (resp.hasOwnProperty("jwt_token")) {
          window.localStorage["jwt_token"] = resp.jwt_token;
          resp.user = this.extractUser(resp.jwt_token);
        }
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

  static async put(url, data, onSuccess, onError) {
    console.log("I got called");
    let token = window.localStorage["jwt_token"];
    let header = new Headers();
    if (token) {
      header.append("Authentication", `${token}`);
    }
    header.append("Content-Type", "application/json");

    try {
      let resp = await fetch(url, {
        method: "PUT",
        headers: header,
        body: JSON.stringify(data),
      });

      if (this.checkIfUnauthenticated(resp)) {
        window.location = "/login";
        return;
      } else {
        resp = await resp.json();
      }

      if (resp.error) {
        onError(resp.error);
      } else {
        if (resp.hasOwnProperty("jwt_token")) {
          window.localStorage["jwt_token"] = resp.jwt_token;
          resp.user = this.extractUser(resp.jwt_token);
        }
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

  static async post(url, data, onSuccess, onError) {
    let token = window.localStorage["jwt_token"];
    let header = new Headers();
    if (token) {
      header.append("Authentication", `${token}`);
    }
    header.append("Content-Type", "application/json");

    try {
      let resp = await fetch(url, {
        method: "POST",
        headers: header,
        body: JSON.stringify(data),
      });
      if (this.checkIfUnauthenticated(resp)) {
        if (window.location.pathname !== "/login") window.location = "/login";
        throw new Error(401);
      } else {
        resp = await resp.json();
      }

      if (resp.error) {
        onError(resp.error);
      } else {
        if (resp.hasOwnProperty("jwt_token")) {
          window.localStorage["jwt_token"] = resp.jwt_token;
          resp.user = this.extractUser(resp.jwt_token);
        }
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

  static async delete(url, onSuccess, onError) {
    let token = window.localStorage["jwt_token"];
    let header = new Headers();
    if (token) {
      header.append("Authentication", `${token}`);
    }

    try {
      let resp = await fetch(url, {
        method: "DELETE",
        headers: header,
      });

      if (this.checkIfUnauthenticated(resp)) {
        window.location = "/login";
        return;
      } else {
        resp = await resp.json();
      }

      if (resp.error) {
        onError(resp.error);
      } else {
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

  static checkIfUnauthenticated(res) {
    if (res.status === 401) {
      return true;
    }
    return false;
  }
}
