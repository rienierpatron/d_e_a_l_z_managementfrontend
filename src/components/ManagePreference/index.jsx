/**
 * External dependencies
 */
import { useEffect, useState } from "react";
import * as Yup from "yup";
/**
 * Internal dependencies
 */
import Button from "@/components/Common/Button";
import Dialog from "@/components/Common/Dialog";
import Typography from "@/components/Common/Typography";
import FormFieldset from "@/components/Common/FormFieldset";
import FormLabel from "@/components/Common/FormLabel";
import {
  AGE_RANGE,
  BUSINESS_GOAL,
  BUSINESS_LOCATION,
  BUSINESS_TYPE_OPTIONS,
  GENDER,
} from "@/lib/constants";
import IconAdd from "@/components/Icons/IconAdd";
import FormSelect from "@/components/Common/FormSelect";
import IconBuilding from "@/components/Icons/IconBuilding";
import IconBuildings from "@/components/Icons/IconBuildings";
import IconLocation from "@/components/Icons/IconLocation";
import IconUserTag from "@/components/Icons/IconUserTag";
import IconProfileCircle from "@/components/Icons/IconProfileCircle";
import IconChart from "@/components/Icons/IconChart";
import { validateFormData, validations } from "@/lib/validations";
import FormInputValidation from "@/components/Common/FormInputValidation";
import { helper } from "@/helpers";
import { saveAgencyPreference } from "@/api/agency-preference";
import FormSelectAsync from "@/components/Common/FormSelectAsync";
import { loadLocationAddress } from "@/lib/utils";
import { api } from "@/api";

const ManagePreference = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const intitalState = {
    business_type: "",
    business_location: [],
    business_location_address: [""],
    audience_age_range: "",
    audience_gender: "",
    audience_location: "",
    business_goal: "",
  };

  const [formData, setFormData] = useState(intitalState);
  const [error, setError] = useState(null);

  const {
    business_type,
    audience_age_range,
    audience_gender,
    audience_location,
    business_location,
    business_location_address,
    business_goal,
  } = formData;

  const validationSchema = Yup.object().shape({
    business_type: validations.stringRequiredField,
    business_location: validations.businessLocation,
    business_location_address: validations.businessLocationAddress,
    audience_age_range: validations.stringRequiredField,
    audience_gender: validations.stringRequiredField,
    audience_location: validations.stringRequiredField,
    business_goal: validations.stringRequiredField,
  });

  const fetchAgencyPreference = async () => {
    try {
      setIsLoading(true);
      const res = await api.preference.getAgencyPreference(
        "11e8864c-598e-43e1-93b1-6dcba01b39e0",
        false
      );
      if (res.status === "ok") {
        setIsLoading(false);
        const agency_preference = res.data.agency_preference;
        setFormData({
          business_type: agency_preference.business_type,
          audience_age_range: agency_preference.audience_age_range,
          audience_gender: agency_preference.audience_gender,
          audience_location: agency_preference.audience_location,
          business_location: agency_preference.agency_biz_locations.map(
            (ele) => {
              return {
                label: ele.location,
                value: ele.location,
              };
            }
          ),
          business_location_address,
          business_goal: agency_preference.business_goal,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (showDialog) {
      fetchAgencyPreference();
    }
  }, [showDialog]);

  const onChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onChangeLocation = (value, index) => {
    setFormData((prevFormData) => {
      const updatedAddresses = [...prevFormData.business_location_address];
      updatedAddresses[index] = value;
      return { ...prevFormData, business_location_address: updatedAddresses };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true)
      const { hasError, errors } = await validateFormData(
        validationSchema,
        formData
      );
      if (hasError) {
        setError(errors);
        return;
      } else {
        const _formData = {
          ...formData,
          agency_id: "11e8864c-598e-43e1-93b1-6dcba01b39e0",
        };
        _formData.business_location = formData.business_location.map(
          (location) => location.value
        );
        const res = await saveAgencyPreference(_formData);
        if (res && helper.cmpStr(res.status, "ok")) {
          setError(null);
          setIsLoading(false)
        } else {
          setError(false);
        }
      }
    } catch (error) {
      setError(false);
      console.error("Error calidate user info:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleAddMoreLocationAddress = () => {
    setFormData({
      ...formData,
      business_location_address: [...business_location_address, ""],
    });
  };

  return (
    <>
      <Button
        className="border-none shadow-custom-black font-medium"
        isRound
        onClick={() => setShowDialog(true)}
      >
        Manage Preferences
      </Button>
      <Dialog
        show={showDialog}
        onClose={() => setShowDialog(false)}
        contentClassName="!pb-0"
        header={
          <>
            <Typography variant="title">Business Details</Typography>
            <Typography variant="body" className="!text-dark-gray mt-[10px]">
              Enter your business details below.
            </Typography>
          </>
        }
        footer={
          <Button
            variant="primary"
            className="font-bold shadow-custom-primary"
            fullWidth
            isRound
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit
          </Button>
        }
      >
        <form>
          <FormFieldset className="mb-[32px]">
            <FormLabel className="uppercase" htmlFor="business_type">
              Business Type
            </FormLabel>
            <FormSelect
              id="business_type"
              name="business_type"
              options={BUSINESS_TYPE_OPTIONS}
              rounded
              icon={<IconBuildings />}
              placeholder="Select business type"
              onChange={(option) => onChange("business_type", option?.value)}
              onKeyDown={handleKeyDown}
              value={BUSINESS_TYPE_OPTIONS.find(
                (ele) => ele.value === business_type
              )}
              isError={error && error["business_type"]}
            />
            {error && error["business_type"] && (
              <FormInputValidation isError text={error["business_type"]} />
            )}
          </FormFieldset>
          <FormFieldset className="mb-[32px]">
            <FormLabel className="uppercase w-full">
              <div className="flex items-center justify-between w-full">
                <span>
                  Business Location{" "}
                  {business_location?.length > 0
                    ? `(${business_location.length})`
                    : ""}
                </span>
                {/* <IconAdd className="cursor-pointer" /> */}
              </div>
            </FormLabel>
            <FormSelect
              id="business_location"
              name="business_location"
              value={business_location}
              options={BUSINESS_LOCATION}
              rounded
              isMulti
              icon={<IconBuilding />}
              placeholder="Select business location"
              onChange={(option) =>
                setFormData({ ...formData, business_location: option })
              }
              onKeyDown={handleKeyDown}
              isError={error && error["business_location"]}
            />
            {error && error["business_location"] && (
              <FormInputValidation isError text={error["business_location"]} />
            )}
          </FormFieldset>
          <FormFieldset className="mb-[32px]">
            <FormLabel className="uppercase w-full">
              <div className="flex items-center justify-between w-full">
                <span>How many locations does the business have?</span>
                <IconAdd
                  className="cursor-pointer"
                  onClick={handleAddMoreLocationAddress}
                />
              </div>
            </FormLabel>
            <div className="flex flex-col gap-2">
              {business_location_address?.length &&
                business_location_address.map((location, i) => {
                  return (
                    <div>
                      <FormSelectAsync
                        id={`business_location_address[${i}]`}
                        name={`business_location_address[${i}]`}
                        loadOptions={(label) => loadLocationAddress(label)}
                        value={BUSINESS_TYPE_OPTIONS.find(
                          (ele) => ele.value === location
                        )}
                        rounded
                        icon={<IconLocation />}
                        placeholder="Select location address"
                        onChange={(option) =>
                          onChangeLocation(option?.value, i)
                        }
                        onKeyDown={handleKeyDown}
                        className="mb-2"
                        isError={
                          error && error[`business_location_address[${i}]`]
                        }
                      />
                      {error && error[`business_location_address[${i}]`] && (
                        <FormInputValidation
                          isError
                          text={error[`business_location_address[${i}]`]}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          </FormFieldset>
          <FormFieldset className="mb-[32px]">
            <FormLabel
              className="uppercase w-full"
              htmlFor="audience_age_range"
            >
              Target Audience
            </FormLabel>
            <div className="flex gap-4 justify-between items-center">
              <div>
                <FormSelect
                  id="audience_age_range"
                  name="audience_age_range"
                  options={AGE_RANGE}
                  rounded
                  icon={<IconUserTag />}
                  placeholder="Age range"
                  onKeyDown={handleKeyDown}
                  onChange={(option) =>
                    onChange("audience_age_range", option?.value)
                  }
                  value={AGE_RANGE.find(
                    (ele) => ele.value === audience_age_range
                  )}
                  isError={error && error["audience_age_range"]}
                />
                {error && error["audience_age_range"] && (
                  <FormInputValidation
                    isError
                    text={error["audience_age_range"]}
                  />
                )}
              </div>
              <div>
                <FormSelect
                  id="audience_gender"
                  name="audience_gender"
                  options={GENDER}
                  rounded
                  icon={<IconProfileCircle />}
                  placeholder="Gender"
                  onKeyDown={handleKeyDown}
                  onChange={(option) =>
                    onChange("audience_gender", option?.value)
                  }
                  value={GENDER.find((ele) => ele.value === audience_gender)}
                  isError={error && error["audience_gender"]}
                />
                {error && error["audience_gender"] && (
                  <FormInputValidation
                    isError
                    text={error["audience_gender"]}
                  />
                )}
              </div>
              <div>
                <FormSelect
                  id="audience_location"
                  name="audience_location"
                  options={BUSINESS_LOCATION}
                  rounded
                  icon={<IconLocation />}
                  placeholder="Location"
                  onKeyDown={handleKeyDown}
                  onChange={(option) =>
                    onChange("audience_location", option?.value)
                  }
                  value={BUSINESS_LOCATION.find(
                    (ele) => ele.value === audience_location
                  )}
                  isError={error && error["audience_location"]}
                />
                {error && error["audience_location"] && (
                  <FormInputValidation
                    isError
                    text={error["audience_location"]}
                  />
                )}
              </div>
            </div>
          </FormFieldset>
          <FormFieldset>
            <FormLabel className="uppercase w-full" htmlFor="business_goal">
              What is the businesses goal with DEALZ?
            </FormLabel>
            <FormSelect
              id="business_goal"
              name="business_goal"
              options={BUSINESS_GOAL}
              rounded
              icon={<IconChart />}
              placeholder="Select goal"
              onChange={(option) => onChange("business_goal", option?.value)}
              onKeyDown={handleKeyDown}
              value={BUSINESS_GOAL.find((ele) => ele.value === business_goal)}
              isError={error && error["business_goal"]}
            />
            {error && error["business_goal"] && (
              <FormInputValidation isError text={error["business_goal"]} />
            )}
          </FormFieldset>
        </form>
      </Dialog>
    </>
  );
};

export default ManagePreference;
