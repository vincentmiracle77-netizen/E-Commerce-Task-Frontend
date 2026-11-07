import HeroBanner from "@/components/home/HeroBanner";
import Navbar from "@/components/layout/Navbar";
import TopBar from "@/components/layout/TopBar";
import ProductListing from "@/components/product/ProductListing";
import { products } from "@/data/products";

export default function Home() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <HeroBanner />
        <ProductListing products={products} />
      </main>
    </>
  );
}
