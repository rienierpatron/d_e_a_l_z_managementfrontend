import Button from "@/components/Button";
import FormFieldset from "@/components/FormFieldset";
import FormInput from "@/components/FormInput";
import FormLabel from "@/components/FormLabel";

const ComponentPreview = () => {
  return (
    <>
      <div className="flex items-center gap-4">
        <Button>Click Here</Button>
        <Button outlined>Click Here</Button>
        <Button isRound>Click Here</Button>
        <Button isRound disabled>
          Disabled
        </Button>
      </div>
      <div className="mt-[20px]">
        <FormFieldset>
          <FormLabel required>Full Name</FormLabel>
          <FormInput fullWidth rounded />
        </FormFieldset>
        <FormFieldset>
          <FormLabel required>Full Name</FormLabel>
          <FormInput fullWidth rounded />
        </FormFieldset>
      </div>
    </>
  );
};

export default ComponentPreview;
