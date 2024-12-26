import { ROUTES_HEADING_MAPPER } from "@/lib/routes";
import Head from "next/head";
import { useRouter } from "next/router";

const DocumentHead = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <Head>
      <title>{ROUTES_HEADING_MAPPER[pathname]}</title>
    </Head>
  );
};

export default DocumentHead;
