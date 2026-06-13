import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AnimatedBackgroundLight from "@/components/AnimatedBackgroundLight";
import ProductDetailClient from "@/components/ProductDetailClient";
import { productService } from "@/services/productService";
import { getAssetUrl } from "@/config/apiConfig";

export const metadata = {
  title: "Product Detail",
  description: "ACE Sports Tech — Premium Sports Infrastructure Products",
};

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  let productData = null;
  
  try {
    // We fetch the product by ID, then fetch all images and specs to filter.
    // In a fully optimized API, the getById would return images and specs joined.
    // Assuming we need to fetch them separately based on the standard pattern here:
    const [productRes, imagesRes, specsRes] = await Promise.all([
      productService.getProductById(id),
      productService.getAllProductImages(),
      productService.getAllProductSpecifications(),
    ]);

    const product = productRes.data;

    if (product) {
      const allImages = imagesRes.data || [];
      const allSpecs = specsRes.data || [];

      const productImages = allImages
        .filter((img) => 
          String(img.productInventoryId) === String(product.productInventoryId) || 
          (img.sku && product.skuName && img.sku === product.skuName)
        )
        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
        .map((img) => getAssetUrl(img.inventoryImageName));



      const productSpecs = allSpecs.filter(
        (spec) => String(spec.productInventoryId) === String(product.productInventoryId)
      );

      productData = {
        ...product,
        mrp: Number(product.mrp) || Number(product.rlp) || 0,
        salePrice: Number(product.salePrice) || Number(product.dlp) || Number(product.mrp) || Number(product.rlp) || 0,
        discountPrice: Number(product.discountPrice) || 0,
        images: productImages,
        specifications: productSpecs,
      };
    }
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 relative">
      <AnimatedBackgroundLight />
      <div className="absolute inset-0 grid-pattern-light opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 lg:px-10 relative z-10">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 uppercase tracking-wider hover:text-slate-900 transition-colors">
            <ArrowLeft size={16} /> Back to Catalog
          </Link>
        </div>

        <ProductDetailClient product={productData} />

      </div>
    </div>
  );
}
