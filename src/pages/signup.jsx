import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import EmailConfirmationPopup from "@/popups/EmailConfirmationPopup";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { api } from "@/api";
import FormInput from "@/components/Common/FormInput";
import Button from "@/components/Common/Button";
import Typography from "@/components/Common/Typography";
import FormFieldset from "@/components/Common/FormFieldset";
import FormLabel from "@/components/Common/FormLabel";
import { BUSINESS_TYPE_OPTIONS, UPLOAD_TYPES } from "@/lib/constants";
import FormSelect from "@/components/Common/FormSelect";
import { helper } from "@/helpers";
import CustomGoogleLogin from "@/components/GoogleSignIn";
import { useUser } from "@/context/UserContext";
import UploadBusinessLogo from "@/components/UploadBusinessLogo";

export default function Signup({ googleClientId }) {
  const currentUser = useUser();
  const isSuperAdminOrStaff = currentUser?.user?.is_super_or_staff;
  const intialData = {
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    businessType: null,
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userData, setUserData] = useState(intialData);
  const [isLoading, setIsLoading] = useState(false);
  const [agencyLogo, setAgencyLogo] = useState(null);
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    companyName: false,
    businessType: false,
  });

  const [authType, setAuthType] = useState("email");
  const [socialPayload, setSocialPayload] = useState(null);
  const [formKey, setFormKey] = useState(Date.now());

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    (async () => {
      // Get CSRF TOKEN
      await api.auth.getCsrfToken();
    })();
  }, []);

  const validateForm = useCallback(() => {
    const { firstName, lastName, email, companyName, businessType } = userData;
    const newErrors = {
      firstName: !firstName,
      lastName: !lastName,
      email: !email || !helper.validateEmail(email),
      companyName: !companyName,
      businessType: !businessType,
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((value) => !value);
  }, [userData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const { firstName, lastName, email, companyName, businessType } = userData;

    let data, agency_logo;
    setIsLoading(true);

    if (agencyLogo) {
      const logoRes = await api.file.publicUpload(
        UPLOAD_TYPES.agency_logo_image,
        agencyLogo,
        {showMessage: false}
      );
      if (
        logoRes &&
        logoRes.status === "ok" &&
        logoRes.data?.file?.full_file_url
      ) {
        agency_logo = logoRes.data?.file?.full_file_url;
      } else {
        setIsLoading(false);
      }
    }

    if (authType === "email") {
      data = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        company_name: companyName,
        business_type: businessType,
        auth_type: "email",
        agency_logo,
      };
    } else if (authType === "google") {
      data = {
        auth_type: authType,
        first_name: firstName,
        last_name: lastName,
        email: email,
        company_name: companyName,
        business_type: businessType,
        token: socialPayload.social_payload.profileObj.id,
        social_payload: socialPayload.social_payload,
        agency_logo,
      };
    }
    const response = await api.auth.register(data);
    setIsLoading(false);
    if (response && helper.cmpStr(response.status, "ok")) {
      if (authType === "email") {
        setIsPopupOpen(!isPopupOpen);
        setUserData({ ...intialData }); // Reset form data
        setFormKey(Date.now()); // Change key to force re-render
        setAgencyLogo(null)
      } else {
        const accessToken = response.data.access_token;
        if (accessToken) {
          helper.cookie.setAccessToken(accessToken);
          window.location.href = isSuperAdminOrStaff
            ? "/admin/dashboard"
            : "/dashboard";
        }
      }
    }
  };

  const onGoogleSignupSuccess = (response) => {
    const userInfo = response.social_payload.profileObj;
    // Set user data to state
    setUserData({
      ...userData,
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      email: userInfo.email,
    });

    // Set social payload and switch to google auth type
    setSocialPayload(response);
    setAuthType("google");
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="w-full">
        <div className="flex h-full md:h-screen">
          {/* Left Section */}
          <div className="flex-1 bg-white relative hidden md:block">
            {/* Logo in Top-Left Corner */}
            <div className="absolute top-10 left-10">
              <Image
                src="/dealz-logo.svg" // Path to the logo in the public folder
                alt="DEALZ Logo"
                width={114}
                height={44}
                className="rounded-lg"
              />
            </div>

            {/* Centered Image */}
            <div className="flex items-center justify-center h-full">
              <Image
                src="/images/onboarding/big_d_lightBulb.png" // Path to the image in the public folder
                alt="Big D Signup"
                width={512}
                height={512}
                className="rounded-lg animate-scale-rotate"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 flex py-8 items-center justify-center bg-background-blue">
            <form
              key={formKey} // Key added to force re-render on userData change
              onSubmit={handleSubmit}
              className="w-full max-w-md py-8 px-4 h-full flex flex-col justify-center overflow-auto scrollbar-hide md:block"
            >
              <Typography
                variant="title"
                className="mb-[8px] text-center md:text-left"
              >
                Sign Up
              </Typography>
              <Typography
                variant="body"
                className="!text-dark-gray mb-[32px] text-center md:text-left"
              >
                Sign up to stay connected!
              </Typography>

              <div className="flex flex-col gap-6">
                <div className="flex gap-4 flex-col md:flex-row">
                  <FormFieldset className="!mb-0">
                    <FormLabel htmlFor="first-name">First name</FormLabel>
                    <FormInput
                      type="text"
                      id="first-name"
                      name="first-name"
                      placeholder="First name"
                      required
                      value={userData.firstName}
                      onChange={(e) =>
                        setUserData({ ...userData, firstName: e.target.value })
                      }
                      icon="/icons/user-icon.svg"
                      fullWidth
                      rounded
                      isError={errors.firstName}
                    />
                  </FormFieldset>
                  <FormFieldset className="!mb-0">
                    <FormLabel htmlFor="last-name">Last name</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="Last name"
                      id="last-name"
                      name="last-name"
                      required
                      value={userData.lastName}
                      onChange={(e) =>
                        setUserData({ ...userData, lastName: e.target.value })
                      }
                      icon="/icons/user-icon.svg"
                      fullWidth
                      rounded
                      isError={errors.lastName}
                    />
                  </FormFieldset>
                </div>
                <FormFieldset className="!mb-0">
                  <FormLabel htmlFor="company-name">Company name</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Enter your company name"
                    id="company-name"
                    name="company-name"
                    required
                    value={userData.companyName}
                    onChange={(e) =>
                      setUserData({ ...userData, companyName: e.target.value })
                    }
                    icon="/icons/company-icon.svg"
                    fullWidth
                    rounded
                    isError={errors.companyName}
                  />
                </FormFieldset>
                <FormFieldset className="!mb-0">
                  <FormLabel htmlFor="company-name">Business Logo</FormLabel>
                  <UploadBusinessLogo
                    setAgencyLogo={setAgencyLogo}
                    agencyLogo={agencyLogo}
                  />
                </FormFieldset>
                <FormFieldset className="!mb-0">
                  <FormLabel htmlFor="business-type">Business type</FormLabel>
                  <FormSelect
                    id="business-type"
                    name="business-type"
                    placeholder="Select business type"
                    options={BUSINESS_TYPE_OPTIONS}
                    onChange={(selectedOption) =>
                      setUserData({
                        ...userData,
                        businessType: selectedOption.value,
                      })
                    }
                    rounded
                    icon="/icons/company-icon.svg"
                    isError={errors.businessType}
                    value={BUSINESS_TYPE_OPTIONS.find(
                      (e) => e.value === userData.businessType
                    )}
                  />
                </FormFieldset>
                <FormFieldset className="!mb-0">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Enter your email"
                    id="email"
                    name="email"
                    required
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    icon="/icons/email-icon.svg"
                    fullWidth
                    rounded
                    isError={errors.email}
                  />
                </FormFieldset>
              </div>

              {/* Submit Button */}
              <Button
                className="font-bold mt-10"
                variant="primary"
                fullWidth
                isRound
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Sign Up
              </Button>

              {/* Already Have Account */}
              <Typography
                variant="caption"
                className="font-normal text-center mt-4"
              >
                Already have an account?{" "}
                <Link href="/login" className="text-secondary underline">
                  Log In
                </Link>
              </Typography>

              {/* Social Signup */}
              <Typography variant="caption" className="py-10 text-center">
                Or Sign Up using
              </Typography>
              <CustomGoogleLogin onLoginSuccess={onGoogleSignupSuccess} />
            </form>
          </div>
        </div>

        {/* Popup */}
        <EmailConfirmationPopup
          isPopupOpen={isPopupOpen}
          togglePopup={togglePopup}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      googleClientId: process.env.GOOGLE_CLIENT_ID || "", // Ensure runtime retrieval
    },
  };
}
