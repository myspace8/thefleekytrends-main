import Layout from "@/components/layout";
import SexLink from "@/components/sexLink";
import TrendingProducts from "@/components/trendingProducts";

export default function Home() {
  return (
    <>
    <Layout>
        <div className="">
          <SexLink />
        </div>
        <div className="flex justify-center">
          <div></div>
        </div>
        <div className="mt-2 lg:m-8 bg-white rounded-sm">
          <TrendingProducts />
        </div>
    </Layout>
    </>
  );
}