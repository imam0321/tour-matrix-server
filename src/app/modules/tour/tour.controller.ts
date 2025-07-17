/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { TourServices } from "./tour.service";

const createTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await TourServices.createTourType(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Tour type created successfully",
      data: result,
    });
  }
);

const getAllTourTypes = catchAsync(async (req: Request, res: Response) => {
  const result = await TourServices.getAllTourTypes();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour types retrieved successfully",
    data: result,
  });
});

const updateTourType = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TourServices.updateTourType(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour type updated successfully",
    data: result,
  });
});

const deleteTourType = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TourServices.deleteTourType(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour type deleted successfully",
    data: result,
  });
});

const createTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await TourServices.createTour(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Tour created successfully",
      data: result,
    });
  }
);

const getAllTours = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await TourServices.getAllTours();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tours retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

const updateTour = catchAsync(async (req: Request, res: Response) => {
  const result = await TourServices.updateTour(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour updated successfully",
    data: result,
  });
});

const deleteTour = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TourServices.deleteTour(id);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour deleted successfully",
    data: result,
  });
});

export const TourControllers = {
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
  createTour,
  getAllTours,
  updateTour,
  deleteTour,
};
