export type GalleryCardProps = {
  image_url: string;
  title: string;
  category: string | undefined | null;
  culture: string | undefined | null;
  period: string | undefined | null;
  material: string | undefined | null;
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
