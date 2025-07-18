import { QueryBuilder } from "./../../utils/QueryBuilder";
import httpStatus from "http-status-codes";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import AppError from "../../errorHelpers/AppError";
import { tourSearchableFields } from "./tour.constant";

const createTourType = async (payload: ITourType) => {
  const existingTourType = await TourType.findOne({ name: payload.name });
  if (existingTourType) {
    throw new AppError(httpStatus.BAD_REQUEST, "Tour type already exists.");
  }

  return await TourType.create(payload);
};

const getAllTourTypes = async () => {
  return await TourType.find();
};

const updateTourType = async (id: string, payload: ITourType) => {
  const existingTourType = await TourType.findById(id);
  if (!existingTourType) {
    throw new Error("Tour type not found.");
  }

  const updatedTourType = await TourType.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedTourType;
};
const deleteTourType = async (id: string) => {
  const existingTourType = await TourType.findById(id);
  if (!existingTourType) {
    throw new Error("Tour type not found.");
  }

  return await TourType.findByIdAndDelete(id);
};

const createTour = async (payload: ITour) => {
  const existingTour = await Tour.findOne({ title: payload.title });

  if (existingTour) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "A tour with this title already exists."
    );
  }

  const tour = await Tour.create(payload);

  return tour;
};

const getAllTours = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Tour.find(), query);

  const tours = await queryBuilder
    .search(tourSearchableFields)
    .sort()
    .filter()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    tours.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const existingTour = await Tour.findById(id);

  if (!existingTour) {
    throw new AppError(httpStatus.NOT_FOUND, "Tour not found.");
  }

  const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

  return updatedTour;
};

const deleteTour = async (id: string) => {
  return await Tour.findByIdAndDelete(id);
};

export const TourService = {
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
  createTour,
  getAllTours,
  updateTour,
  deleteTour,
};

// const getAllTours = async (query: Record<string, string>) => {
//   const filter = query;
//   const searchTerm = query.searchTerm || "";
//   const sort = query.sort || "createdAt";
//   const fields = query.fields?.split(",").join(" ") || "";
//   const page = Number(query.page) || 1;
//   const limit = Number(query.limit) || 5;
//   const skip = (page - 1) * limit;

//   for (const field of excludeField) {
//     // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
//     delete filter[field];
//   }

//   const searchQuery = {
//     $or: tourSearchableFields.map((field) => ({
//       [field]: { $regex: searchTerm, $options: "i" },
//     })),
//   };

//   const tours = await Tour.find(searchQuery)
//     .find(filter)
//     .sort(sort)
//     .select(fields)
//     .skip(skip)
//     .limit(limit);

//   const totalTour = await Tour.countDocuments();
//   const totalPage = Math.ceil(totalTour / limit);

//   const meta = {
//     page: page,
//     limit: limit,
//     totalPage: totalPage,
//     totalTour: totalTour,
//   };

//   return {
//     data: tours,
//     meta: meta,
//   };
// };
