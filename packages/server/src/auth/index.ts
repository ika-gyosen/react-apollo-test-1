import { Response } from "express";

type authCheck = {
  isAuthorized: boolean;
};

function authCheck({ isAuthorized }: authCheck): void {
  if (!isAuthorized) {
    console.log("auth error, stop API");
    throw new Error("auth error");
  }
}

export default authCheck;
