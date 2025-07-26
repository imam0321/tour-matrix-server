/* eslint-disable @typescript-eslint/no-explicit-any */
import PDFDocument from "pdfkit";
import AppError from "../errorHelpers/AppError";
import { formatDateReadable } from "./formatDate";

export interface IInvoiceData {
  transactionId: string;
  bookingData: Date;
  userName: string;
  tourTitle: string;
  guestCount: number;
  totalAmount: number;
}

const drawLine = (doc: PDFKit.PDFDocument) => {
  doc
    .moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .strokeColor("#ccc")
    .stroke()
    .moveDown(1);
};

export const generatePdf = async (
  invoiceData: IInvoiceData
): Promise<Buffer<ArrayBufferLike>> => {
  try {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const buffer: Uint8Array[] = [];

      doc.on("data", (chunk) => buffer.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffer)));
      doc.on("error", (error) => reject(error));

      // Header
      doc
        .fontSize(26)
        .fillColor("#333")
        .text("TOUR MATRIX INVOICE", { align: "center" })
        .moveDown();

      // Line Separator
      drawLine(doc);

      // Transaction Info
      doc
        .fontSize(12)
        .fillColor("#555")
        .text(`Transaction ID: ${invoiceData.transactionId}`)
        .text(`Booking Date: ${formatDateReadable(invoiceData.bookingData)}`)
        .moveDown();

      drawLine(doc);

      // Customer Info
      doc
        .fontSize(14)
        .fillColor("#000")
        .text("Customer Details", { underline: true })
        .moveDown(0.5)
        .fontSize(12)
        .fillColor("#333")
        .text(`Name: ${invoiceData.userName}`)
        .moveDown();

      drawLine(doc);

      // Tour Info
      doc
        .fontSize(14)
        .fillColor("#000")
        .text("Tour Details", { underline: true })
        .moveDown(0.5)
        .fontSize(12)
        .fillColor("#333")
        .text(`Tour: ${invoiceData.tourTitle}`)
        .text(`Guests: ${invoiceData.guestCount}`)
        .moveDown();

      drawLine(doc);

      // Payment Info
      doc
        .fontSize(14)
        .fillColor("#000")
        .text("Payment Summary", { underline: true })
        .moveDown(0.5)
        .font("Helvetica-Bold")
        .fontSize(12)
        .fillColor("#333")
        .text(`Total Amount: ${invoiceData.totalAmount.toFixed(2)}`)
        .font("Helvetica")
        .moveDown();

      drawLine(doc);

      // Footer
      doc
        .moveDown()
        .fontSize(12)
        .fillColor("#777")
        .text("Thank you for booking with us!", { align: "center" });

      doc.end();
    });
  } catch (error: any) {
    throw new AppError(401, `Pdf creation error ${error.message}`);
  }
};
