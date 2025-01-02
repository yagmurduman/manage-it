import HttpService from "./HttpService";

export default class CompanyService {
  static baseURL() {
    return process.env.REACT_APP_BASE_URL;
  }

  static addCompany(
    companyName,
    companyEmailAddress,
    streetName,
    houseNumber,
    postcode,
    city,
    country
  ) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${CompanyService.baseURL()}/companies`,
        {
          companyName,
          companyEmailAddress,
          streetName,
          houseNumber,
          postcode,
          city,
          country,
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

  static verifyCompany(email) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${CompanyService.baseURL()}/verifyCompany`,
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

  static createCompanyAndUser(formData) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${CompanyService.baseURL()}/createCompanyUser`,
        { formData },
        (data) => {
          resolve(data);
        },
        (textStatus) => {
          reject(textStatus);
        }
      );
    });
  }

  static get_a_company(company_id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${CompanyService.baseURL()}/comapny/${company_id}`,
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
