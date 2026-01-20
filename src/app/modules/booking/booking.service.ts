/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import { User } from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import { Booking } from "./booking.model";
import { Tour } from "../tour/tour.model";
import { Payment } from "../payment/payment.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { SSLService } from "../sslCommerz/sslCommerz.service";
import { getTransactionId } from "../../utils/getTransactionId";

/**
 * Duplicate DB Collection / replica
 *
 * Replica DB -> [Create Booking -> Create Payment -> Update Booking -> Error ] -> Real DB
 */

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
  const transactionId = getTransactionId();

  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId);
    if (!user?.phone || !user.address) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Please update user profile to book a tour"
      );
    }

    const tour = await Tour.findById(payload.tour).select("costFrom");
    if (!tour?.costFrom) {
      throw new AppError(httpStatus.BAD_REQUEST, "No tour cost found!");
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const amount = Number(tour.costFrom) * Number(payload.guestCount!);

    const booking = await Booking.create(
      [
        {
          user: userId,
          status: BOOKING_STATUS.PENDING,
          ...payload,
        },
      ],
      { session }
    );

    const payment = await Payment.create(
      [
        {
          booking: booking[0]._id,
          status: PAYMENT_STATUS.UNPAID,
          transactionId: transactionId,
          amount: amount,
        },
      ],
      { session }
    );

    const updatedBooking = await Booking.findByIdAndUpdate(
      booking[0]._id,
      { payment: payment[0]._id },
      { new: true, runValidators: true, session }
    )
      .populate("user", "name email phone address")
      .populate("tour", "title costFrom")
      .populate("payment");

    if (!updatedBooking) {
      throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
    }

    const populatedUser = updatedBooking.user as any;
    const userName = populatedUser.name;
    const userEmail = populatedUser.email;
    const userPhone = populatedUser.phone;
    const userAddress = populatedUser.address;

    const sslPayload: ISSLCommerz = {
      name: userName,
      email: userEmail,
      phoneNumber: userPhone,
      address: userAddress,
      amount: amount,
      transactionId: transactionId,
    };

    const sslPayment = await SSLService.sslPaymentInit(sslPayload);

    await session.commitTransaction(); //transaction
    session.endSession();

    return {
      paymentUrl: sslPayment.GatewayPageURL,
      booking: updatedBooking,
    };
  } catch (error) {
    await session.abortTransaction(); //rollback
    session.endSession();
    throw error;
  }
};

const getAllBookings = async () => {
  const booking = await Booking.find();
  const totalBooking = await Booking.countDocuments();

  return {
    data: booking,
    meta: {
      totalDocument: totalBooking,
    },
  };
};

const getMyBookings = async (userId: string) => {
  const myBooking = await Booking.find({ user: userId }).populate("tour", "title costFrom startDate endDate location").sort({ createdAt: -1 });
  return myBooking;
};

const getSingleBooking = async (bookingId: string) => {
  const booking = await Booking.findById(bookingId);
  return booking;
};

// TODO 
const updateBookingStatus = async () => {
  const booking = {};

  return booking;
};

export const BookingService = {
  createBooking,
  getAllBookings,
  getMyBookings,
  getSingleBooking,
  updateBookingStatus,
};
