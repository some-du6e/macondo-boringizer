import { defaultProfilePfp } from "./consts.ts" 
import type { Information, Project } from "./types"
import { doTopbarstuff } from "./topbar.ts"
export function getInfo(didTryGetInfo: boolean, information: Information, didLoadProjects: boolean, onProjectsLoaded?: () => void): Information {
        didTryGetInfo = true
        let info: Information = {
            "user": {
                "name": "not found",
                "pfp": defaultProfilePfp,
                "id": "not found"
            },
            "projects": []
        }

        function findImageUrl(value: unknown): string | null {
            if (!value) { return null }
            if (typeof value === "string") {
                if (/^https?:\/\/.+\.(webp|png|jpe?g|gif)(\?.*)?$/i.test(value) || value.includes("cachet.dunkirk.sh") || value.includes("l4.dunkirk.sh")) {
                    return value
                }
                return null
            }
            if (Array.isArray(value)) {
                for (let item of value) {
                    let found: string | null = findImageUrl(item)
                    if (found) { return found }
                }
                return null
            }
            if (typeof value === "object") {
                let likelyKeys = ["pfp", "avatar", "avatarUrl", "avatar_url", "image", "imageUrl", "image_url", "photo", "photoUrl", "photo_url", "picture"]
                let record = value as Record<string, unknown>
                for (let key of likelyKeys) {
                    let found: string | null = findImageUrl(record[key])
                    if (found) { return found }
                }
                for (let key of Object.keys(record)) {
                    let found: string | null = findImageUrl(record[key])
                    if (found) { return found }
                }
            }
            return null
        }

        fetch("/api/auth/me", { credentials: "include" })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("auth/me returned " + response.status)
                }
                return response.json()
            })
            .then(function (userInfo: Record<string, unknown>) {
                info.user.name = typeof userInfo.name === "string" ? userInfo.name : info.user.name
                info.user.id = typeof userInfo.id === "string" ? userInfo.id : info.user.id
                info.user.pfp = findImageUrl(userInfo) || info.user.pfp
                
            
                doTopbarstuff(info)
                if (!info.user.id || info.user.id === "not found") {
                    throw new Error("auth/me did not return user id")
                }
                return fetch(`api/projects`, { credentials: "include" })
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("api/projects returned " + response.status)
                }
                return response.json()
            })
            .then(function(projectsData: Project[]) {
                info.projects = projectsData || []
                didLoadProjects = true
                information.user = info.user
                information.projects = info.projects
                if (onProjectsLoaded) { onProjectsLoaded() }
            })
            .catch(function(error) {
                console.warn("macondo: could not fetch profile/projects info; using default", error)
                information.user = info.user
                information.projects = info.projects
                doTopbarstuff(information)
            })

        console.log(info)
        return info
    }
