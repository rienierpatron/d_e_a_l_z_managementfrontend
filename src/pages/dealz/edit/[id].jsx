import DealzBuilder from "@/components/DealzBuilder";
import { useRouter } from "next/router";

const EditDealz = () => {
  const router = useRouter();
  return <DealzBuilder dealzId={router.query.id} mode="edit" />;
};

export default EditDealz;
