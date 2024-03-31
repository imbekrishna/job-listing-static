export interface Job {
  id: string;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  skills: string[];
  refUserId: string;
  aboutCompany: string;
  aboutPosition: string;
  additionalInfo?: string;
}

export interface CreateJob extends Omit<Job, "id" | "postedAt"> {}

export enum PermissionFlag {
  BASIC_PERMISSION = 1,
  PAID_PERMISSION = 2,
  RECRUITER_PERMISSION = 4,
  ADMIN_PERMISSION = 8,
  ALL_PERMISSION = 2147483647,
}
