import AppError from "../../errorHelpers/AppError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";
import httpStatus from "http-status-codes";

const createDivision = async (payload: Partial<IDivision>) => {
  const existingDivision = await Division.findOne({ name: payload.name });

  if (existingDivision) {
    throw new AppError(
      httpStatus.CONFLICT,
      "A division with this name already exists."
    );
  }

  // const baseSlug = payload.name?.toLowerCase().split(" ").join("-");
  // let slug = `${baseSlug}-division`;

  // let counter = 0;
  // while (await Division.exists({ slug })) {
  //   slug = `${slug}-${counter++}`;
  // }

  // payload.slug = slug;

  const division = await Division.create(payload);

  return division;
};

const getAllDivision = async () => {
  const division = await Division.find({});
  const totalDivision = await Division.countDocuments();

  return {
    data: division,
    meta: {
      totalDocument: totalDivision,
    },
  };
};

const getSingleDivision = async (slug: string) => {
  const division = await Division.findOne({ slug });

  return division;
};

const updateDivision = async (id: string, payload: Partial<IDivision>) => {
  const existingDivision = await Division.findById(id);
  if (!existingDivision) {
    throw new AppError(httpStatus.NOT_FOUND, "Division not found.");
  }

  const duplicateDivision = await Division.findOne({
    name: payload.name,
    _id: { $ne: id },
  });

  if (duplicateDivision) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "A division with this name already exists."
    );
  }

  // if (payload.name) {
  //   const baseSlug = payload.name?.toLowerCase().split(" ").join("-");
  //   let slug = `${baseSlug}-division`;

  //   let counter = 0;
  //   while (await Division.exists({ slug })) {
  //     slug = `${slug}-${counter++}`;
  //   }

  //   payload.slug = slug;
  // }

  const updateDivision = await Division.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updateDivision;
};

const deleteDivision = async (id: string) => {
  await Division.findByIdAndDelete(id);
  return null;
};

export const DivisionService = {
  createDivision,
  getAllDivision,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
