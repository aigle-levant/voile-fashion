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
