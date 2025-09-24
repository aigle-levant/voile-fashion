export type GalleryCardProps = {
  id?: string | number;
  image_url: string;
  title: string;
  category: string | undefined | null;
  culture: string | undefined | null;
  period: string | undefined | null;
  material: string | undefined | null;
};

export type ProductProps = {
  id: string;
  title: string;
  image_url: string;
  category?: string | null;
  culture?: string | null;
  period?: string | null;
  material?: string | null;
  description?: string | null;
};

export type MetGalleryProps = {
  objectID: number;
  primaryImageSmall: string;
  title: string;
  classification: string | null;
  culture: string | null;
  period: string | null;
  medium: string | null;
  creditLine: string | null;
};

export type GalleryRow = {
  met_object_id: number;
  title: string;
  image_url: string;
  category: string | null;
  culture: string | null;
  period: string | null;
  material: string | null;
  description: string | null;
};

export type CollapsibleProps = {
  query: string;
  content: React.ReactNode;
};

// filters
export type Filters = {
  category: string[];
  culture: string[];
  material: string[];
  period: [number, number];
};

export type FilterGalleryProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};
