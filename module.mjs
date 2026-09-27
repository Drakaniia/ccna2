// @ts-check
import { module } from "@prisma/composer";
import ccnaExamsService from "./service.mjs";

export default module("ccna", ({ provision }) => {
  provision(ccnaExamsService, { id: "ccnaexams" });
});
