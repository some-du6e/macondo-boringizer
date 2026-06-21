# python bc im a chud that doesnt know powershell or bash
import os
import shutil
blocklist = [
    "build.py",
    ".copilot-cli.ts",
    "README.md",
    ".gitignore"
]
folderblocklist = [
    ".github",
    ".git"
]



if os.path.exists("dist"):
    prompt = input("hey dist/ alr exists, say y to delete it \n")
    if prompt == "y":
        shutil.rmtree("dist/")

if os.path.exists("dist.zip"):
    prompt = input("hey dist.zip alr exists, say y to delete it \n")
    if prompt == "y":
        os.remove("dist.zip")


print("Copying entire folder to dist...")
try:
    ignore_patterns = shutil.ignore_patterns('.git', '.github', "img", "tests", "scripts")
    shutil.copytree("src/", "dist/", ignore=ignore_patterns)
except Exception as e:
    print("Oops smth happened: ", e)
    exit()
print("Copied succesfully!")

print("Deleting blocklist files...")
try:
    for item in blocklist:
        if os.path.exists("dist/"+item):
            os.remove("dist/"+item)
except Exception as e:
    print("Oops smth happened: ", e)
    exit()
print("Deleted succesfully!")

print("Zipping dist...")
try:
    shutil.make_archive('dist', 'zip', 'dist')
except Exception as e:
    print("Oops smth happened: ", e)
    exit()
print("Zipped succesfully!")

print("Finished succesfully!")