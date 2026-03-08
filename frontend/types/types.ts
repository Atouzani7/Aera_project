type Project = {
  id: string;
  name: string;
  description: string;
  deadline: string;
  status: string;
  tag?: string;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  Notion_id?: string;
  GDriveId?: string;
  avatar?: string;
  step: {
    id: string;
    name: string;
    description: string;
    status: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

type Workspace = {
  id: string;
  name: string;
  users: {
    email: string;
    id: string;
    lastname: string;
  }[];
  projects: Project[];
};

type UserWorkspacesQuery = {
  userWorkspaces: Workspace[];
};

type StepsByProjectQuery = {
  stepsByProject: {
    createdAt: string;
    description: string;
    endDate: string;
    id: string;
    name: string;
    status: string;
    updatedAt: string;
  }[];
};

export type { Project, Workspace, UserWorkspacesQuery, StepsByProjectQuery };
