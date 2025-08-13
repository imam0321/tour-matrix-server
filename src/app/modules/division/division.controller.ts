/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { DivisionService } from "./division.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { IDivision } from "./division.interface";

const createDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload: IDivision = {
      ...req.body,
      thumbnail: req.file?.path,
    };

    const result = await DivisionService.createDivision(payload);

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
    const query = req.query
    const result = await DivisionService.getAllDivision(query as Record<string, string>);

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
    const result = await DivisionService.getSingleDivision(slug);

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
    const payload: IDivision = {
      ...req.body,
      thumbnail: req.file?.path,
    };
    const result = await DivisionService.updateDivision(id, payload);

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
    const result = await DivisionService.deleteDivision(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Division Deleted",
      data: result,
    });
  }
);

export const DivisionController = {
  createDivision,
  getAllDivision,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
