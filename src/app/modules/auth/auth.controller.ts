/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const credentialLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginInfo = await AuthServices.credentialLogin(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Login Successfully",
    data: loginInfo,
  });
};

export const AuthController = {
  credentialLogin,
};
