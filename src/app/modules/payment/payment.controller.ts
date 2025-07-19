/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = {};
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Payment Created",
      data: result,
    });
  }
);

export const PaymentController = {
  createPayment,
};
