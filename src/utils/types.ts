export interface Job {
  id: number;
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
  aboutCompany: string;
  aboutPosition: string;
  additionalInfo?: string;
}

export interface CreateJob extends Omit<Job, "id" | "postedAt"> {}
