export type GalleryCardProps = {
  id?: string | number;
  image_url: string;
  title: string;
  category: string | undefined | null;
  culture: string | undefined | null;
  period: string | undefined | null;
  material: string | undefined | null;
};

export type MetGalleryProps = {
  objectID: number;
  primaryImageSmall: string;
  title: string;
  classification: string | null;
  culture: string | null;
  period: string | null;
  medium: string | null;
};

export interface ProductProps extends GalleryCardProps {
  id: string;
  description: string | null;
}

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
