export interface Blog {
  id?: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  featured_image: string;
  blogcategoryId?: number | null;
  blogCategoryName?: string | null;
  metaTitle?: string | null;
  canonicalUrl?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  authorName?: string | null;
  authorRole?: string | null;
  authorBio?: string | null;
  authorImg?: string | null;
  publishDate?: string | null;
  readTime?: string | null;
  tags?: string | null;
  is_active?: boolean;
  remark?: string | null;
  created_by?: string;
  createdAt?: string;
  updatedAt?: string;
}
