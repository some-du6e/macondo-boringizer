// https://game.hackclub.com/me?projectId=1506#larp_review

function larpReview() {
    if (location.pathname !== "/me") { return }
    const queryParams = new URLSearchParams(window.location.search);
    let projectidtoview = Object.fromEntries(queryParams).projectId
    let isViewHash = location.hash.startsWith("#larp_review")
    if (!isViewHash) { return }
    console.log("HCTG+: larpReview running")
    window.HCTG = window.HCTG || {}



    function prepareforcustomsite(titlee, gubby) {
        // change title
        let title = document.getElementsByClassName("text-[48px] font-bold tracking-[-0.06em] text-nowrap text-white smoothing-white")[0]
        if (!title) {
            console.warn("HCTG: could not find project title div! prob not on the project page ID: 9s8f7g")
            return null
        }
        title.textContent = titlee

        // add subtitle
        let ohiogubby = title.parentElement.parentElement.parentElement

        console.log(ohiogubby)
        ohiogubby.innerHTML = `
        <div class="relative flex h-full  items-center px-10 md:px-16 z-10 shrink-0 bg-[#0f0f0f]"><span class="text-[48px] font-bold tracking-[-0.06em] text-nowrap text-white smoothing-white">${titlee}</span></div><div class="h-full w-8 -translate-x-px z-10 shrink-0 bg-[#0f0f0f]" style="clip-path: polygon(100% 50%, 0% 0%, 0% 100%);"></div></div><div class="flex h-full"><div class="relative flex h-full min-w-xl items-center px-10 md:px-16 !-translate-x-8 z-0 bg-[#fecb0d]"><span class="text-[48px] font-bold tracking-[-0.06em] text-nowrap text-black smoothing-black">${gubby}</span></div><div class="h-full w-8 -translate-x-px !-translate-x-8 z-0 bg-[#fecb0d]" style="clip-path: polygon(100% 50%, 0% 0%, 0% 100%);"></div>`

        let oldcontent = document.getElementsByClassName("grid grid-cols-1 md:grid-cols-2")[0]
        if (!oldcontent) {
            console.warn("HCTG: could not find old content container. ID: 4jv1mn")
            return null
        }
        oldcontent.remove()

        let containerx = document.getElementsByClassName("relative -ml-2 h-screen w-full flex-1 overflow-y-scroll px-6 py-10")[0]
        if (!containerx) {
            console.warn("HCTG: could not find page container. ID: a2q7kp")
            return null
        }
        // let container = document.createElement("div")
        // container.className = "flex flex-col gap-10 px-6 py-8 xl:px-24 xl:py-16"
        // containerx.appendChild(container)
        return containerx
    }

    function formattime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        const formatted = `${hours}h ${minutes}m`;
        return formatted // shi prob in 3 different components lowkey
    }
    
    function buildViewableLink(projecto) {
        let result = JSON.stringify(projecto)
        result = encodeURIComponent(result)
        
        return `/me?projectobj=${result}#view`
    }

    function randomnumber(min, max) {
      const minCeiled = Math.ceil(min);
      const maxFloored = Math.floor(max);
      return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }

    function generateRandomString(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    if (!projectidtoview) {
        alert("What are you doing buddy?")
        return
    }



    let fakequeue = [
        {
            "id": 1171,
            "aasm_state": "approved",
            "approved_at": "2026-04-22T20:28:08.293Z",
            "demo_link": "https://sloth-paper.netlify.app/",
            "desc": "its a gallery for a good wallpaper as i think i have good taste this website will have good wallpaper for you all to use [frontend]",
            "rejected_at": null,
            "repo_link": "https://github.com/speed987185/wallpaper-site",
            "submitted_at": "2026-04-04T03:12:48.763Z",
            "title": "Wallpaper gallery",
            "ysws": null,
            "created_at": "2026-03-25T11:08:22.182Z",
            "updated_at": "2026-04-22T20:28:08.312Z",
            "user_id": 2122,
            "high_quality": false,
            "ai_declaration": null,
            "reported_seconds": 81067,
            "total_seconds": null,
            "approved_seconds": 80921,
            "real_approved_seconds": 37728,
            "hackatime_projects": [
                12008
            ],
            "tags": [
                3
            ],
            "status": "Approved on 2026-04-22",
            "unread_notification_count": 0,
            "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NzcwLCJwdXIiOiJibG9iX2lkIn19--bc5a4083a9c159a9b93b60150bf1675410b0c4df/Screenshot%202026-04-04%20080646.png?disposition=inline",
            "username": "Sloth"
        },
        {
            "id": 1307,
            "aasm_state": "approved",
            "approved_at": "2026-04-22T20:20:54.312Z",
            "demo_link": "https://yt-download-7.vercel.app/",
            "desc": "A web application to convert YouTube videos to MP3 audio files and download/preview them.\r\n\r\nNotice: YouTube connection may be blocked in some environments. Run this project locally to use the converter. ",
            "rejected_at": "2026-04-03T14:41:12.204Z",
            "repo_link": "https://github.com/prasoonkandel/yt-download/",
            "submitted_at": "2026-04-03T16:22:39.739Z",
            "title": "YT Download",
            "ysws": null,
            "created_at": "2026-04-02T08:52:26.939Z",
            "updated_at": "2026-04-22T20:20:54.321Z",
            "user_id": 485,
            "high_quality": false,
            "ai_declaration": null,
            "reported_seconds": 34024,
            "total_seconds": null,
            "approved_seconds": 33067,
            "real_approved_seconds": 33066,
            "hackatime_projects": [
                12840
            ],
            "tags": [
                6
            ],
            "status": "Approved on 2026-04-22",
            "unread_notification_count": 0,
            "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NzMzLCJwdXIiOiJibG9iX2lkIn19--db2f64f18a426fc82c072f330bee5fb8a1fc1400/Screenshot%20From%202026-04-02%2014-14-52.png?disposition=inline",
            "username": "prasoon"
        },
        {
            "id": 1779,
            "aasm_state": "approved",
            "approved_at": "2026-04-22T15:43:24.440Z",
            "demo_link": "https://hexagrim.itch.io/crownrun",
            "desc": "A 2d local multiplayer game about stealing the crown and running around! Wait, that rhymed so hard..",
            "rejected_at": "2026-04-22T13:43:21.530Z",
            "repo_link": "https://github.com/Hexagrim/crownRun",
            "submitted_at": "2026-04-22T15:17:13.424Z",
            "title": "CrownRun",
            "ysws": null,
            "created_at": "2026-04-20T05:16:27.236Z",
            "updated_at": "2026-04-22T15:43:25.583Z",
            "user_id": 1809,
            "high_quality": true,
            "ai_declaration": "hell nah",
            "reported_seconds": 96389,
            "total_seconds": null,
            "approved_seconds": 96389,
            "real_approved_seconds": 96372,
            "hackatime_projects": [
                12883,
                15342
            ],
            "tags": [
                5
            ],
            "status": "Approved on 2026-04-22",
            "unread_notification_count": 0,
            "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTIxMCwicHVyIjoiYmxvYl9pZCJ9fQ==--fd01528b38c4e7d57c98801d859fe61c538d233f/image%20(11).png?disposition=inline",
            "username": "Hex4Gr1m"
        },
        {
            "id": 16,
            "aasm_state": "approved",
            "approved_at": "2026-04-22T14:52:24.606Z",
            "demo_link": "https://drive.google.com/file/d/1Vj2W_IdjWm1QoU6dn39CpRpPjZM7c3ed/view?usp=sharing",
            "desc": "social media simulator about addiction",
            "rejected_at": "2026-04-03T02:19:54.253Z",
            "repo_link": "https://github.com/PhyoTP/Scrollify",
            "submitted_at": "2026-04-22T02:30:25.154Z",
            "title": "Scrollify",
            "ysws": null,
            "created_at": "2026-01-18T01:34:18.137Z",
            "updated_at": "2026-04-22T14:52:24.613Z",
            "user_id": 66,
            "high_quality": false,
            "ai_declaration": "mostly human built with a bit of ai for a custom layout in the beginning and some debugging that didnt really help much anyways",
            "reported_seconds": 134920,
            "total_seconds": null,
            "approved_seconds": 134920,
            "real_approved_seconds": 134928,
            "hackatime_projects": [
                395
            ],
            "tags": [
                4
            ],
            "status": "Approved on 2026-04-22",
            "unread_notification_count": 0,
            "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NDE4LCJwdXIiOiJibG9iX2lkIn19--704d06b1549891cb9f6b26b58cd79fb8c6d1671c/Simulator%20Screenshot%20-%20iPad%20Pro%2013-inch%20(M5)%20-%202026-02-26%20at%2022.03.08.png?disposition=inline",
            "username": "thet pai"
        },
        {
            "id": 24,
            "aasm_state": "approved",
            "approved_at": "2026-04-21T21:13:55.253Z",
            "demo_link": "http://relay-l4oo.onrender.com",
            "desc": "RELAY is a simple chat app run on Flask and Flask-SocketIO. Users are allowed to create and join private \"rooms\" to hang out and talk with friends.",
            "rejected_at": "2026-03-10T06:49:57.169Z",
            "repo_link": "https://www.github.com/saquer916/RELAY",
            "submitted_at": "2026-03-29T13:39:32.127Z",
            "title": "RELAY",
            "ysws": null,
            "created_at": "2026-01-19T04:47:04.938Z",
            "updated_at": "2026-04-21T21:13:55.258Z",
            "user_id": 95,
            "high_quality": false,
            "ai_declaration": null,
            "reported_seconds": 19128,
            "total_seconds": null,
            "approved_seconds": 19128,
            "real_approved_seconds": 19126,
            "hackatime_projects": [
                525
            ],
            "tags": [
                3
            ],
            "status": "Approved on 2026-04-21",
            "unread_notification_count": 0,
            "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OTYsInB1ciI6ImJsb2JfaWQifX0=--ec8ba465529f73617236468c2bdfce1b16f75c2d/Screenshot%202025-12-27%20030530.png?disposition=inline",
            "username": "vihanr916"
        },
        {
            "id": 1447,
            "aasm_state": "approved",
            "approved_at": "2026-04-21T20:42:50.609Z",
            "demo_link": "https://tomatofu.itch.io/string-simulation",
            "desc": "A simulation of a string via multiple springs. The large amount of hours is because of multiple failed attempts; I was originally trying to use pendulums (MUCH HARDER) instead of springs.",
            "rejected_at": null,
            "repo_link": "https://github.com/tomatofoo/string-simulation",
            "submitted_at": "2026-04-13T09:39:17.996Z",
            "title": "String Simulation",
            "ysws": null,
            "created_at": "2026-04-07T21:09:54.986Z",
            "updated_at": "2026-04-21T20:42:50.617Z",
            "user_id": 1755,
            "high_quality": false,
            "ai_declaration": "",
            "reported_seconds": 60660,
            "total_seconds": null,
            "approved_seconds": 37411,
            "real_approved_seconds": 37404,
            "hackatime_projects": [
                14581,
                14602
            ],
            "tags": [
                6
            ],
            "status": "Approved on 2026-04-21",
            "unread_notification_count": 0,
            "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OTc3LCJwdXIiOiJibG9iX2lkIn19--ff1518dcdba79dae79825b2fd847f60557d04a60/CleanShot%202026-04-13%20at%2000.48.23@2x.png?disposition=inline",
            "username": "Tomatofu"
        },
        {
            "id": 1339,
            "aasm_state": "approved",
            "approved_at": "2026-04-21T20:42:11.570Z",
            "demo_link": "https://lightbox-beta.vercel.app/",
            "desc": "2d ray optic simulator where you play around with mirrors, lenses and prisms on a canvas and watch the beautiful rainbows they create",
            "rejected_at": null,
            "repo_link": "https://github.com/amarieidavid26-byte/lightbox",
            "submitted_at": "2026-04-03T16:30:57.572Z",
            "title": "Light box",
            "ysws": null,
            "created_at": "2026-04-03T16:29:53.889Z",
            "updated_at": "2026-04-21T20:42:11.583Z",
            "user_id": 1305,
            "high_quality": false,
            "ai_declaration": null,
            "reported_seconds": 36093,
            "total_seconds": null,
            "approved_seconds": 35852,
            "real_approved_seconds": 25200,
            "hackatime_projects": [
                12978
            ],
            "tags": [
                3
            ],
            "status": "Approved on 2026-04-21",
            "unread_notification_count": 0,
            "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NzYxLCJwdXIiOiJibG9iX2lkIn19--ab11b552e8c6ff9fafcdbe181d984ae2a5aa00f6/curcubeu.png?disposition=inline",
            "username": "amariei.david26"
        },
        {
            "id": 1167,
            "aasm_state": "approved",
            "approved_at": "2026-04-21T20:33:52.415Z",
            "demo_link": "https://github.com/aryanawati/FileAnalyzer/releases/tag/v1.0.0",
            "desc": "I'm resetting from the basics and learning from scratch, no more AI.\r\nThis is a Python Project that reads a text file, analyzes it, and returns information about it.",
            "rejected_at": "2026-03-25T21:09:56.683Z",
            "repo_link": "https://github.com/aryanawati/FileAnalyzer",
            "submitted_at": "2026-04-02T00:52:35.588Z",
            "title": "File Analyzer",
            "ysws": null,
            "created_at": "2026-03-25T00:32:36.229Z",
            "updated_at": "2026-04-21T20:33:52.422Z",
            "user_id": 2165,
            "high_quality": false,
            "ai_declaration": null,
            "reported_seconds": 18031,
            "total_seconds": null,
            "approved_seconds": 18031,
            "real_approved_seconds": 18032,
            "hackatime_projects": [
                11449
            ],
            "tags": [
                6
            ],
            "status": "Approved on 2026-04-21",
            "unread_notification_count": 0,
            "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NzMwLCJwdXIiOiJibG9iX2lkIn19--135501ef395325c427efb2e95ced475d6b29c93e/Screenshot%202026-04-01%20204039.png?disposition=inline",
            "username": "Aryan Awati"
        },
        {
            "id": 1773,
            "aasm_state": "approved",
            "approved_at": "2026-04-21T20:32:22.299Z",
            "demo_link": "https://hc-points-system.vercel.app/",
            "desc": "introducing the hack club honor system\r\n\r\na 3D website built-in for fun!",
            "rejected_at": null,
            "repo_link": "https://github.com/pizzalover125/hack-club-points",
            "submitted_at": "2026-04-21T03:32:02.703Z",
            "title": "3D Hack Club Honor System",
            "ysws": null,
            "created_at": "2026-04-20T02:51:49.053Z",
            "updated_at": "2026-04-21T20:32:22.309Z",
            "user_id": 1716,
            "high_quality": false,
            "ai_declaration": "",
            "reported_seconds": 5003,
            "total_seconds": null,
            "approved_seconds": 5003,
            "real_approved_seconds": 5004,
            "hackatime_projects": [
                17099
            ],
            "tags": [
                3
            ],
            "status": "Approved on 2026-04-21",
            "unread_notification_count": 0,
            "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTE2MSwicHVyIjoiYmxvYl9pZCJ9fQ==--c4335a9e8108e32015a45efd539075e63dfb613d/Screenshot%202026-04-19%20at%207.40.49%E2%80%AFPM.png?disposition=inline",
            "username": "adi // pizzalover125"
        },
        {
            "id": 1570,
            "aasm_state": "approved",
            "approved_at": "2026-04-21T20:20:22.366Z",
            "demo_link": "https://atharv-shukla-987.itch.io/help-the-princesss",
            "desc": "a platform game MADE USING GO DOT",
            "rejected_at": "2026-04-14T18:06:17.088Z",
            "repo_link": "https://github.com/Atharv-Shukla-987/Platformer_game_using_godot",
            "submitted_at": "2026-04-14T18:33:39.445Z",
            "title": "SAVE THE PRINCESS ( a platform game)",
            "ysws": null,
            "created_at": "2026-04-12T08:02:43.075Z",
            "updated_at": "2026-04-21T20:20:22.376Z",
            "user_id": 638,
            "high_quality": false,
            "ai_declaration": "DID NOT USE AI\r\nONLY USED BUILD IN FEATURES OF GODOT",
            "reported_seconds": 31005,
            "total_seconds": null,
            "approved_seconds": 31005,
            "real_approved_seconds": 31006,
            "hackatime_projects": [
                15330,
                15649
            ],
            "tags": [
                5
            ],
            "status": "Approved on 2026-04-21",
            "unread_notification_count": 0,
            "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OTc2LCJwdXIiOiJibG9iX2lkIn19--5210d8ef342ba78bcb04616e586517b7b27ae79e/Screenshot%202026-04-13%20124439.png?disposition=inline",
            "username": "OshoOshoOshawott"
        },
        {
            "id": 1465,
            "aasm_state": "approved",
            "approved_at": "2026-04-21T20:11:34.370Z",
            "demo_link": "https://ambassador.hackclub.com",
            "desc": "Hack Club 2026 Stardance Ambassador platform! This is my work on the dashboard & backend. Landing page by Gideon and Froppy. A next.js project",
            "rejected_at": null,
            "repo_link": "https://github.com/hackclub/ambassador",
            "submitted_at": "2026-04-18T00:53:22.119Z",
            "title": "HC Ambassador Platform",
            "ysws": null,
            "created_at": "2026-04-08T14:23:55.475Z",
            "updated_at": "2026-04-21T20:11:34.379Z",
            "user_id": 582,
            "high_quality": true,
            "ai_declaration": "This was an HQ project so I used Claude Code and Codex heavily. However, it is not vibecoded and it does not have gaping security holes, an AI looking design or AI generated assets.",
            "reported_seconds": 114765,
            "total_seconds": null,
            "approved_seconds": 99156,
            "real_approved_seconds": 99151,
            "hackatime_projects": [
                12980,
                16754
            ],
            "tags": [
                3
            ],
            "status": "Approved on 2026-04-21",
            "unread_notification_count": 0,
            "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTAyOSwicHVyIjoiYmxvYl9pZCJ9fQ==--688bfcb1ca72561637665b6948bc50ebc7f8fad5/Screenshot%202026-04-15%20at%205.03.16%E2%80%AFAM.png?disposition=inline",
            "username": "parth"
        },
        {
            "id": 1645,
            "aasm_state": "approved",
            "approved_at": "2026-04-21T20:07:53.277Z",
            "demo_link": "https://abishek-kk.itch.io/gamehubtemplate",
            "desc": "a game where you can play bunch of mini gamess  note: this is a template or protypee i will make my own games like from 100% scratch and creativity on V2 this project is just starter to it",
            "rejected_at": null,
            "repo_link": "https://github.com/speed987185/Mini-Game-Hub",
            "submitted_at": "2026-04-15T06:45:33.467Z",
            "title": "Mini-Game-Hub/Template V2",
            "ysws": null,
            "created_at": "2026-04-14T13:28:34.146Z",
            "updated_at": "2026-04-21T20:07:53.282Z",
            "user_id": 2122,
            "high_quality": false,
            "ai_declaration": "when i had error in code to figure out whats wrong most of the time letter mistake and wrong key written by mistake  and at last i used ziva to debug error ",
            "reported_seconds": 29474,
            "total_seconds": null,
            "approved_seconds": 28628,
            "real_approved_seconds": 28627,
            "hackatime_projects": [
                16149
            ],
            "tags": [
                5
            ],
            "status": "Approved on 2026-04-21",
            "unread_notification_count": 0,
            "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTAwOSwicHVyIjoiYmxvYl9pZCJ9fQ==--dd23c37937d5d131bd737068febf18f159a36728/Screenshot%202026-04-14%20191237.png?disposition=inline",
            "username": "Sloth"
        },
        {
            "id": 1214,
            "aasm_state": "approved",
            "approved_at": "2026-04-21T20:01:56.131Z",
            "demo_link": "https://fourier-orpheus.vercel.app/",
            "desc": "Drawing the Hack Club logo with 80 spinning circles using the Fourier series, animated in Manim.",
            "rejected_at": null,
            "repo_link": "https://github.com/mateivul/FourierOrpheus",
            "submitted_at": "2026-03-28T14:13:45.058Z",
            "title": "FourierOrpheus",
            "ysws": null,
            "created_at": "2026-03-28T13:26:11.099Z",
            "updated_at": "2026-04-21T20:01:57.452Z",
            "user_id": 1632,
            "high_quality": true,
            "ai_declaration": null,
            "reported_seconds": 13135,
            "total_seconds": null,
            "approved_seconds": 13135,
            "real_approved_seconds": 13136,
            "hackatime_projects": [
                11839
            ],
            "tags": [
                3
            ],
            "status": "Approved on 2026-04-21",
            "unread_notification_count": 0,
            "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NjUxLCJwdXIiOiJibG9iX2lkIn19--3c8547d85dfbe0be28286d474f5fcc40e5f179f5/fourierorpheus-cover.png?disposition=inline",
            "username": "Matei"
        },
        {
            "id": 1085,
            "aasm_state": "approved",
            "approved_at": "2026-04-21T19:56:41.884Z",
            "demo_link": "https://kgeox.itch.io/cube-vs-bubble-platformer",
            "desc": "a 3dplatformer game where you have to collect coins",
            "rejected_at": null,
            "repo_link": "https://github.com/KGeox/3-dplatformer",
            "submitted_at": "2026-04-21T00:13:45.908Z",
            "title": "Cube-vs-Bubble-Platformer",
            "ysws": null,
            "created_at": "2026-03-21T13:07:00.180Z",
            "updated_at": "2026-04-21T19:56:41.901Z",
            "user_id": 1356,
            "high_quality": false,
            "ai_declaration": "",
            "reported_seconds": 95235,
            "total_seconds": null,
            "approved_seconds": 94801,
            "real_approved_seconds": 37188,
            "hackatime_projects": [
                8882,
                12849
            ],
            "tags": [
                5
            ],
            "status": "Approved on 2026-04-21",
            "unread_notification_count": 0,
            "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTE5MywicHVyIjoiYmxvYl9pZCJ9fQ==--36b01707672d7df3d25978215d04a5a0880a934c/Screenshot%202026-04-20%20154542.png?disposition=inline",
            "username": "Georges"
        },
        {
            "id": 1817,
            "aasm_state": "approved",
            "approved_at": "2026-04-21T19:08:46.332Z",
            "demo_link": "https://aahvl.github.io/rick",
            "desc": "reship",
            "rejected_at": null,
            "repo_link": "https://github.com/aahvl/rick",
            "submitted_at": "2026-04-21T17:59:03.583Z",
            "title": "KeyRoll",
            "ysws": null,
            "created_at": "2026-04-21T17:25:12.304Z",
            "updated_at": "2026-04-21T19:08:46.381Z",
            "user_id": 1556,
            "high_quality": false,
            "ai_declaration": "",
            "reported_seconds": 9132,
            "total_seconds": null,
            "approved_seconds": 9132,
            "real_approved_seconds": 9133,
            "hackatime_projects": [
                14313,
                14573,
                17535
            ],
            "tags": [
                3
            ],
            "status": "Approved on 2026-04-21",
            "unread_notification_count": 0,
            "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTE5NSwicHVyIjoiYmxvYl9pZCJ9fQ==--bcfd3b37b22c5dddd5a4ab4a71b1b36af6bd9e19/%7B821CCEAE-E72D-4CA2-AEFE-0987B147A94D%7D.png?disposition=inline",
            "username": "kng"
        },
        {
            "id": 1506,
            "aasm_state": "approved",
            "approved_at": "2026-04-21T17:55:10.450Z",
            "demo_link": "https://chromewebstore.google.com/detail/hctg+/kdndfafcpodecbbjhoicneekmbdhhckm",
            "desc": "Adds some qol features to HCTG that i would like.\r\n\r\nNote: please install from github since webstore reviews take a long time and i have been adding a lot of stuff",
            "rejected_at": "2026-04-15T15:25:21.424Z",
            "repo_link": "https://github.com/some-du6e/HCTGplus",
            "submitted_at": "2026-04-21T01:06:59.007Z",
            "title": "HCTG+",
            "ysws": null,
            "created_at": "2026-04-09T17:53:24.874Z",
            "updated_at": "2026-04-21T17:55:11.772Z",
            "user_id": 2130,
            "high_quality": true,
            "ai_declaration": "Copilot/codex for things i could never fix, fully vibe coded ONLY the github release action\r\nmaybe claude for helping me with the calculations",
            "reported_seconds": 116277,
            "total_seconds": null,
            "approved_seconds": 109328,
            "real_approved_seconds": 101556,
            "hackatime_projects": [
                15183
            ],
            "tags": [
                6
            ],
            "status": "Approved on 2026-04-21",
            "unread_notification_count": 0,
            "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTA4NiwicHVyIjoiYmxvYl9pZCJ9fQ==--640a3a6d6ed80515a739bf4996113d3c4441327c/hctgplusfullkindabad.png?disposition=inline",
            "username": "Karim"
        },
        {
            "id": 1304,
            "aasm_state": "approved",
            "approved_at": "2026-04-21T16:02:21.075Z",
            "demo_link": "https://github.com/securefolderfs-community/SecureFolderFS#try-out-securefolderfs",
            "desc": "[Contribution] My friend asked me for some help with a long-term project of his and I've been helping him get into development again by making a few code quality and feature contributions just to keep him company.\r\nThe project in question is SecureFolderFS, which is a multi-platform encrypted vault app that lets you keep your files safe on Windows, macOS, Linux, Android and iOS.",
            "rejected_at": null,
            "repo_link": "https://github.com/securefolderfs-community/SecureFolderFS",
            "submitted_at": "2026-04-18T16:39:07.934Z",
            "title": "SecureFolderFS",
            "ysws": null,
            "created_at": "2026-04-02T00:45:22.960Z",
            "updated_at": "2026-04-21T16:02:22.584Z",
            "user_id": 1154,
            "high_quality": true,
            "ai_declaration": "",
            "reported_seconds": 68286,
            "total_seconds": null,
            "approved_seconds": 68025,
            "real_approved_seconds": 57240,
            "hackatime_projects": [
                12308,
                12309,
                12310
            ],
            "tags": [
                4
            ],
            "status": "Approved on 2026-04-21",
            "unread_notification_count": 0,
            "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTExMSwicHVyIjoiYmxvYl9pZCJ9fQ==--d48ed1facc246e85f4c8b247c7e9fa7778981731/Large%20Header%20(custom%20frameless).png?disposition=inline",
            "username": "Lamparter"
        },
        {
            "id": 1080,
            "aasm_state": "approved",
            "approved_at": "2026-04-21T15:01:24.733Z",
            "demo_link": "https://github.com/Limitenss/WinBar/releases/latest",
            "desc": "A new and improved taskbar for windows, designed to be customizable and better looking compared to the standard windows taskbar.",
            "rejected_at": "2026-04-14T00:16:01.726Z",
            "repo_link": "https://github.com/Limitenss/WinBar",
            "submitted_at": "2026-04-14T00:17:48.613Z",
            "title": "WinBar",
            "ysws": null,
            "created_at": "2026-03-21T05:40:57.946Z",
            "updated_at": "2026-04-21T15:01:24.739Z",
            "user_id": 1791,
            "high_quality": true,
            "ai_declaration": "I used Claude & Codex to debug - It helped me make the background apps button to work because windows is not easy to work with 😢. It also helped me fix some tiny bugs within the status, and the UI popups.",
            "reported_seconds": 84086,
            "total_seconds": null,
            "approved_seconds": 70478,
            "real_approved_seconds": 70491,
            "hackatime_projects": [
                10382
            ],
            "tags": [
                4
            ],
            "status": "Approved on 2026-04-21",
            "unread_notification_count": 0,
            "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OTY1LCJwdXIiOiJibG9iX2lkIn19--d36cd228ce7d0a8e9ad53df0595fb6a022d94dc1/Screenshot_32.png?disposition=inline",
            "username": "Limitens"
        }
    ]
    // project example so u dont have to unfold that big thing
    // {
    //         "id": 1171,
    //         "aasm_state": "approved",
    //         "approved_at": "2026-04-22T20:28:08.293Z",
    //         "demo_link": "https://sloth-paper.netlify.app/",
    //         "desc": "its a gallery for a good wallpaper as i think i have good taste this website will have good wallpaper for you all to use [frontend]",
    //         "rejected_at": null,
    //         "repo_link": "https://github.com/speed987185/wallpaper-site",
    //         "submitted_at": "2026-04-04T03:12:48.763Z",
    //         "title": "Wallpaper gallery",
    //         "ysws": null,
    //         "created_at": "2026-03-25T11:08:22.182Z",
    //         "updated_at": "2026-04-22T20:28:08.312Z",
    //         "user_id": 2122,
    //         "high_quality": false,
    //         "ai_declaration": null,
    //         "reported_seconds": 81067,
    //         "total_seconds": null,
    //         "approved_seconds": 80921,
    //         "real_approved_seconds": 37728,
    //         "hackatime_projects": [
    //             12008
    //         ],
    //         "tags": [
    //             3
    //         ],
    //         "status": "Approved on 2026-04-22",
    //         "unread_notification_count": 0,
    //         "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NzcwLCJwdXIiOiJibG9iX2lkIn19--bc5a4083a9c159a9b93b60150bf1675410b0c4df/Screenshot%202026-04-04%20080646.png?disposition=inline",
    //         "username": "Sloth"
    //     }
    
    let project = null

    for (projecto of fakequeue) {
        console.log(String(projecto["id"]))
        if (String(projecto["id"]) == projectidtoview) {
            project = projecto
        }
    } 

    console.log(project)
    if (project == null) {
        alert("Project not found!!!!")
        return
    }


    function cleanUsername(username) {
        return username.toLowerCase().replace(/\s+/g, '-').replace(/\d+/g, "");
    }

    let userpfp = `https://identicons.io/${cleanUsername(project.username)}.png`

    let mainContainer = prepareforcustomsite("Review", project.title)
    console.log(mainContainer)

    let aideclaration = ""
    if (project.ai_declaration) {
        aideclaration = `
            <div class="mb-6 rounded-md border border-gray-200 bg-gray-50 p-4">
                <h3 class="text-lg font-bold">AI Declaration</h3>
                <p class="mt-1 text-gray-600">
                    ${project.ai_declaration}
                </p>
            </div>
        `
    }


    let sigmaboy = `
        <div class="px-8 py-6">
            <div class="flex gap-6">
                <div class="min-w-0 flex-1">
                    <div class="mt-2 flex flex-wrap items-center gap-4">
                        <div class="flex items-center gap-1.5">
                            <img alt="Clock" class="h-5 w-5" src="data:image/svg+xml,%3csvg%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8%200C12.4184%200%2016%203.5816%2016%208C16%2012.4184%2012.4184%2016%208%2016C3.5816%2016%200%2012.4184%200%208C0%203.5816%203.5816%200%208%200ZM8%203.2C7.78783%203.2%207.58434%203.28429%207.43431%203.43431C7.28429%203.58434%207.2%203.78783%207.2%204V8C7.20005%208.21216%207.28436%208.41561%207.4344%208.5656L9.8344%2010.9656C9.98528%2011.1113%2010.1874%2011.192%2010.3971%2011.1901C10.6069%2011.1883%2010.8075%2011.1042%2010.9559%2010.9559C11.1042%2010.8075%2011.1883%2010.6069%2011.1901%2010.3971C11.192%2010.1874%2011.1113%209.98528%2010.9656%209.8344L8.8%207.6688V4C8.8%203.78783%208.71571%203.58434%208.56569%203.43431C8.41566%203.28429%208.21217%203.2%208%203.2Z'%20fill='black'%20/%3e%3c/svg%3e">
                            <span class="text-2xl tracking-[-0.06em]">
                                ${formattime(project.reported_seconds)}
                            </span>
                        </div>
                        <span class="text-lg text-gray-600 italic">Under review</span>
                    </div>
                    <p class="mt-1 text-lg text-green-600">
                        ${formattime(project.approved_seconds)} approved
                    </p>
                    <p class="mt-1 text-lg text-yellow-600">
                        ${formattime(randomnumber(3000, 14000))} under review (${formattime(project.reported_seconds - project.real_approved_seconds)} not yet shipped)
                    </p>
                    <div class="mt-2">
                        <p class="text-sm font-semibold text-gray-600">Hackatime projects:</p>
                        <ul class="mt-1 list-inside list-disc text-sm text-gray-600">
                            <li>
                                ${project.title.replaceAll(" ", "-").toLowerCase()}
                                <span class="text-gray-500">(${formattime(project.reported_seconds)})</span>
                            </li>
                        </ul>
                    </div>
                    <div class="mt-6 mb-6">
                        <img alt="Screenshot of ${project.title}" class="max-h-72 rounded-md border border-gray-200 object-contain" src="${project.screenshot}">
                    </div>
                    <div class="mb-6">
                        <h2 class="mb-1 text-xl font-semibold">Description</h2>
                        <p class="max-w-2xl text-lg wrap-break-word text-gray-700">
                            ${project.desc.replaceAll("\r\n", "<br>")}
                        </p>
                    </div>
                    <div class="mb-6 flex flex-wrap gap-3">
                        <a href="${project.demo_link}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 rounded-md bg-black px-5 py-2.5 text-lg font-bold text-white transition-colors hover:bg-gray-800">
                            Open Demo ↗
                        </a>
                        <a href="${project.repo_link}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 rounded-md border-2 border-black bg-white px-5 py-2.5 text-lg font-bold text-black transition-colors hover:bg-gray-100">
                            Open Repo ↗
                        </a>
                        <a href="${buildViewableLink(project)}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 rounded-md border-2 border-gray-300 bg-white px-5 py-2.5 text-lg font-bold text-gray-600 transition-colors hover:bg-gray-50">
                            View Project Page ↗
                        </a>
                    </div>
                    ${aideclaration}
                </div>
                <div class="w-72 shrink-0 self-start rounded-md border border-gray-200 bg-gray-50 p-5">
                    <h2 class="mb-3 text-2xl font-bold">User Info</h2>
                    <div class="flex flex-col gap-3">
                        <img alt="Avatar of karim" class="h-20 w-20 rounded-md" src="${userpfp}">
                        <div class="text-lg">
                            <p class="font-bold">
                                <a href="javascript:void(0)" onclick="alert('not going to be inmplemented') // mmmmm: implement this" class="text-blue-500 underline hover:text-blue-700">${project.username}</a>
                            </p>
                            <p class="text-gray-600" "// ehhhhh: better randomization/realism">
                                ${project.username.replaceAll(" ", "-").toLowerCase()}@hackclub.com
                            </p>
                            <p>
                                <span class="font-semibold">Hackatime:</span>
                                ${project.username.replaceAll(" ", "-").toLowerCase()}
                                (
                                <a href="javascript:void(0)" class="text-blue-500 underline" onclick="alert('This is a serious fraud detection tool used by Hack Club staff. You will not have access unless you are authorized.')">Joe</a> <!-- lowkey doesnt even work but add that alert so it sounds official -->
                                |
                                <a href="javascript:void(0)" class="text-blue-500 underline" onclick="alert('This is a serious fraud detection tool used by Hack Club staff. You will not have access unless you are authorized.')">Billy</a>
                                )
                            </p>
                            <p>
                                <span class="font-semibold">Slack:</span>
                                U0${generateRandomString(7).toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-8 flex w-full flex-col px-16 text-lg">
                <h2 class="smoothing-black mb-2 text-3xl font-bold tracking-[-0.02em]">Reviews</h2>
                <div class="flex flex-col gap-5" id="commentreviewthing">
                    <div class="flex gap-3">
                        <img alt="Avatar of karim" class="h-10 w-10 rounded-md" src="${userpfp}" title="">
                        <div class="flex flex-col gap-1">
                            <p class="leading-0.5">
                                <span class="font-bold">${project.username}</span>
                                <span class="italic">shipped</span>
                                <span class="text-sm"><br>on ${new Date(project.submitted_at).toLocaleString()}</span>
                            </p>
                            <p class="max-w-sm wrap-break-word">
                                <p class="leading-tight">
                                    <span class="text-base font-bold">Title</span><br>
                                    empty -&gt; ${project.title}
                                </p>
                                <p class="leading-tight">
                                    <span class="text-base font-bold">Desc</span><br>
                                    empty -&gt; ${project.desc}
                                </p>
                            </p>
                        </div>
                    </div>
                    <!--
                    <div class="flex gap-3">
                        <img alt="Avatar of alex" class="h-10 w-10 rounded-md" src="https://avatars.githubusercontent.com/u/2?v=4">
                        <div class="flex flex-col gap-1">
                            <p class="leading-0.5">
                                <span class="font-bold">alex</span>
                                <span class="italic">approved for 8h 0m</span>
                                <span class="text-sm"><br>on 4/23/2026, 1:45:00 PM</span>
                            </p>
                            <p class="max-w-sm wrap-break-word">Solid submission. README and demo both made review straightforward.</p>
                            <p class="rounded-md border-2 border-dashed border-orange-600 bg-orange-200 p-3">Repo structure is clean.</p>
                            <div class="flex gap-3">
                                <a class="text-blue-500 underline" href="/projects/2/reviews/1/edit">Edit</a>
                            </div>
                        </div>
                    </div>
                    -->
                    <!--
                    <div class="flex gap-3">
                        <img alt="Avatar of alex" class="h-10 w-10 rounded-md" src="https://avatars.githubusercontent.com/u/2?v=4" title="">
                        <div class="flex flex-col gap-1">
                            <p class="leading-0.5">
                                <span class="font-bold">alex</span>
                                <span class="italic">commented </span>
                                <span class="text-sm"><br>on 4/23/2026, 8:15:00 PM</span>
                            </p>
                            <p class="max-w-sm wrap-break-word">Consider tightening the onboarding copy before your next ship.</p>
                            <div class="flex gap-3">
                                <a class="text-blue-500 underline" href="/projects/2/reviews/2/edit">Edit</a>
                                <button class="cursor-pointer text-red-500 underline" type="button">Delete</button>
                            </div>
                        </div>
                    </div>
                    -->
                </div>
                <form class="mt-6 flex w-full flex-col gap-4 px-4 md:px-0">
                    <div class="flex items-center gap-4">
                        <select class="border-[#cacaca] bg-[#d9d9d9] py-2 pr-12 pl-6 text-lg outline-none" id="dqwndqwi0nkoqwd">
                            <option value="comment">Comment</option>
                            <option value="rejection">Rejection</option>
                            <option value="approval">Approval</option>
                        </select>
                        <div class="flex items-center gap-2">
                            <input type="checkbox">
                            <label class="text-lg">Internal?</label>
                        </div>
                    </div>
                    <div class="relative">
                        <button type="button" class="cursor-pointer border border-[#cacaca] bg-[#d9d9d9] px-4 py-2 text-sm font-medium hover:bg-[#ccc]">Quick responses ▼</button>
                    </div>
                    <textarea class="h-[117px] resize-none border-[#cacaca] bg-[#d9d9d9] p-4 text-xl outline-none" placeholder="Add your comment here - this will be shown to the author" id="sadsnkl"></textarea>
                    <button class="cursor-pointer bg-black px-6 py-2 text-lg font-bold text-white hover:bg-gray-800" id="add-review">Add review</button>
                </form>
            </div>
        </div>
    `

    let ohiosigmaboy = document.createElement("div")
    ohiosigmaboy.innerHTML = sigmaboy
    mainContainer.appendChild(ohiosigmaboy)

    let gubbythis = document.getElementById("add-review")
    let gubbythat = document.getElementById("dqwndqwi0nkoqwd").value
    gubbythis.addEventListener("click", function (event) {
        event.preventDefault()
        
        let gubbythat = document.getElementById("dqwndqwi0nkoqwd").value
        console.log(gubbythat)
        if (gubbythat == "approval" || gubbythat == "rejection") {
            let projectsreivewed = JSON.parse(localStorage.getItem("hctg-fake-projects-reviewed") || "[]")
            projectsreivewed.push(project.id)
            localStorage.setItem("hctg-fake-projects-reviewed", JSON.stringify(projectsreivewed))
            location.href = "https://game.hackclub.com/me#larp-reviewer"
        } else if (gubbythat === "comment") {
            if (!window.HCTG.user) { window.HCTG.user = {} }

            let ohiouser = window.HCTG.user

            let supersigmaboy = document.getElementById("sadsnkl")
            let dnqu9dqw = supersigmaboy.value.trim()
            if (dnqu9dqw == "") {
                alert("The comment is empty bud")
                return
            }
            let ohiogubby = `
            <div class="flex gap-3">
                <img alt="Avatar of alex" class="h-10 w-10 rounded-md" src="${ohiouser.avatar}" title="">
                <div class="flex flex-col gap-1">
                    <p class="leading-0.5">
                        <span class="font-bold">${ohiouser.first_name}</span>
                        <span class="italic">commented </span>
                        <span class="text-sm"><br>on ${new Date().toLocaleString()}</span>
                    </p>
                    <p class="max-w-sm wrap-break-word">${dnqu9dqw}</p>
                    <div class="flex gap-3">
                        <a class="text-blue-500 underline" href="/projects/2/reviews/2/edit">Edit</a>
                        <button class="cursor-pointer text-red-500 underline" type="button">Delete</button>
                    </div>
                </div>
            </div>
            `

            let thing = document.getElementById("commentreviewthing")
            let otherthing = document.createElement("div")
            otherthing.innerHTML = ohiogubby
            thing.appendChild(otherthing)
        }
        
    })

}

window.addEventListener('pageChange', function() {
    setTimeout(larpReview, 200)
});







larpReview()
