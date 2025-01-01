/**
 * External dependencies
 */
import Head from "next/head";
import { useRouter } from "next/router";

/**
 * Internal dependencies
 */
import { ROUTES_HEADING_MAPPER } from "@/lib/routes";

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
