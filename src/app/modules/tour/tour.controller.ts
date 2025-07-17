import catchAsync from "../../utils/catchAsync"

const createTour = catchAsync(async () => {
  console.log("object");
})

export const TourControllers = {
  createTour,
}