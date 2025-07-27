/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { StatsService } from "./stats.service";

const getUserStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await StatsService.getUserStats()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Stats Retrieved Successfully",
      data: result,
    });
  }
);
const getTourStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "",
      data: null,
    });
  }
);
const getBookingStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "",
      data: null,
    });
  }
);
const getPaymentStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "",
      data: null,
    });
  }
);




export const StatsController ={
  getUserStats,
  getTourStats,
  getBookingStats,
  getPaymentStats,
}