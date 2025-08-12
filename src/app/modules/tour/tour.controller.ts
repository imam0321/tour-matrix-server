/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { TourService } from "./tour.service";
import { ITour } from "./tour.interface";

const createTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await TourService.createTourType(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Tour type created successfully",
      data: result,
    });
  }
);

const getAllTourTypes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await TourService.getAllTourTypes( query as Record<string, string>);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tour types retrieved successfully",
      data: result.data,
      meta: result.meta
    });
  }
);

const updateTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await TourService.updateTourType(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tour type updated successfully",
      data: result,
    });
  }
);

const deleteTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await TourService.deleteTourType(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tour type deleted successfully",
      data: result,
    });
  }
);

const createTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload: ITour = {
      ...req.body,
      images: (req.files as Express.Multer.File[]).map((file) => file.path),
    };
    const result = await TourService.createTour(payload);

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
    const query = req.query;
    const result = await TourService.getAllTours(
      query as Record<string, string>
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tours retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

const updateTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload: ITour = {
      ...req.body,
      images: (req.files as Express.Multer.File[]).map((file) => file.path),
    };

    const result = await TourService.updateTour(req.params.id, payload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tour updated successfully",
      data: result,
    });
  }
);

const deleteTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await TourService.deleteTour(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tour deleted successfully",
      data: result,
    });
  }
);

export const TourController = {
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
  createTour,
  getAllTours,
  updateTour,
  deleteTour,
};
