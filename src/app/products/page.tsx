import React from "react";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import AnimatedBackgroundLight from "@/components/AnimatedBackgroundLight";
import AnimatedBackground from "@/components/AnimatedBackground";
import ProductsClient from "@/components/ProductsClient";
import { productService } from "@/services/productService";
import { getAssetUrl } from "@/config/apiConfig";
import { ProductInventory, InventoryImage, InventorySpecification } from "@/types/product";

export const metadata = {
  title: "Products",
  description: "ACE Sports Tech — Premium Sports Infrastructure Products",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  // Fetch data concurrently from the backend API
  let rawProducts: ProductInventory[] = [];
  let allImages: InventoryImage[] = [];
  let allSpecs: InventorySpecification[] = [];

  try {
    const [productsRes, imagesRes, specsRes] = await Promise.all([
      productService.getAllProducts(),
      productService.getAllProductImages(),
      productService.getAllProductSpecifications(),
    ]);

    rawProducts = productsRes.data || [];
    allImages = imagesRes.data || [];
    allSpecs = specsRes.data || [];
  } catch (error) {
    console.error("Failed to fetch products data:", error);
    // If backend is down, we could fallback to mock data here if needed.
  }

  // Construct dynamic products array
  const dynamicProducts = rawProducts.map((product) => {
    // Attach multiple images
    const productImages = allImages
      .filter((img) => 
        String(img.productInventoryId) === String(product.productInventoryId) || 
        (img.sku && product.skuName && img.sku === product.skuName)
      )
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      .map((img) => getAssetUrl(img.inventoryImageName));



    // Attach specifications
    const productSpecs = allSpecs.filter(
      (spec) => String(spec.productInventoryId) === String(product.productInventoryId)
    );

    return {
      productInventoryId: product.productInventoryId?.toString(),
      productName: product.productName || "Unknown Product",
      brandName: product.brandName || "Generic",
      modelName: product.modelName || "Standard",
      categoryName: product.categoryName || "Uncategorized",
      description: product.description || product.shortDescription || "",
      mrp: Number(product.mrp) || Number(product.rlp) || 0,
      salePrice: Number(product.salePrice) || Number(product.dlp) || Number(product.mrp) || Number(product.rlp) || 0,
      discountPrice: Number(product.discountPrice) || 0,
      images: productImages,
      specifications: productSpecs.length > 0 ? productSpecs : [
        { variationTypeName: "Standard", variationName: "Basic configuration" }
      ],
    };
  });

  return (
    <>
      <Hero
        variant="page"
        eyebrow="Products & Materials"
        headline="Premium Sports Infrastructure Products"
        subheadline="Certified high-performance surfaces, lighting and technology products — all with professional installation."
        ctaPrimary={{ label: "View Catalog", href: "#catalog" }}
        imageSrc="/services/turf.png"
      />

      <section id="catalog" className="relative section-pad overflow-hidden bg-slate-50">
        <AnimatedBackgroundLight />
        <div className="absolute inset-0 grid-pattern-light opacity-50 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
          <SectionHeading eyebrow="Our Products" title="E-Commerce Catalog" subtitle="Globally certified materials ready to be deployed for your projects." theme="light" />
          
          <ProductsClient products={dynamicProducts} />
          
        </div>
      </section>

      {/* Why our products */}
      <section className="relative section-pad overflow-hidden" style={{ background: "linear-gradient(135deg, #0B1F3A 0%, #09090b 100%)" }}>
        <AnimatedBackground />
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
        <div className="neon-line absolute top-0 left-0 right-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
          <SectionHeading eyebrow="Why Our Products" title="Certified Materials, Expert Installation" subtitle="Every product sourced from internationally certified manufacturers and installed by trained specialists." align="center" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.04)" }}>
            {[
              { title: "Globally Certified", desc: "FIFA, IAAF, FIBA, ITF certification as applicable.", color: "#007AFF" },
              { title: "Warranty Backed", desc: "Manufacturer warranties and our installation guarantee.", color: "#007AFF" },
              { title: "Expert Installation", desc: "Supplied and installed by our trained technical teams.", color: "#007AFF" },
              { title: "Ongoing Support", desc: "Post-installation maintenance and on-call technical support.", color: "#BF5AF2" },
            ].map((item) => (
              <div key={item.title} className="p-8 text-center group" style={{ background: "#09090b" }}>
                <div className="w-2 h-2 rounded-full mx-auto mb-5" style={{ background: item.color, boxShadow: `0 0 10px ${item.color}` }} />
                <h3 className="font-display font-bold text-white text-sm uppercase tracking-wide mb-2">{item.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Need a Product Catalogue?"
        subtitle="Contact us for full catalogue, technical specs and pricing for your project."
        ctaLabel="Request Catalogue"
        ctaHref="/contact"
        secondaryLabel="Our Services"
        secondaryHref="/services"
      />
    </>
  );
}
