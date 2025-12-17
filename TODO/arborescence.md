src/
├── app/                           ← Routes (App Router)
│   ├── layout.tsx                 ← Layout global (header, footer, transitions)
│   ├── error.tsx                  ← Page d’erreur globale
│   ├── loading.tsx                ← Page de loading globale
│   ├── not-found.tsx              ← Page 404 globale
│   ├── page.tsx                   ← Page d’accueil (/)
│   ├── profile/
│   │   ├── layout.tsx             ← Layout spécifique profil (sidebar)
│   │   └── page.tsx               ← Page principale profil (/profile)
│   ├── project/
│   │   └── page.tsx               ← Page projet (/project)
│   └── settings/
│       └── page.tsx               ← Page paramètres (/settings)
│
├── features/                      ← Logique métier (fonctionnalités)
│   ├── profile/
│   │   ├── components/
│   │   │   ├── ProfileCard.tsx
│   │   │   └── EditProfileForm.tsx
│   │   ├── hooks/
│   │   │   └── useProfileData.ts
│   │   └── services/
│   │       └── profileService.ts
│   │
│   └── project/
│       ├── components/
│       │   └── ProjectList.tsx
│       └── services/
│           └── projectService.ts
│
├── components/                   ← Composants UI génériques
│   ├── ui/
│   │   ├── StatusLayout.tsx       ← Layout réutilisable pour error/loading/404
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Spinner.tsx
│   └── Navbar.tsx
│
├── lib/                           ← Helpers/utilitaires
│   ├── fetch.ts                   ← wrapper fetch ou API client
│   └── auth.ts                    ← gestion auth (cookies, tokens)
│
├── types/                         ← Types TypeScript
│   ├── user.ts
│   └── project.ts
│
└── styles/
    └── globals.css





//? ____________________________________________________________________________


features/
└── auth/
    ├── components/
    │   ├── LoginForm.tsx
    │   ├── SignupForm.tsx
    │   └── LogoutButton.tsx
    ├── hooks/
    │   └── useAuth.ts         ← gérer l’état de l’utilisateur côté client
    └── services/
        ├── login.ts
        ├── signup.ts
        └── logout.ts
app/
├── layout.tsx                 ← header + nav + bouton login/logout
├── login/
│   └── page.tsx               ← route /login (page dédiée)
└── signup/
    └── page.tsx               ← route /signup
