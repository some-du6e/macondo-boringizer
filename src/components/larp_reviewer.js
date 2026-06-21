// @ts-nocheck
// @js-nocheck
function larprevewing() {
    if (location.pathname !== "/me") { return }
    let isViewHash = location.hash === "#larp-reviewer"
    if (!isViewHash) { return }
    console.log("HCTG+: larprevewing running")
    window.HCTG = window.HCTG || {}

    function formattime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        const formatted = `${hours}h ${minutes}m`;
        return formatted // shi prob in 3 different components lowkey
    }

    function prepareforcustomsite(titlee) {
        // remove title
        let title = document.getElementsByClassName("text-[48px] font-bold tracking-[-0.06em] text-nowrap text-white smoothing-white")[0]
        if (!title) {
            console.warn("HCTG: could not find project title div! prob not on the project page ID: 9s8f7g")
            return null
        }
        title.parentElement.parentElement.parentElement.parentElement.remove()

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
    let mainContainer = prepareforcustomsite("Project")

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
    
    // Filter out already-reviewed projects
    let alrdoneprojects = JSON.parse(localStorage.getItem("hctg-fake-projects-reviewed") || "[]")
    fakequeue = fakequeue.filter(project => !alrdoneprojects.includes(project.id))
    
    let queue_count = fakequeue.length
    let index = 0
    let queuetablething = ``
    for (let project of fakequeue) {
        queuetablething += `
        <tr
          key=${project.id}
          class="border-b border-gray-100 hover:bg-gray-50"
        >
            <td key=${index} class="py-0 pr-4">
              <a
                href="https://game.hackclub.com/me?projectId=${project.id}#larp_review"
                class="block py-2"
              >
                <span class="text-gray-400">${index + 1}</span>
              </a>
            </td>
            <td class="py-0 pr-4">
              <Link
                href={/review/${project.id}}
                class="block py-2"
              >
            <span class="font-medium">${project.title}</span>
              </Link>
            </td>
            <td class="py-0 pr-4">
              <Link
                href="/review/${project.id}"
                class="block py-2"
              >
            <span class="text-gray-600">${project.username}</span>
              </Link>
            </td>
            <td class="py-0 pr-4">
              <Link
                href="/review/${project.id}"
                class="block py-2"
              >
            <span class="text-gray-500">
                ${new Date(project.submitted_at).toLocaleDateString()}
              </span>
              </Link>
            </td>
            <td class="py-0 pr-4">
              <Link
                href="/review/${project.id}"
                class="block py-2"
              >
              <span class="text-gray-500">
                ${formattime(project.reported_seconds)}
              </span>
              </Link>
            </td>
            <td class="py-0 pr-4">
              <Link
                href="/review/${project.id}"
                class="block py-2"
              >
              <span class="text-gray-500">
                ${project.real_approved_seconds > 0
                  ? formattime(project.real_approved_seconds)
                  : "—"}
              </span>
              </Link>
            </td>
        </tr>
        `
        index += 1
    }
    
    let ohiosigmaboy = document.createElement("div")
    // @ts-expect-error
    let ohiogubby = `      
    <div class="px-8">
            <div class="mb-4 flex flex-col gap-1">
              <h1 class="smoothing-black text-4xl font-bold">
                Reviewer Dashboard
              </h1>
              <p class="text-gray-500 italic">not quite absolute power...</p>
            </div>
    
            <div class="py-5">
              <h2 class="mb-2 text-3xl font-semibold">Next up to review!</h2>
              <div class="grid grid-cols-3 gap-5" id="nextupproject">
                
              </div>
            </div>
    
            <div class="py-5">
              <div class="mb-3 flex items-baseline gap-4">
                <h2 class="text-3xl font-semibold">Review Queue</h2>
                <span class="text-gray-500">
                  ${queue_count} project${queue_count !== 1 && "s"} remaining
                </span>
              </div>
              <table class="w-full border-collapse text-left text-sm">
                <thead>
                  <tr class="border-b border-gray-200 text-gray-500">
                    <th class="py-2 pr-4 font-semibold">#</th>
                    <th class="py-2 pr-4 font-semibold">Title</th>
                    <th class="py-2 pr-4 font-semibold">Author</th>
                    <th class="py-2 pr-4 font-semibold">Submitted</th>
                    <th class="py-2 pr-4 font-semibold">Reported Hours</th>
                    <th class="py-2 pr-4 font-semibold">
                      Prior Approved Hours
                    </th>
                  </tr>
                </thead>
                <tbody>
                ${queuetablething}
                </tbody>
              </table>
            </div>
    
            <div class="py-5">
              <div class="mb-4 flex flex-col gap-1">
                <h2 class="text-3xl font-semibold">Leaderboard</h2>
                <p class="text-gray-500 italic">
                  Number of reviews in the past week
                </p>
              </div>
    
              <div class="flex w-full gap-3">
                <div class="flex max-w-xl flex-col gap-3">
                  <p class="text-2xl font-bold">Last week</p>
                  <!-- Leaderboard items will be populated here -->
                </div>
                <div class="flex max-w-xl flex-col gap-3">
                  <p class="text-2xl font-bold">All time</p>
                  <!-- All-time leaderboard items will be populated here -->
                </div>
              </div>
            </div>
          </div>
    `
    function projectCard(project) {
        let highQualityHTML = project.high_quality ? `<p class="pt-2 text-center font-semibold text-yellow-600 italic">🎫 Golden ticket winner!</p>` : ""
        const hours = Math.floor(project.reported_seconds / 3600);
        const minutes = Math.floor((project.reported_seconds % 3600) / 60);

        const formatted = `${hours}h ${minutes}m`;
        return `
        <a
            href="https://game.hackclub.com/me?projectId=${project.id}#larp_review"
            target="_blank"
            rel="noopener noreferrer"
            class="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl transition-transform hover:scale-[1.02] shadow-[0_0_30px_rgba(255,215,0,0.9)]"
        >
            <div class="relative overflow-hidden rounded-t-2xl">
                <img
                    src="${project.screenshot}"
                    alt="${project.title ?? "Project screenshot"}"
                    class="h-[105px] w-full rounded-tl-2xl rounded-tr-2xl border-2 border-b-0 border-black object-cover"
                />
            </div>
    
            ${project.unread_notification_count !== 0 ? '<div class="absolute top-2 left-2 z-10 rounded-full bg-red-500 px-4 py-2 font-semibold text-white">' + project.unread_notification_count + ' unread notification'+ (project.unread_notification_count != 1 ? "s" : "") + '</div>' : ""}
      
            <div class="flex-1 rounded-br-2xl rounded-bl-2xl border-2 border-black bg-white p-6">
                <div class="flex items-start justify-between gap-2">
                    <h2 class="smoothing-black text-4xl font-bold tracking-[-0.03em] wrap-anywhere">
                        ${project.title}
                    </h2>
                    <div class="flex shrink-0 items-center gap-1.5">
                        <span class="smoothing-black text-2xl tracking-[-0.03em]" title="Hours reported">
                            ${formatted}
                        </span>
                    </div>
                </div>
        
                <p class="smoothing-gray text-xl text-gray-600">
                    by ${project.username}
                </p>
        
                <p class="smoothing-black mt-2 max-h-14 overflow-hidden text-xl tracking-[-0.02em] wrap-break-word text-ellipsis">
                    ${project.desc}
                </p>
                ${highQualityHTML}
            </div>
        </a>`
    }

    ohiosigmaboy.innerHTML = ohiogubby
    mainContainer.appendChild(ohiosigmaboy)

    let nextupproject = document.getElementById("nextupproject")
    // let nextupfakeproject = {
    //     "id": 1506,
    //     "aasm_state": "submitted",
    //     "approved_at": "2026-04-16T20:33:37.087Z",
    //     "demo_link": "https://chromewebstore.google.com/detail/hctg+/kdndfafcpodecbbjhoicneekmbdhhckm",
    //     "desc": "Adds some qol features to HCTG that i would like.\r\n\r\nNote: please install from github since webstore reviews take a long time and i have been adding a lot of stuff",
    //     "rejected_at": "2026-04-15T15:25:21.424Z",
    //     "repo_link": "https://github.com/some-du6e/HCTGplus",
    //     "submitted_at": "2026-04-21T01:06:59.007Z",
    //     "title": "HCTG+",
    //     "ysws": null,
    //     "created_at": "2026-04-09T17:53:24.874Z",
    //     "updated_at": "2026-04-21T01:06:59.015Z",
    //     "user_id": 2130,
    //     "high_quality": false,
    //     "ai_declaration": "Copilot/codex for things i could never fix, fully vibe coded ONLY the github release action\r\nmaybe claude for helping me with the calculations",
    //     "reported_seconds": 109328,
    //     "total_seconds": 109328,
    //     "approved_seconds": 70773,
    //     "real_approved_seconds": 63000,
    //     "hackatime_projects": [
    //         15183
    //     ],
    //     "tags": [
    //         6
    //     ],
    //     "status": "Under review on 2026-04-21",
    //     "unread_notification_count": 67,
    //     "username": "Quandale Dingle",
    //     "screenshot": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTA4NiwicHVyIjoiYmxvYl9pZCJ9fQ==--640a3a6d6ed80515a739bf4996113d3c4441327c/hctgplusfullkindabad.png?disposition=inline"
    // }

    let nextupfakeproject = fakequeue[0]
    nextupproject.innerHTML = projectCard(nextupfakeproject)

}

window.addEventListener('pageChange', function() {
    setTimeout(larprevewing, 200)
});







larprevewing()
