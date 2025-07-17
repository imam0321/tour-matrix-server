/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { DivisionServices } from "./division.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await DivisionServices.createDivision(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Division Created",
      data: result,
    });
  }
);

const getAllDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await DivisionServices.getAllDivision();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Divisions retrieved",
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;
    const result = await DivisionServices.getSingleDivision(slug);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Divisions retrieved",
      data: result,
    });
  }
);

const updateDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await DivisionServices.updateDivision(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Division Updated",
      data: result,
    });
  }
);

const deleteDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await DivisionServices.deleteDivision(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Division Deleted",
      data: result,
    });
  }
);

export const DivisionControllers = {
  createDivision,
  getAllDivision,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
