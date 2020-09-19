import sys
import time
import json

hrs = 0
mins = 0
sec = 0
total = 5
start = time.clock()


def seconds(elapsed):
    sec = elapsed
    time.sleep(1)
    return elapsed


def calculation(hrs, mins, sec, total):
    if hrs == 2 and mins < 60 and sec < 60:
        total = 5
    if hrs >= 2 and mins < 60 and sec < 60:
        total += 1

    return total


while True:
    elapsed = (round(time.clock() - start))

    if elapsed == 60:
        start = round(time.clock())
    sec = seconds(elapsed)
    if sec % 60 == 0 and sec != 0:
        mins += 1
        sec = 0
    if mins % 60 == 0 and mins != 0:
        hrs += 1
        mins = 0
    if hrs == 24 and hrs != 0:
        hrs = 0
        break

    mins = round(mins)
    hrs = round(hrs)

    total = calculation(hrs, mins, sec, total)

    data = {
        "time": ("%02d:%02d:%02d" % (hrs, mins, sec)),
        "total": total
    }

    result = json.dumps(data)
    
    # print("%02d:%02d:%02d" % (hrs, mins, sec))
    print(result)
    sys.stdout.flush()


# print("Output from Python")
# print("First name: " + sys.argv[1])
# print("Last name: " + sys.argv[2])
