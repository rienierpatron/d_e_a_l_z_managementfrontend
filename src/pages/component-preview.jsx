import BackNavigation from "@/components/BackNavigation";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import FormFieldset from "@/components/FormFieldset";
import FormInput from "@/components/FormInput";
import FormLabel from "@/components/FormLabel";
import FormRadio from "@/components/FormRadio";
import FormSelect from "@/components/FormSelect";
import FormTextArea from "@/components/FormTextArea";
import PopoverMenu from "@/components/PopoverMenu";
import Typography from "@/components/Typography";
import { useState } from "react";

const ComponentPreview = () => {
  const [open, setOpen] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const menuItems = [
    {
      icon: "/file.svg",
      label: "Edit",
      onClick: () => console.log("Edit clicked"),
    },
    {
      icon: "/file.svg",
      label: "Delete",
      onClick: () => console.log("Delete clicked"),
    },
  ];

  return (
    <>
      <div className="flex items-center gap-4">
        <Button variant="primary">Click Here</Button>
        <Button variant="primary" outlined>
          Click Here
        </Button>
        <Button variant="primary" isRound>
          Click Here
        </Button>
        <Button variant="primary" isRound disabled>
          Disabled
        </Button>
      </div>
      <div className="mt-[20px]">
        <FormFieldset>
          <FormLabel required>Full Name</FormLabel>
          <FormInput
            fullWidth
            rounded
            placeholder="Enter text"
            icon="/file.svg"
          />
        </FormFieldset>

        <FormFieldset>
          <FormLabel>Address</FormLabel>
          <FormTextArea placeholder="Enter text" />
        </FormFieldset>

        <FormFieldset>
          <FormSelect
            icon="/file.svg"
            options={[
              { label: "United State", value: "US" },
              { label: "India", value: "IN" },
              { label: "Hong Kong", value: "Hk" },
            ]}
            rounded
            placeHolder="Countries"
            onChange={(option) => {}}
          />
        </FormFieldset>

        <FormFieldset>
          <FormRadio id="test" label="Click Here" />
        </FormFieldset>
      </div>
      <BackNavigation text="Go back" />
      <Typography variant="title">Typography</Typography>
      <Typography variant="subtitle">Typography</Typography>
      <Typography variant="heading">Typography</Typography>
      <Typography variant="body">Typography</Typography>
      <Typography variant="caption">Typography</Typography>
      <br />
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Click Me
      </Button>
      <Dialog
        show={open}
        onClose={() => setOpen(false)}
        header={
          <>
            <Typography variant="title">Heading</Typography>
            <Typography variant="body" className="!text-dark-gray mt-[10px]">
              Sub Heading
            </Typography>
          </>
        }
        footer={<Button variant="primary">Click Here</Button>}
      >
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            With less than a month to go before the European Union enacts new
            consumer privacy laws for its citizens, companies around the world
            are updating their terms of service agreements to comply.
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            The European Union’s General Data Protection Regulation (G.D.P.R.)
            goes into effect on May 25 and is meant to ensure a common set of
            data rights in the European Union. It requires organizations to
            notify users as soon as possible of high-risk data breaches that
            could personally affect them.
          </p>
        </div>
      </Dialog>
      <br />
      <PopoverMenu
        menuItems={menuItems}
        arrow={false}
        show={showPopover}
        onClose={() => setShowPopover(false)}
      >
        <Button onClick={() => setShowPopover(true)}>Click Me</Button>
      </PopoverMenu>
    </>
  );
};

export default ComponentPreview;
