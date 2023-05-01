"use client";

import categories from "@/data/categories";
import useRentModal from "@/hooks/useRentModal";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import CategoryInput from "../inputs/CategoryInput";
import Heading from "../ui/Heading";
import Modal from "./Modal";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { rentModalSchema } from "@/validators/rentModalValidation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
    validationSchema: rentModalSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      axios
        .post("/api/listings", values)
        .then(() => {
          toast.success("Listing Created!");
          router.refresh();
          formik.resetForm();
          setStep(STEPS.CATEGORY);
          rentModal.onClose();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const Map = useMemo(
    () => dynamic(() => import("../ui/Map"), { ssr: false }),
    [formik.values.location]
  );

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    formik.validateForm();
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent;

  // CATEGORY STEP BODY
  if (step === STEPS.CATEGORY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which of these best describes your place?"
          subtitle="Pick a category"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                icon={item.icon}
                label={item.label}
                selected={formik.values.category === item.label}
                onClick={(category) => {
                  formik.setValues((prev) => ({ ...prev, category }));
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // LOCATION STEP BODY
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={formik.values?.location}
          onChange={(location) =>
            formik.setValues((prev) => ({ ...prev, location }))
          }
        />
        {/* @ts-ignore */}
        <Map center={formik.values.location?.latlng} />
      </div>
    );
  }

  // INFO STEP BODY
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={formik.values.guestCount}
          onChange={(value) =>
            formik.setValues((prev) => ({ ...prev, guestCount: value }))
          }
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={formik.values.roomCount}
          onChange={(value) =>
            formik.setValues((prev) => ({ ...prev, roomCount: value }))
          }
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={formik.values.bathroomCount}
          onChange={(value) =>
            formik.setValues((prev) => ({ ...prev, bathroomCount: value }))
          }
        />
      </div>
    );
  }

  // IMAGES STEP BODY
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo for your place"
          subtitle="Show guests whats your place look like!"
        />
        <ImageUpload
          value={formik.values.imageSrc}
          onChange={(value) =>
            formik.setValues((prev) => ({ ...prev, imageSrc: value }))
          }
        />
      </div>
    );
  }

  // DESCRIPTION STEP BODY
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          errors={formik.errors}
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          errors={formik.errors}
          value={formik.values.description}
          onChange={formik.handleChange}
        />
      </div>
    );
  }

  // PRICE STEP BODY
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          value={formik.values.price}
          onChange={formik.handleChange}
          errors={formik.errors}
        />
      </div>
    );
  }

  return (
    <Modal
      open={rentModal.open}
      onClose={rentModal.onClose}
      onSubmit={() => {
        if (step !== STEPS.PRICE) return onNext();
        if (Object.keys(formik.errors).length > 0) {
          return toast.error("There was a problem entering information")
        }
        formik.handleSubmit();
      }}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
      body={bodyContent}
    />
  );
};

export default RentModal;
