import { combineDataProviders } from "ra-core";
import getDataProvider from "./customDataProviders";
import jsonServerProvider from "ra-data-json-server";
import { EsamwaadUserDataProvider } from "./customDataProviders/userDataProviders";

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

const JSONDp = jsonServerProvider("https://jsonplaceholder.typicode.com");
const hasuraDP = await getDataProvider(session);
const JSONDataProvider = {
  ...JSONDp,
  updateSamarthUser: (...r: any) => {},
};
const _dataProvider = combineDataProviders((resource) => {
  switch (resource) {
    case "teacher":
    case "school":
    case "student":
    case "deadline":
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