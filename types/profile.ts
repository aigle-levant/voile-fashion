export type ProfileProps = {
  username: string;
  name: string;
  bio: string;
  photoUrl: string;
  email: string;
};

export interface ProfileDetailsProps {
  email: string | undefined;
  username: string | null;
}
