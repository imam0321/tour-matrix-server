/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { Booking } from "../booking/booking.model";
import { Payment } from "./payment.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { BOOKING_STATUS } from "../booking/booking.interface";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { SSLService } from "../sslCommerz/sslCommerz.service";

const initPayment = async (bookingId: string) => {
  const payment = await Payment.findOne({ booking: bookingId });

  if (!payment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Payment Not found. You have not booked this tour"
    );
  }

  const booking = await Booking.findById(payment.booking);

  const userName = (booking as any).name;
  const userEmail = (booking as any).email;
  const userPhone = (booking as any).phone;
  const userAddress = (booking as any).address;

  const sslPayload: ISSLCommerz = {
    name: userName,
    email: userEmail,
    phoneNumber: userPhone,
    address: userAddress,
    amount: payment.amount,
    transactionId: payment.transactionId,
  };

  const sslPayment = await SSLService.sslPaymentInit(sslPayload);

  return {
    paymentUrl: sslPayment.GatewayPageURL,
  };
};

const successPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  session.startTransaction();
  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      { status: PAYMENT_STATUS.PAID },
      { runValidators: true, session }
    );

    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,
      { status: BOOKING_STATUS.COMPLETE },
      { runValidators: true, session }
    );

    await session.commitTransaction();
    session.endSession();
    return { success: true, message: "Payment Completed successfully" };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const failPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  session.startTransaction();
  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      { status: PAYMENT_STATUS.FAILED },
      { runValidators: true, session }
    );

    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,
      { status: BOOKING_STATUS.FAILED },
      { runValidators: true, session }
    );

    await session.commitTransaction();
    session.endSession();
    return { success: false, message: "Payment Failed!" };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const cancelPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  session.startTransaction();
  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      { status: PAYMENT_STATUS.CANCELLED },
      { runValidators: true, session }
    );

    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,
      { status: BOOKING_STATUS.CANCEL },
      { runValidators: true, session }
    );

    await session.commitTransaction();
    session.endSession();
    return { success: false, message: "Payment Cancelled!" };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const PaymentService = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
};
