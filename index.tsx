import { combineDataProviders } from "ra-core";
import getDataProvider from "./customDataProviders";
import jsonServerProvider from "ra-data-json-server";
import { EsamwaadUserDataProvider } from "./customDataProviders/userDataProviders";

export const baseURL = (NEXT_PUBLIC_API_URL) => {
    return NEXT_PUBLIC_API_URL
}
export const hasuraURL = (NEXT_HASURA_URL) => {
  return NEXT_HASURA_URL;
}
/* Example of Session 

const session: any = {
  user: {
    name: null,
    email: null,
    image: null,
  },
  expires: "2022-09-23T04:48:50.273Z",
  jwt: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") || "").user.token
    : "",
  role: "Admin",
  fullName: "Samarth-Admin",
  username: "samarth-admin",
  applicationId: "f0ddb3f6-091b-45e4-8c0f-889f89d4f5da",
};

*/
const JSONDp = jsonServerProvider("https://jsonplaceholder.typicode.com");
export const hasuraDP: any = async (userSession) => await getDataProvider(userSession);
const JSONDataProvider = {
  ...JSONDp,
  updateSamarthUser: (...r: any) => {},
};

export const samagraAdminDataProvider = combineDataProviders((resource) => {
  switch (resource) {
    case "teacher":
    case "school":
    case "student":
    case "deadlfine":
    case "submission_type":
    case "location":
    case "ss_school_allocation_data":
    case "ss_school_allocation_quarter":
    case "grade_assessment":
    case "assessment":
    case "stream":
      return hasuraDP;
    case "users":
      return JSONDataProvider;
    case "e_samwaad_user":
    case "shiksha_saathi_user":
      return EsamwaadUserDataProvider;
    default:
      throw new Error(`Unknown resource: ${resource}`);
  }
});
