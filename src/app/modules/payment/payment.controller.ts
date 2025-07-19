/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const initPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = {};
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "",
      data: result,
    });
  }
);

const successPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = {};
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "",
      data: result,
    });
  }
);

const failPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = {};
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "",
      data: result,
    });
  }
);

const cancelPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = {};
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "",
      data: result,
    });
  }
);

export const PaymentController = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
};
