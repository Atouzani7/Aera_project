export type Route = {
  pathname: string;
  title: string;
  protected: Protected;
};

export type Protected = "ADMIN" | "PRIVATE" | "PUBLIC";

export const routes: { [key: string]: Route } = {
  home: {
    pathname: "/",
    title: "Accueil",
    protected: "PUBLIC",
  },
  login: {
    pathname: "/auth/login",
    title: "Connexion",
    protected: "PUBLIC",
  },
  logout: {
    pathname: "/auth/logout",
    title: "Déconnexion",
    protected: "PUBLIC",
  },
  register: {
    pathname: "/auth/register",
    title: "Créer un compte",
    protected: "PUBLIC",
  },
  admin: {
    pathname: "/admin",
    title: "Admin",
    protected: "ADMIN",
  },
  "my-profile": {
    pathname: "/profile/my-profile",
    title: "Votre compte",
    protected: "PRIVATE",
  },
  profile: {
    pathname: "/profile",
    title: "Profil utilisateur",
    protected: "PRIVATE",
  },
  workspace: {
    pathname: "/workspace",
    title: "Workspace",
    protected: "PRIVATE",
  },
  project: {
    pathname: "/project",
    title: "Projet",
    protected: "PRIVATE",
  },
  "create-project": {
    pathname: "/project/publish",
    title: "Créer un projet",
    protected: "PRIVATE",
  },
  journey: {
    pathname: "/journey",
    title: "Trajet",
    protected: "PUBLIC",
  },
  error: {
    pathname: "/error",
    title: "Erreur",
    protected: "PUBLIC",
  },
  paymentWaiting: {
    pathname: "/payment/waiting",
    title: "Payment waiting",
    protected: "PRIVATE",
  },
  "project comment": {
    pathname: "/comment/project",
    title: "Project comment",
    protected: "PRIVATE",
  },
  "step comment": {
    pathname: "/comment/step",
    title: "Step comment",
    protected: "PRIVATE",
  },
  "workspace comment": {
    pathname: "/workspace/comment",
    title: "Workspace comment",
    protected: "PRIVATE",
  },
};
