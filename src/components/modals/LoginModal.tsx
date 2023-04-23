"use client";

import { useState } from "react";
import { GithubIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../ui/Heading";
import Input from "../inputs/Input";
import { useFormik } from "formik";
import { loginFormSchema } from "@/validators/authValidation";
import { toast } from "react-hot-toast";
import Button from "../ui/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginFormSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      signIn("credentials", { ...values, redirect: false }).then((callback) => {
        setIsLoading(false);
        if (callback?.ok) {
          toast.success("Logged in");
          router.refresh();
          loginModal.onClose();
        }
        if (callback?.error) {
          toast.error(callback.error);
        }
      });
    },
  });

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        onChange={formik.handleChange}
        value={formik.values.email}
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
      <Button outline icon={FcGoogle} onClick={() => {}}>
        Continue with Google
      </Button>
      <Button outline icon={GithubIcon} onClick={() => {}}>
        Continue with Github
      </Button>
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={registerModal.onClose}
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
      open={loginModal.open}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={formik.handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
