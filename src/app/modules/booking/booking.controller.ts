/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BookingService } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const booking = await BookingService.createBooking(
      req.body,
      decodedToken.userId
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Booking Created Successfully",
      data: booking,
    });
  }
);

const getAllBookings = catchAsync(
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

const getUserBookings = catchAsync(
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

const getSingleBooking = catchAsync(
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

const updateBookingStatus = catchAsync(
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
  getAllBookings,
  getUserBookings,
  getSingleBooking,
  updateBookingStatus,
};
