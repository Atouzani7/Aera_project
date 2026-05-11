import { warn } from "console";

export const buttonStyles = {
    // 🔵 ACTION PRINCIPALE (Ajouter / Create / Primary CTA)
    add: `
h-10 px-4 rounded-full
bg-gradient-to-r from-cyan-500/10 to-violet-500/10
border border-white/10
text-black/85
hover:bg-white/15
hover:text-white
transition-all duration-200
flex items-center gap-2
focus-visible:ring-2 focus-visible:ring-white
focus-visible:ring-offset-2 focus-visible:ring-black
`,

    // 🟢 VALIDATION (submit / confirm / success action)
    validate: `
        h-10 px-4 rounded-full

        bg-emerald-500/10
        border border-emerald-500/20
        text-black-300 font-medium

        hover:bg-emerald-500/20
        hover:text-black-200
        hover:border-emerald-500/30

        transition-all duration-200

        flex items-center justify-center gap-2

        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-emerald-400
        focus-visible:ring-offset-2 focus-visible:ring-black
    `,

    // ⚪ ANNULER / SECONDARY ACTION
    cancel: `
        h-10 px-4 rounded-full

        bg-white/5
        border border-white/10
        text-white/70

        hover:bg-white/10
        hover:text-white

        transition-all duration-200

        flex items-center justify-center gap-2

        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-white/30
        focus-visible:ring-offset-2 focus-visible:ring-black
    `,

    // 🔴 DANGER (logout / delete / destructive action)
    danger:
        `
h-10 px-4 rounded-full

bg-red-500/10
border border-red-500/20
text-black-300

hover:bg-red-500/20
hover:text-black-200
hover:border-red-500/30

transition-all duration-200

flex items-center gap-2

focus-visible:outline-none
focus-visible:ring-2 focus-visible:ring-red-400
focus-visible:ring-offset-2 focus-visible:ring-black
`
    ,
    // 🧊 OPTIONNEL (neutral button / low emphasis)
    ghost: `
        h-10 px-4 rounded-full

        bg-transparent
        text-white/70

        hover:bg-white/5
        hover:text-white

        transition-all duration-200

        flex items-center justify-center gap-2

        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-white/20
        focus-visible:ring-offset-2 focus-visible:ring-black
    `,


    // 🟠 ORANGE PASTEL (warning / action importante douce / highlight)
    warning: `
        h-10 px-4 rounded-full

        bg-orange-400/20
        border border-orange-400/20
        text-black-200

        hover:bg-orange-400/20
        hover:text-orange-100
        hover:border-orange-300/30

        transition-all duration-200

        flex items-center justify-center gap-2

        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-orange-300
        focus-visible:ring-offset-2 focus-visible:ring-black
    `,
}