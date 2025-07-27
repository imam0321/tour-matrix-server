import { Booking } from "../booking/booking.model";
import { Tour } from "../tour/tour.model";
import { IsActive } from "../user/user.interface";
import { User } from "../user/user.model";

const now = new Date();
const sevenDaysAgo = new Date(now).setDate(now.getDate() - 7);
const thirtyDaysAgo = new Date(now).setDate(now.getDate() - 30);

const getUserStats = async () => {
  const totalUsersPromise = User.countDocuments();

  const totalActiveUserPromise = User.countDocuments({
    isActive: IsActive.ACTIVE,
  });
  const totalInactiveUserPromise = User.countDocuments({
    isActive: IsActive.INACTIVE,
  });
  const totalBlockUserPromise = User.countDocuments({
    isActive: IsActive.BLOCKED,
  });

  const newUserInLast7DaysPromise = User.countDocuments({
    createdAt: { $gte: sevenDaysAgo },
  });
  const newUserInLast30DaysPromise = User.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  });

  const usersByRolePromise = User.aggregate([
    {
      $group: {
        _id: "$role",
        count: { $sum: 1 },
      },
    },
  ]);

  const [
    totalUsers,
    totalActiveUser,
    totalInactiveUser,
    totalBlockUser,
    newUserInLast7Days,
    newUserInLast30Days,
    usersByRole,
  ] = await Promise.all([
    totalUsersPromise,
    totalActiveUserPromise,
    totalInactiveUserPromise,
    totalBlockUserPromise,
    newUserInLast7DaysPromise,
    newUserInLast30DaysPromise,
    usersByRolePromise,
  ]);

  return {
    totalUsers,
    totalActiveUser,
    totalInactiveUser,
    totalBlockUser,
    newUserInLast7Days,
    newUserInLast30Days,
    usersByRole,
  };
};

const getTourStats = async () => {
  const totalToursPromise = Tour.countDocuments();

  const totalTourByTourTypesPromise = Tour.aggregate([
    {
      $lookup: {
        from: "tourtypes",
        localField: "tourType",
        foreignField: "_id",
        as: "type",
      },
    },
    {
      $unwind: "$type",
    },
    {
      $group: {
        _id: "$type.name",
        count: { $sum: 1 },
      },
    },
  ]);

  const avgTourCostPromise = Tour.aggregate([
    {
      $group: {
        _id: null,
        avgCostFrom: { $avg: "$costFrom" },
      },
    },
  ]);

  const totalTourByDivisionsPromise = Tour.aggregate([
    {
      $lookup: {
        from: "divisions",
        localField: "division",
        foreignField: "_id",
        as: "division",
      },
    },
    {
      $unwind: "$division",
    },
    {
      $group: {
        _id: "$division.name",
        count: { $sum: 1 },
      },
    },
  ]);

  const totalHighestBookedTourPromise = Booking.aggregate([
    {
      $group: {
        _id: "$tour",
        bookingCount: { $sum: 1 },
      },
    },
    {
      $sort: { bookingCount: -1 },
    },
    {
      $limit: 5,
    },

    {
      $lookup: {
        from: "tours",
        let: { tourId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$tourId"],
              },
            },
          },
        ],
        as: "tour",
      },
    },
    {
      $unwind: "$tour",
    },
    {
      $project: {
        bookingCount: 1,
        "tour.title": 1,
        "tour.slug": 1,
      },
    },
  ]);

  const [
    totalTours,
    totalTourByTourTypes,
    totalTourByDivisions,
    totalHighestBookedTour,
    avgTourCost,
  ] = await Promise.all([
    totalToursPromise,
    totalTourByTourTypesPromise,
    totalTourByDivisionsPromise,
    totalHighestBookedTourPromise,
    avgTourCostPromise,
  ]);
  return {
    totalTours,
    totalTourByTourTypes,
    totalTourByDivisions,
    totalHighestBookedTour,
    avgTourCost,
  };
};

const getBookingStats = async () => {
  return;
};

const getPaymentStats = async () => {
  return;
};

export const StatsService = {
  getUserStats,
  getTourStats,
  getBookingStats,
  getPaymentStats,
};

// await Tour.updateMany(
//         {
//             // Only update where tourType or division is stored as a string
//             $or: [
//                 { tourType: { $type: "string" } },
//                 { division: { $type: "string" } }
//             ]
//         },
//         [
//             {
//                 $set: {
//                     tourType: { $toObjectId: "$tourType" },
//                     division: { $toObjectId: "$division" }
//                 }
//             }
//         ]
//     );
