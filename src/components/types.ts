declare global {
    interface Window {
        macondo: {
            homepagethingObserver?: MutationObserver
            landerObserver?: MutationObserver
        }
    }
}

export type Project = {
    id?: string | number | null
    name?: string | null
    author?: string | null
    description?: string | null
    status?: string | null
    type?: string | null
    level?: string | number | null
    votes?: string | number | null
    upvotes?: string | number | null
    image?: string | null
    thumbnail_url?: string | null
    pfp?: string | null
    fruit?: string | null
    stage?: string | number | null
    has_shipped?: boolean | null
    project_streak_days?: string | number | null
}

export type Information = {
    user: {
        name: string
        pfp: string
        id?: string
    }
    projects: Project[]
}

export type GameWorldState = {
    hidden: boolean
    opacity: string
    pointerEvents: string
}
