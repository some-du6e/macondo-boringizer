import shutil
import os
import subprocess
import json

print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
print("|      Update shop categories        |")
print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

# Read shop items from dump
with open(os.path.join(os.path.dirname(__file__), '..', 'shopitemsdumpy.js'), 'r', encoding='utf-8') as f:
    shop_items = json.load(f)


agent = input("Which one do you want to use? \n 1. Codex \n 2. Copilot \n")
if agent == "1":
    agent = "codex"
elif agent == "2":
    agent = "copilot"
else:
    print("Ur annoying")
    exit(1)


if agent == "codex":
    # find if there is codex
    path = shutil.which("codex")
    if (path is None):
        print("Codex is not installed. Please install it first (see contributing.md)")
        exit(1)
    else:
        print("Found codex")

    # check if they logged in
    codex_status = subprocess.run(
        ["codex", "login", "status"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    if codex_status.returncode != 0:
        print("You are not logged in to codex. Please log in first (its free bro)")
        exit(1)



# ai
PROMPT = f"""
Hi there! Im going to pass down a big array of shop items, your job is to update the categories of the shop items.
The edit you make should be targeted only for `components/consts.js` file. You should edit this part:
```js
window.HCTG.shop.categories = [...]
```

For example here this is a preffered result:
FYI: this is only for demonstration purposes and is a old version. You may find similar items from the dump.

```js 
window.HCTG.shop.categories = {{
    featured: [
        64, // featured
        25, // featured
        29, // featured
        16, // featured
        3, // featured
        27, // featured
        26, // featured
        101, // featured
        98, // featured
        99, // featured
        100 // featured
    ],
    travel: [
        64, // $8 travel sitpend
        25, // $80 travel sitpend
        3, // Invite to the irl event
        101, // esim ONLY for the irl event
        99, // pre event accomodation
        100 // post event accomodation
    ],
    grants: [
        64, // travel SITSPEND
        25, // travel SITSPEND
        29, // laptop GRANT
        16, // cloudflare GRANT
        9, // ai GRANT
        73, // pcb GRANT
        76, // domain GRANT
        63, // framework CREDITS
        71, // keychron CREDITS
        90, // proton vpn CREDITS
        10, // nebula CREDITS
        96, // nintendo eshop CREDITS
        66, // steam CREDIT
        97 // console GRANT
    ],
    tech: [
        29, // LAPTOP grant
        27, // MACBOOK neo
        26, // MACBOOK neo (india)
        80, // MAC mini
        69, 
        87,
        86,
        83
    ],
    hardware: [
        11,
        74,
        72,
        82
    ],
    audio: [
        68,
        67,
        91,
        78,
        81,
        85
    ],
    gaming: [
        15,
        70,
        75,
        77,
        89
    ],
    misc: [
        65,
        79,
        88,
        95,
        98
    ],
}}

```

Opinions:
- more "nerdy"/tinkerer stuff (ex. flipper zero, raspberry pi) SHOULD be in the hardware category
- yubikey should not be in hardware it should be in tech since passkeys are getting adopted more

btw: an item can be in multiple categories at a time
btw: "Pebble time" is a smartwatch.
btw: IF YOU FUCKIG SEE PEBBLE TIME ITS A FUCKING SMART WATCH DO NOT FUCKING PUT IT IN AUDIO
btw: if you are not sure about an item, just put it in misc

Here is the full shop items array:
```json
{shop_items}
```

Please update.
"""


with open("categoryupdating.md", "w") as f:
    f.write(PROMPT)


littleprompt = "Follow the instructions in categoryupdating.md and then delete categoryupdating.md when you are done."

if agent == "codex":
    print("prompting codex...")
    results = os.system(f"codex \"{littleprompt}\"")
elif agent == "copilot":
    print("prompting copilot")

    os.system(f"echo \"{littleprompt}\" | copilot")
    # really complicated slop V
    # # Pass prompt via stdin to avoid shell escaping issues
    # proc = subprocess.Popen(
    #     ["copilot", littleprompt],
    #     stdin=subprocess.PIPE,
    #     stdout=subprocess.PIPE,
    #     stderr=subprocess.STDOUT,
    #     shell=False
    # )
    # output, _ = proc.communicate()
    # print(output.decode('utf-8', errors='replace'))
    # results = proc.returncode
