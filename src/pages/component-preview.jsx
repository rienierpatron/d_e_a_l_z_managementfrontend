import BackNavigation from "@/components/BackNavigation";
import Button from "@/components/Button";
import FormFieldset from "@/components/FormFieldset";
import FormInput from "@/components/FormInput";
import FormLabel from "@/components/FormLabel";
import Typography from "@/components/Typography";

const ComponentPreview = () => {
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
          <FormInput fullWidth rounded />
        </FormFieldset>
      </div>
      <BackNavigation text="Go back" />
      <Typography variant="title">Typography</Typography>
      <Typography variant="subtitle">Typography</Typography>
      <Typography variant="heading">Typography</Typography>
      <Typography variant="body">Typography</Typography>
      <Typography variant="caption">Typography</Typography>
    </>
  );
};

export default ComponentPreview;
