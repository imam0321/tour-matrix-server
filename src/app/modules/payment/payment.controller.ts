/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { PaymentService } from "./payment.service";
import { envVars } from "../../config/env";

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
    const query = req.query;
    const result = await PaymentService.createPayment(
      query as Record<string, string>
    );

    if (result.success) {
      res.redirect(
        `${envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
      );
    }
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
