function addGoals() {
    if (location.pathname !== "/me") { return }
    if (location.hash !== "#goals") { return }
    console.log("HCTG+: addGoals running")


    // change title
    let title = document.getElementsByClassName("text-[48px] font-bold tracking-[-0.06em] text-nowrap text-white smoothing-white")[0]
    if (!title) {
        console.warn("HCTG: could not find goals title div! prob not on the goals page ID: 9s8f7g")
        return
    }
    title.textContent = "Goals"

    let oldcontent = document.getElementsByClassName("grid grid-cols-1 md:grid-cols-2")[0]
    oldcontent.remove()
    
    let containerx = document.getElementsByClassName("relative -ml-2 h-screen w-full flex-1 overflow-y-scroll px-6 py-10")[0]
    let container = document.createElement("div")
    container.className = "flex flex-col gap-10 px-6 py-8 xl:px-24 xl:py-16"
    containerx.appendChild(container)



    let goalitem = localStorage.getItem("hctgplus-goalitem")
    goalitem = JSON.parse(goalitem)
    if (!goalitem) {
      console.warn("HCTG+: user doesnt have a goal item... displaying error")
      // inspo from flavortown when u dont have to vote
      let buddyalert = document.createElement("div")
      buddyalert.className = "flex flex-col items-center justify-center p-4"
      buddyalert.innerHTML = `
      <h2 class="smoothing-black mb-4 text-6xl font-bold tracking-[-0.02em]">🚫</h2>
      <h2 class="smoothing-black mb-4 text-3xl font-bold tracking-[-0.02em]">Whoa there, buddy!</h2>
      <span class="mb-4">You've haven't chosen a goal. Choose a item you want from the shop.</span>
      <a class="group flex h-[59px] w-full cursor-pointer items-center justify-center gap-3 bg-black text-xl font-bold text-white transition-colors hover:border-4 hover:bg-white hover:text-black disabled:opacity-50" href="/shop">
      <img alt="" class="h-5 w-5 transition-all group-hover:invert" src="data:image/svg+xml,%3csvg%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2028%2028'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Arrow%20Vector'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M0.233334%2021.0198L0%200.3966L19.7556%200L27.4556%207.53541L13.7667%207.77337L28%2021.813L22.2444%2027.9207L7.93333%2013.881V28L0.233334%2021.0198Z'%20fill='var(--fill-0,%20white)'/%3e%3c/svg%3e">
      Take me there
      </a>
      `
      
      container.appendChild(buddyalert)
      return
    }
    let alltimeprogress = false
    if (localStorage.getItem("hctg-use-hours-for-goals") === "true") {
     alltimeprogress = (!goalitem.cost || !window.HCTG.economics.totalHours) ? 0 : Math.min(100, parseFloat(window.HCTG.economics.totalHours) / parseFloat(goalitem.cost) * 100)
    }else {
     alltimeprogress = (!goalitem.cost || !window.HCTG.economics.tokens) ? 0 : Math.min(100, parseFloat(window.HCTG.economics.tokens) / parseFloat(goalitem.cost) * 100)
    }
    
    if (!Number.isFinite(alltimeprogress)) {
      alltimeprogress = 0
    }
    console.log(alltimeprogress)
    console.log(window.HCTG.economics)
    let todayprogress = 0
    let decimalplaces = parseInt((localStorage.getItem("hctg-decimal-places") || "decimal-0").split("-")[1], 10)
    if (!Number.isFinite(decimalplaces) || decimalplaces < 0) {
      decimalplaces = 0
    }
    console.log(todayprogress)

    let progress = document.createElement("div")
    function formatProgress(value) {
      if (!Number.isFinite(value)) {
        return "0"
      }
      return value.toFixed(decimalplaces)
    }

    function updateAlltimeProgress() {
      if (localStorage.getItem("hctg-use-hours-for-goals") === "true") {
        alltimeprogress = (!goalitem.cost || !window.HCTG.economics.totalHours) ? 0 : Math.min(100, parseFloat(window.HCTG.economics.totalHours) / parseFloat(goalitem.cost) * 100)
      } else {
        alltimeprogress = (!goalitem.cost || !window.HCTG.economics.tokens) ? 0 : Math.min(100, parseFloat(window.HCTG.economics.tokens) / parseFloat(goalitem.cost) * 100)
      }

      if (!Number.isFinite(alltimeprogress)) {
        alltimeprogress = 0
      }
    }

    function refreshTodayProgress() {
      window.HCTG.goals.hoursDoneToday()
        .then(function(hoursDoneToday) {
          let currentHoursAday = Number(window.HCTG.goals.hoursAday())
          if (!Number.isFinite(hoursDoneToday) || !Number.isFinite(currentHoursAday) || currentHoursAday <= 0) {
            todayprogress = 0
            updateProgress()
            return
          }

          let computedProgress = Math.floor((hoursDoneToday / currentHoursAday) * 100)
          computedProgress = Math.max(0, Math.min(100, computedProgress))
          todayprogress = computedProgress
          updateProgress()
        })
        .catch(function(error) {
          console.error("Error calculating today's goal progress:", error)
        })
    }

    function updateProgress(ohio = false) {
      updateAlltimeProgress()
      if (ohio) {
        refreshTodayProgress()
      }
      progress.innerHTML = `
<div class="flex w-full flex-col">
   <div class="relative flex items-center">
      <div class="relative z-10 h-16 w-16 shrink-0 rounded-full bg-[#fecb0d]"></div>
      <div class="relative -mx-3 h-5 flex-1 overflow-hidden rounded-full bg-black">
        <div class="barbershop-stripes absolute inset-y-0 left-0" style="width: ${todayprogress}%;"></div>
        <div class="absolute inset-y-0 left-0 bg-[#fecb0d]" style="width: ${alltimeprogress}%;"></div>
      </div>
      <div class="relative z-10 h-16 w-16 shrink-0 rounded-full bg-black"></div>
   </div>
   <div class="mt-1 flex items-start justify-between px-1">
      <span class="smoothing-black pl-12 text-2xl font-bold tracking-tight">Begin</span>
      <div class="hidden px-10 lg:block">
          <p class="smoothing-black text-center text-2xl tracking-[-0.04em]">You currently are <span class="font-bold">${formatProgress(alltimeprogress)}% of the way there</span>.</p>
          <p class="smoothing-black text-center text-2xl tracking-[-0.04em]">You currently are <span class="font-bold" id="hctg-today-progress-text">${todayprogress}% of the way there for today</span>.</p>
       </div>
       <span class="smoothing-black min-w-max pr-12 text-2xl font-bold tracking-tight">Your item</span>
    </div>
 </div>`
    }
    updateProgress()

    // done: check if the item doesnt exist 
   
    let youritem = document.createElement("div")
    youritem.innerHTML = `
<h2 class="smoothing-black mb-4 text-3xl font-bold tracking-[-0.02em]">Your item</h2>
<div class="smoothing-black mt-5 text-xl leading-snug text-black/80">You chose a  <span class="font-bold">${goalitem.name}</span> for your item</div>
<div class="flex h-full flex-col" id="HCTGplus-item-9" data-hctg-item-id="9" style="display: block;">
  <div class="relative h-8 rounded-tl-2xl rounded-tr-2xl bg-black">
    
  </div>
  <div class="flex flex-1 flex-row gap-6 rounded-br-2xl rounded-bl-2xl border-2 border-t-0 border-black bg-white px-6 py-4">
    <div class="flex w-48 shrink-0 items-center justify-center">
      <img alt="${goalitem.name}" class="h-40 w-full object-contain" src="${goalitem.image}">
    </div>
    <div class="flex min-w-0 flex-1 flex-col">
      <div class="flex items-start justify-between gap-6">
        <h2 class="smoothing-black text-4xl font-bold tracking-[-0.03em]">${goalitem.name}</h2>
        <div class="flex items-center gap-1.5">
          <img alt="Tickets" class="h-5 w-5" src="data:image/svg+xml,%3csvg%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2031%2026'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Ticket%20Icon'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M17.05%200C17.4296%205.25047e-05%2017.7961%200.146178%2018.0798%200.410662C18.3635%200.675146%2018.5447%201.03959%2018.5891%201.43487L18.6%201.625C18.6004%202.03918%2018.7517%202.43755%2019.0229%202.73872C19.2941%203.0399%2019.6648%203.22113%2020.0592%203.2454C20.4535%203.26968%2020.8419%203.13515%2021.1448%202.86932C21.4478%202.60349%2021.6425%202.22641%2021.6891%201.81513L21.7%201.625C21.7%201.19402%2021.8633%200.780698%2022.154%200.475952C22.4447%200.171205%2022.8389%200%2023.25%200H26.35C27.5833%200%2028.766%200.513615%2029.638%201.42785C30.5101%202.34209%2031%203.58207%2031%204.875V21.125C31%2022.4179%2030.5101%2023.6579%2029.638%2024.5721C28.766%2025.4864%2027.5833%2026%2026.35%2026H23.25C22.8704%2025.9999%2022.5039%2025.8538%2022.2202%2025.5893C21.9365%2025.3249%2021.7553%2024.9604%2021.7108%2024.5651L21.7%2024.375C21.6996%2023.9608%2021.5483%2023.5624%2021.2771%2023.2613C21.0059%2022.9601%2020.6352%2022.7789%2020.2408%2022.7546C19.8465%2022.7303%2019.4581%2022.8648%2019.1552%2023.1307C18.8522%2023.3965%2018.6575%2023.7736%2018.6108%2024.1849L18.6%2024.375C18.6%2024.806%2018.4367%2025.2193%2018.146%2025.524C17.8553%2025.8288%2017.4611%2026%2017.05%2026H4.65C3.41674%2026%202.234%2025.4864%201.36195%2024.5721C0.489909%2023.6579%200%2022.4179%200%2021.125V4.875C0%203.58207%200.489909%202.34209%201.36195%201.42785C2.234%200.513615%203.41674%200%204.65%200H17.05ZM20.15%2014.625C19.7389%2014.625%2019.3447%2014.7962%2019.054%2015.101C18.7633%2015.4057%2018.6%2015.819%2018.6%2016.25V17.875C18.6%2018.306%2018.7633%2018.7193%2019.054%2019.024C19.3447%2019.3288%2019.7389%2019.5%2020.15%2019.5C20.5611%2019.5%2020.9553%2019.3288%2021.246%2019.024C21.5367%2018.7193%2021.7%2018.306%2021.7%2017.875V16.25C21.7%2015.819%2021.5367%2015.4057%2021.246%2015.101C20.9553%2014.7962%2020.5611%2014.625%2020.15%2014.625ZM20.15%206.5C19.7704%206.50005%2019.4039%206.64618%2019.1202%206.91066C18.8365%207.17515%2018.6553%207.53959%2018.6108%207.93488L18.6%208.125V9.75C18.6004%2010.1642%2018.7517%2010.5626%2019.0229%2010.8637C19.2941%2011.1649%2019.6648%2011.3461%2020.0592%2011.3704C20.4535%2011.3947%2020.8419%2011.2602%2021.1448%2010.9943C21.4478%2010.7285%2021.6425%2010.3514%2021.6891%209.94012L21.7%209.75V8.125C21.7%207.69402%2021.5367%207.2807%2021.246%206.97595C20.9553%206.67121%2020.5611%206.5%2020.15%206.5Z'%20fill='var(--fill-0,%20black)'/%3e%3c/svg%3e">
          <span class="smoothing-black text-2xl tracking-[-0.03em]">${goalitem.cost}</span>
        </div>
      </div>
      <p class="smoothing-black mt-2 text-xl tracking-[-0.02em]">${goalitem.description}</p>
      <div class="mt-auto">
        <!-- XXXXXXX -->
        <button type="button" class="smoothing-white mt-4 block w-full cursor-pointer bg-black px-5 py-3 text-center text-xl font-bold tracking-tight text-white transition-colors hover:bg-[#fecb0d] hover:text-black" onclick="alert('hey bud, im not implementing this cuz its too risky cuz internal stuff could change and it could break too')">Buy</button>
      </div>
    </div>
  </div>
</div>

    `

    // this for later to put in the XXXXXXXXXXXX section maybe
    // <div class="mt-4 flex items-center gap-2">
        //   <button type="button" class="flex h-10 w-10 cursor-pointer items-center justify-center rounded border-2 border-black bg-white text-xl font-bold transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40" disabled="">−</button>
        //   <span class="smoothing-black w-10 text-center text-xl font-bold">1</span>
        //   <button type="button" class="flex h-10 w-10 cursor-pointer items-center justify-center rounded border-2 border-black bg-white text-xl font-bold transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40">+</button>
        // </div>

    let breakdaysreadonly = parseInt(localStorage.getItem("hctg-break-days") ? localStorage.getItem("hctg-break-days") : 1, 10)
    let options = document.createElement("div")
    options.className = ""
    options.innerHTML = `
    <h2 class="smoothing-black mb-4 text-3xl font-bold tracking-[-0.02em]">Options</h2>
    <div class="flex gap-4 flex-wrap flex-row">
      <div class="rounded-2xl border-2 border-black bg-white px-6 py-4">
        <h3 class="smoothing-black mb-4 text-center text-2xl font-bold tracking-[-0.02em]">Break days</h3>
        <div class="mt-4 flex items-center justify-center gap-2">
          <button type="button" class="flex h-10 w-10 cursor-pointer items-center justify-center rounded border-2 border-black bg-white text-xl font-bold transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40" id="break-days-down">−</button>
          <span class="smoothing-black w-10 text-center text-xl font-bold" id="break-days-counter">${breakdaysreadonly}</span>
          <button type="button" class="flex h-10 w-10 cursor-pointer items-center justify-center rounded border-2 border-black bg-white text-xl font-bold transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40" id="break-days-up">+</button>
        </div>
      </div>
      <div class="rounded-2xl border-2 border-black bg-white px-6 py-4">
        <h3 class="smoothing-black mb-4 text-center text-2xl font-bold tracking-[-0.02em]">Percentage detail</h3>
        <div class="mt-4 flex items-center justify-center gap-2">
          <select name="decimalpoints" id="decimalpoints">
            <option value="decimal-0">Not detailed</option>
            <option value="decimal-1">1 decimal place</option>
            <option value="decimal-2">2 decimal places</option>
            <option value="decimal-9">Very</option>
          </select>
        </div>
      </div>
      <div class="rounded-2xl border-2 border-black bg-white px-6 py-4">
        <h3 class="smoothing-black mb-4 text-center text-2xl font-bold tracking-[-0.02em]">Use hours instead of tokens for calculation</h3>
        <div class="mt-4 flex items-center justify-center gap-2">
          <select name="tokens-vs-hours" id="tokens-vs-hours">
            <option value="false">no</option>
            <option value="true">yeah</option>
          </select>
        </div>
      </div>
      <div class="rounded-2xl border-2 border-black bg-white px-6 py-4">
        <h3 class="smoothing-black mb-4 text-center text-2xl font-bold tracking-[-0.02em]">Hackatime key</h3>
        <div class="mt-4 flex items-center justify-center gap-2">
          <input type="password" id="hackatime-key"></input>
        </div>
      </div>
      <div class="rounded-2xl border-2 border-black bg-white px-6 py-4">
        <h3 class="smoothing-black mb-4 text-center text-2xl font-bold tracking-[-0.02em]">Deadline</h3>
        <div class="mt-4 flex items-center justify-center gap-2">
          <input type="date" id="goal-deadline"></input>
        </div>
      </div>
      
    
      
    </div>
    `
    // handle break days
    let upbutton = options.querySelector("#break-days-up")
    let downbutton = options.querySelector("#break-days-down")
    let breakdaysdisplay = options.querySelector("#break-days-counter")

    function updateBreakDays(delta) {
      breakdaysreadonly = Math.max(0, breakdaysreadonly + delta)
      localStorage.setItem("hctg-break-days", String(breakdaysreadonly))
      breakdaysdisplay.textContent = String(breakdaysreadonly)
    }

    upbutton.addEventListener("click", function() {
      updateBreakDays(1)
      updateProgress(true)
    })

    downbutton.addEventListener("click", function() {
      updateBreakDays(-1)
      updateProgress(true)
    })

    // hande the decimal points
    let decimalselect = options.querySelector("#decimalpoints")
    decimalselect.value = localStorage.getItem("hctg-decimal-places") || "no"
    decimalselect.addEventListener("change", function() {
      localStorage.setItem("hctg-decimal-places", decimalselect.value)
      decimalplaces = parseInt(decimalselect.value.split("-")[1], 10)
      if (!Number.isFinite(decimalplaces) || decimalplaces < 0) {
        decimalplaces = 0
      }
      updateProgress()
    })


    // handle hours vs tokens
    let tokensvshoursselect = options.querySelector("#tokens-vs-hours")
    tokensvshoursselect.value = localStorage.getItem("hctg-use-hours-for-goals") || "no"
    tokensvshoursselect.addEventListener("change", function() {
      let chud = false
      if (tokensvshoursselect.value === "true") {
        chud = true
      }
      localStorage.setItem("hctg-use-hours-for-goals", chud)
      updateProgress(true)
    })

    // handle hackatime key
    let hackatimekeyinput = options.querySelector("#hackatime-key")
    let legacyHackatimeKey = localStorage.getItem("hctg-hackatime-key")
    let storedHacktimeKey = localStorage.getItem("hctg-hacktime-key") 
    if (!storedHacktimeKey && legacyHackatimeKey) {
      localStorage.setItem("hctg-hacktime-key", legacyHackatimeKey)
      storedHacktimeKey = legacyHackatimeKey
    }
    if (hackatimekeyinput) {
      hackatimekeyinput.value = storedHacktimeKey || ""
      hackatimekeyinput.addEventListener("change", function() {
        localStorage.setItem("hctg-hacktime-key", hackatimekeyinput.value)
      })
    } else {
      console.warn("HCTG+: Hackatime key input was not found.")
    }
    container.appendChild(progress)
    container.appendChild(youritem)
    container.appendChild(options)

    refreshTodayProgress()

    // handle deadline
    let deadlineselect = options.querySelector("#goal-deadline")
    let storedDeadlineStr = localStorage.getItem("hctg-goal-deadline")
    let defaultDeadline = new Date(2026, 5, 30)
    let defaultStr = defaultDeadline.getFullYear() + "-" + String(defaultDeadline.getMonth() + 1).padStart(2, "0") + "-" + String(defaultDeadline.getDate()).padStart(2, "0")
    deadlineselect.value = storedDeadlineStr || defaultStr
    deadlineselect.addEventListener("change", function() {
      localStorage.setItem("hctg-goal-deadline", deadlineselect.value)
      updateProgress()
    })
   let gubby = window.HCTG.goals.hoursAday()
   console.log("HCTG+: hours a day is ", gubby)
}

window.addEventListener('pageChange', function() {
    setTimeout(addGoals, 200)
});


window.HCTG = window.HCTG || {}
if (!window.HCTG.goals) {
  window.HCTG.goals = {}
}

window.HCTG.goals.hoursAday = function () {
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    let storedDeadline = localStorage.getItem("hctg-goal-deadline")
    let deadline
    if (storedDeadline && storedDeadline.includes("-")) {
      let parts = storedDeadline.split("-")
      deadline = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
    } else {
      deadline = new Date(2026, 5, 30)
    }
    deadline.setHours(0, 0, 0, 0)
    let diffInMs = deadline - today
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
    console.log("HCTG+: diffInDays:", diffInDays, "deadline:", deadline, "today:", today)
    let itemcost = localStorage.getItem("hctgplus-goalitem") ? JSON.parse(localStorage.getItem("hctgplus-goalitem")).cost : 0 
    let breakdays = parseInt(localStorage.getItem("hctg-break-days") || "1", 10)
    let daysworking = diffInDays - breakdays
    console.log("HCTG+: daysworking:", daysworking)
    if (daysworking <= 0) {
      return 0
    }
    let hoursaday = itemcost / daysworking
    return hoursaday
} 

window.HCTG.goals.hoursDoneToday = function() {
  let hackatimekey = localStorage.getItem("hctg-hacktime-key")
  if (!hackatimekey) {
    let legacyHackatimeKey = localStorage.getItem("hctg-hackatime-key")
    if (legacyHackatimeKey) {
      localStorage.setItem("hctg-hacktime-key", legacyHackatimeKey)
      hackatimekey = legacyHackatimeKey
    }
  }
  if (!hackatimekey) {
    return Promise.resolve(null)
  }
  let now = new Date()

  let hackatimecache = localStorage.getItem("hctg-hacktime-cache")
  function getcache() {
    if (!hackatimecache) {
      return null
    }

    let cacheobj = null
    try {
      cacheobj = JSON.parse(hackatimecache)
    } catch {
      return null
    }

    if (!cacheobj || !Number.isFinite(cacheobj.hours) || !cacheobj.date) {
      return null
    }

    let cachedhours = Number(cacheobj.hours)
    let cachedate = new Date(cacheobj.date)
    if (Number.isNaN(cachedate.getTime())) {
      return null
    }

    let cacheseconds = Math.abs(now - cachedate) / 1000
    let cacheminutes = Math.floor(cacheseconds / 60) % 60
    if (cacheminutes < 3) {
      return cachedhours
    }

    return null
  }

  function setcache(hoursdone) {
    let cachedata = {
      "date": now.toISOString(),
      "hours": hoursdone
    }
    let cachestring = JSON.stringify(cachedata)
    localStorage.setItem("hctg-hacktime-cache", cachestring)
  }

  let cached = getcache()
  if (Number.isFinite(cached)) {
    return Promise.resolve(cached)
  }

  return fetch("https://hackatime.hackclub.com/api/hackatime/v1/users/current/statusbar/today?api_key=" + hackatimekey)
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      console.log("HCTG: got HackTime data", data)

      if (!data || !data.data || !data.data.grand_total) {
        return null
      }

      let secondsdone = data.data.grand_total.total_seconds
      let hoursdone = Number(secondsdone) / 3600
      console.log("HCTG+: something called hoursdonetoday and we returning ", hoursdone)

      if (!Number.isFinite(hoursdone)) {
        return null
      }
      setcache(hoursdone)
      return hoursdone
    })
    .catch(function(error) {
      console.error("Error fetching HackTime data:", error)
      return null
    })
}
 
  







addGoals()
