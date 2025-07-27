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
  return;
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
