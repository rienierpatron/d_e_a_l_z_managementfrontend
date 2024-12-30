import { useState } from "react";

import Button from "@/components/Common/Button";
import Dialog from "@/components/Common/Dialog";
import Typography from "@/components/Common/Typography";
import FormFieldset from "@/components/Common/FormFieldset";
import FormLabel from "@/components/Common/FormLabel";
import {
  AGE_RANGE,
  BUSINESS_GOAL,
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

const ManagePreference = () => {
  const [showDialog, setShowDialog] = useState(false);
  const intitalState = {
    business_type: "",
    audience_age_range: "",
    audience_gender: "",
    audience_location: "",
    dealz_per_month: "",
    business_goal: "",
  };

  const [formData, setFormData] = useState(intitalState);

  const {
    business_type,
    audience_age_range,
    audience_gender,
    audience_location,
    business_goal,
  } = formData;

  const onChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
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
            />
          </FormFieldset>
          <FormFieldset className="mb-[32px]">
            <FormLabel className="uppercase w-full">
              <div className="flex items-center justify-between w-full">
                <span>Business Location (2)</span>
                <IconAdd className="cursor-pointer" />
              </div>
            </FormLabel>
            <FormSelect
              id="business-location"
              name="business-location"
              options={BUSINESS_TYPE_OPTIONS}
              rounded
              icon={<IconBuilding />}
              placeholder="Select business location"
              onChange={() => {}}
              onKeyDown={handleKeyDown}
            />
          </FormFieldset>
          <FormFieldset className="mb-[32px]">
            <FormLabel className="uppercase w-full">
              How many locations does the business have?
            </FormLabel>
            <FormSelect
              id="no-of-location"
              name="no-of-location"
              options={BUSINESS_TYPE_OPTIONS}
              rounded
              icon={<IconLocation />}
              placeholder="Select location"
              onChange={() => {}}
              onKeyDown={handleKeyDown}
            />
          </FormFieldset>
          <FormFieldset className="mb-[32px]">
            <FormLabel
              className="uppercase w-full"
              htmlFor="audience_age_range"
            >
              Target Audience
            </FormLabel>
            <div className="flex gap-4 justify-between items-center">
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
              />
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
              />
              <FormSelect
                id="audience_location"
                name="audience_location"
                options={[]}
                rounded
                icon={<IconLocation />}
                placeholder="Location"
                onKeyDown={handleKeyDown}
                onChange={(option) =>
                  onChange("audience_location", option?.value)
                }
                value={[].find((ele) => ele.value === audience_location)}
              />
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
            />
          </FormFieldset>
        </form>
      </Dialog>
    </>
  );
};

export default ManagePreference;
