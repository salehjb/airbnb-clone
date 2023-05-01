import * as Yup from "yup";

export const rentModalSchema = Yup.object().shape({
  category: Yup.string().required("category is required"),
  location: Yup.object().required("location is required"),
  guestCount: Yup.number(),
  roomCount: Yup.number(),
  bathroomCount: Yup.number(),
  imageSrc: Yup.string().required("image is required"),
  price: Yup.number().required("price is required"),
  title: Yup.string().required("title is required"),
  description: Yup.string().required("description is required"),
})