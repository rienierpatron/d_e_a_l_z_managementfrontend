import DealzBuilder from "@/components/DealzBuilder";
import { useRouter } from "next/router";

const ViewDealz = () => {
  const router = useRouter();
  return <DealzBuilder dealzId={router.query.id} mode="view" />;
};

export default ViewDealz;
