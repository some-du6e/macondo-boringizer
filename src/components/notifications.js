function notificationsBetter() {
  if (location.pathname !== "/notifications") {
    return
  }
  console.log("HCTG+: notificationsBetter running")
  window.HCTG = window.HCTG || {}

  let datapage = window.HCTG.datapage

  // check if the datapage is old
  if (datapage.url !== "/notifications") {
    console.warn("need to refresh")
    location.reload()
  }
  let notifs = datapage.props.notifications
  let notifscontainer = document.getElementsByClassName("my-5 flex flex-col gap-4")[0]
  // could recycle most of this from gallery.js wtf

  // link each notif to their id
  for (let notifcard of notifscontainer.children) {
    let desc = notifcard.children[1].innerText
    for (let notifobject of notifs) {
      let cleanmsg = notifobject.message.replace(/\n/g, " ")
      cleanmsg = cleanmsg.replace(/\s+/g, " ").trim()
      desc = desc.replace(/\s+/g, " ").trim()
      // console.log(cleanmsg)
      // console.log(desc)
      // console.log("--------------")
      if (cleanmsg == desc) {
        notifcard.setAttribute("hctg-notification-id", notifobject.id)
      }
    }
  }

  for (let notifcard of notifscontainer.children) {
    let notifid = notifcard.getAttribute("hctg-notification-id")
    let notif = notifs.find(n => n.id == notifid)

    // // change desc
    // let descContainer = notifcard.children[1]
    // let cleanmsg = notif.message.replace(" >", "/n")
    // console.log(cleanmsg)
    // descContainer.innerText = cleanmsg

    // slime everything out and make room for new things
    notifcard.children[0].remove()
    notifcard.children[0].remove()

    if (notif.notifiable_type == "Project::Review") {
      let reviewer = {
        id: 999,
        avatar:
          "https://avatars.slack-edge.com/2025-07-20/9222694931782_3c71b26b49b027f3595a_512.png",
        role: "reviewer",
        username: "not found",
      }
      // set stuff
      let authorid = notif.notifiable?.author_id
      if (authorid) {
        // console.log(window.HCTG.roles)
        let foundthing = window.HCTG.roles[String(authorid)]
        if (foundthing) {
          reviewer = foundthing
        } else {
          console.error("didnt find authorid for:", authorid)
        }
      } else {
        console.error("notif.notifiable or author_id is missing")
      }

      let datething = new Date(notif.notifiable.created_at)
      let datestring = datething.toLocaleString()

      let timeapproved = "???"
      let approvedseconds = notif.notifiable.approved_seconds
      if (approvedseconds) {
        const hours = Math.floor(approvedseconds / 3600)
        const minutes = Math.floor((approvedseconds % 3600) / 60)

        const formatted = `${hours}h ${minutes}m`
        timeapproved = formatted
      }

      let yap = "???"
      let reviewtype = notif.notifiable.review_type
      if (reviewtype === "rejection") {
        yap = `<span class="italic">rejected</span><span class="text-sm"><br>on ${datestring}</span>`
      } else if (reviewtype === "approval") {
        yap = `<span class="italic">approved for ${timeapproved}</span><span class="text-sm"><br>on ${datestring}</span>`
      }
      let glow = false
      let glowStyle = ""
      if (reviewtype === "rejection") {
        glowStyle = "0 0 20px rgba(255, 100, 100, 0.8)"
      } else if (reviewtype === "approval") {
        glowStyle = "0 0 20px rgba(100, 200, 100, 0.8)"
      } else {
        console.warn("HCTG+: Unknown review type:", reviewtype, "for notif:", notif.id)
      }
      if (glowStyle) {
        notifcard.style.boxShadow = glowStyle
      }
      let reviewercomment = notif.message
      const parts = reviewercomment.split(">")
      reviewercomment = (parts.length > 1 ? parts[1] : reviewercomment).trim()
      reviewercomment = reviewercomment.replace(/\n/g, "<br>")

      slop = `
          
          <div class="flex gap-3 ">
              <img alt="Avatar of ${reviewer.username}" class="h-10 w-10 rounded-md" src="${reviewer.avatar}" title="">
              <div class="flex flex-col gap-1">
                  <p class="leading-0.5">
                      <span class="font-bold">${reviewer.username}</span>
                      ${yap}
                  </p>
                  <p class="max-w-m wrap-break-word">
                      ${reviewercomment}
                  </p>
              </div>
          </div>
      `
      notifcard.innerHTML = slop
    } else {
    // copied from the reviewer stuff cuz im lazy and this is a edge case
      let reviewer = {
        id: 999,
        avatar:
          "https://avatars.slack-edge.com/2025-07-20/9222694931782_3c71b26b49b027f3595a_512.png",
        role: "reviewer",
        username: "orpheus",
      }

      let datething = new Date(notif.notifiable.created_at)
      let datestring = datething.toLocaleString()

      let ticketadjustment = notif.notifiable.amount

      let yap = "???"
      let upordown = notif.notifiable.amount > 0 ? "approval" : "rejection"
      if (upordown === "rejection") {
        yap = `<span class="italic">rejected</span><span class="text-sm"><br>on ${datestring}</span>`
      } else if (upordown === "approval") {
        yap = `<span class="italic">adjusted your tickets by +${ticketadjustment}</span><span class="text-sm"><br>on ${datestring}</span>`
      }
      let glow = false
      let glowStyle = ""
      if (upordown === "rejection") {
        glowStyle = "0 0 20px rgba(255, 100, 100, 0.8)"
      } else if (upordown === "approval") {
        glowStyle = "0 0 20px rgba(100, 200, 100, 0.8)"
      } else {
        console.warn("HCTG+: Unknown review type:", upordown, "for notif:", notif.id)
      }
      if (glowStyle) {
        notifcard.style.boxShadow = glowStyle
      }
      let reviewercomment = notif.message
      const parts = reviewercomment.split(">")
      reviewercomment = (parts.length > 1 ? parts[1] : reviewercomment).trim()
      reviewercomment = reviewercomment.replace(/\n/g, "<br>")

      slop = `
          
          <div class="flex gap-3 ">
              <img alt="Avatar of ${reviewer.username}" class="h-10 w-10 rounded-md" src="${reviewer.avatar}" title="">
              <div class="flex flex-col gap-1">
                  <p class="leading-0.5">
                      <span class="font-bold">${reviewer.username}</span>
                      ${yap}
                  </p>
                  <p class="max-w-m wrap-break-word">
                      ${reviewercomment}
                  </p>
              </div>
          </div>
      `
      notifcard.innerHTML = slop
    }
  }
}

window.addEventListener("pageChange", function () {
  setTimeout(notificationsBetter, 200)
})

notificationsBetter()
