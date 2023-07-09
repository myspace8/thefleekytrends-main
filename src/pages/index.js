import SexLink from "@/components/sexLink";
import TrendingProducts from "@/components/trendingProducts";

export default function Home() {
  return (
    <>
      <div className="mt-2 lg:m-8 p-2 bg-white shadow-md rounded-sm">
        <SexLink />
      </div>
      <div className="flex justify-center">
        <div></div>
      </div>
      <div className="mt-2 lg:m-8 bg-white rounded-sm">
        <TrendingProducts />
      </div>
    </>
  );
}