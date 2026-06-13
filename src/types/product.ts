export interface ProductInventory {
  productInventoryId: number;
  productIdentity?: string | null;
  productBarCode?: string | null;
  productName?: string | null;
  modelId?: number | null;
  modelName?: string | null;
  vendorId?: number | null;
  vendorName?: string | null;
  warehouseId?: number | null;
  warehouseName?: string | null;
  hsnId?: number | null;
  hsnCode?: string | null;
  brandId?: number | null;
  brandName?: string | null;
  categoryGroupId?: number | null;
  categoryGroupName?: string | null;
  categoryId?: number | null;
  categoryName?: string | null;
  subCategoryId?: number | null;
  subCategoryName?: string | null;
  unitId?: number | null;
  unitName?: string | null;
  statusId?: number | null;
  statusName?: string | null;
  mrp?: number | string | null;
  purchasePrice?: number | string | null;
  discountPrice?: number | string | null;
  otherChargesPrice?: number | string | null;
  salePrice?: number | string | null;
  displayPrice?: number | string | null;
  b2bPrice?: number | string | null;
  b2cPrice?: number | string | null;
  productLifeCycle?: string | null;
  productPopularity?: string | null;
  priceElasticity?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  [key: string]: any; // Allow common fields
}

export interface InventoryImage {
  inventoryImageId: number;
  productInventoryId: number;
  inventoryImageName?: string | null;
  sortOrder?: number | null;
  [key: string]: any;
}

export interface InventorySpecification {
  inventorySpecificationId: number;
  productInventoryId: number;
  variationTypeId?: number | null;
  variationTypeName?: string | null;
  variationId?: number | null;
  variationName?: string | null;
  [key: string]: any;
}
