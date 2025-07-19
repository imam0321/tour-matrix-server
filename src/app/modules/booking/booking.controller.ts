/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = {};
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Booking Created",
      data: result,
    });
  }
);

export const BookingController = {
  createBooking,
};
