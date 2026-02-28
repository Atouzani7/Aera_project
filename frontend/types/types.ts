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

export type { Project, Workspace, UserWorkspacesQuery };
