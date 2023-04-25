"use client";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { registerFormSchema } from "@/validators/authValidation";
import axios from "axios";
import { useFormik } from "formik";
import { GithubIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Input from "../inputs/Input";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Modal from "./Modal";

const RegisterModal = ({}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validationSchema: registerFormSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      axios
        .post("/api/register", values)
        .then(() => {
          registerModal.onClose();
        })
        .catch((err) => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        onChange={formik.handleChange}
        value={formik.values.email}
        errors={formik.errors}
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        onChange={formik.handleChange}
        value={formik.values.name}
        errors={formik.errors}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        onChange={formik.handleChange}
        value={formik.values.password}
        errors={formik.errors}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        icon={FcGoogle}
        onClick={() => {
          signIn("google");
        }}
      >
        Continue with Google
      </Button>
      <Button outline icon={GithubIcon} onClick={() => signIn("github")}>
        Continue with Github
      </Button>
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={() => {
              registerModal.onClose();
              loginModal.onOpen();
            }}
            className="text-netural-800 cursor-pointer hover:underline"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      open={registerModal.open}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={formik.handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
