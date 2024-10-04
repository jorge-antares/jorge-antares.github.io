#!/usr/local/bin/python3
"""
Creates unique name JSON files.
Jorge A Garcia      OCTOBER 2024
"""
import json


def findUniqueInONdata(filename: str) -> list:
    with open(filename, "r") as malefile:
        malenames = json.loads(malefile.read())["records"]
    return findUnique([obs[2] for obs in malenames])


def findUnique(mylist: list) -> list:
    uniq = []
    for name in mylist:
        name = name.strip()
        if name in uniq:
            continue
        uniq.append(name)
    uniq.sort()
    return uniq


def getUniqueAndSave(gender: str) -> None:
    """gender = male OR female"""
    uniquenames = findUniqueInONdata(f"{gender}.json")
    newfilename = f"{gender}unique.json"
    uniquejson = json.dumps({"records": uniquenames})
    with open(newfilename, "w") as newfile:
        newfile.write(uniquejson)
    print(f"Saved file:\t{newfilename} \t {len(uniquenames)} entries.")


if __name__ == "__main__":
    getUniqueAndSave("male")
    getUniqueAndSave("female")
