# Server.py
#

# Imports
#
from typing import Union
from pydantic import BaseModel

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import json
from zipfile import ZipFile

# App
#
app = FastAPI()

# CORS
#

#  THIS ADDRESS ARE ALLOWED TO USE the IO-Server
origins = [
    "https://weare.gleeze.com",  # Dynu.com
    "http://127.0.0.1:8000",  # APP-Server allowed
    # "http://127.0.0.1:5500",  # Live Server / Browser
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.add_middleware(HTTPSRedirectMiddleware)

# Constants
#
DATA_FOLDER = "./Data/Scene/"
DEFAULT_FILE_NAME = "scene.json"
ZIP_FILE = "store.zip"


# Create a Pydantic model to define the request data structure
#
class Item(BaseModel):
    cmd: str
    data: dict
    name: Union[str, None]  # str | None # Python 3.10


# Define a route that handles POST requests
@app.post("/v2/save")
async def save(item: Item):
    data = json.dumps(item.data, indent=4)
    # save_data(data, item.name)
    save_data_to_zip(data, item.name)
    return item


@app.post("/v2/load")
async def load(item: Item):
    # jsonStr = load_data(item.name)
    try:
        jsonStr = load_data(item.name)
        # jsonStr = load_data_from_zip(item.name)
        return json.loads(jsonStr)
    except KeyError as e:
        return str(e)


@app.get("/api/")
async def api():
    return "Hello from API"


# -FILESYSTEM-------------------------------------------------------------------


def load_data(name):
    file_name = name
    if name == None:
        file_name = DEFAULT_FILE_NAME

    # Specify the file name and mode (e.g., 'r' for read)
    # Open the file in read mode
    with open(DATA_FOLDER + file_name, "r") as file:
        # Read the entire content
        content = file.read()
        print(f"Load from {DATA_FOLDER+file_name}")
        return content


# ------------------------------------------------------------------------------


def save_data(data, name):
    file_name = name
    if name == None:
        file_name = DEFAULT_FILE_NAME

    # Make backup
    import time

    # Get the current Unix timestamp in seconds
    timestamp_seconds = int(time.time())

    # Create a backup
    #
    try:
        with open(DATA_FOLDER + file_name, "r") as file:
            # Read the entire content
            old_data = file.read()
            backup_file_name = DATA_FOLDER + "_".join(
                ["time", str(timestamp_seconds), file_name]
            )
            with open(backup_file_name, "w") as file:
                file.write(old_data)
    except:
        print("file not found")

    # Open the file in write mode
    #
    with open(DATA_FOLDER + file_name, "w") as file:
        file.write(data)

    print(f"Data saved to {DATA_FOLDER+file_name}")


# -ZIP-----------------------------------------------------------------------------


def save_data_to_zip(data, name):
    with ZipFile(ZIP_FILE, mode="a") as store_zip:
        store_zip.writestr(name, data=data)
        store_zip.printdir()


# ------------------------------------------------------------------------------


##
##
def load_data_from_zip(name):
    with ZipFile(ZIP_FILE, mode="r") as store_zip:
        with store_zip.open(name) as json_file:
            content = json_file.read().decode("UTF-8")
            return content


# ------------------------------------------------------------------------------

# Local Cert created with openSSL and trusted with Cert App
#
ssl_certfile = "/opt/homebrew/etc/nginx/certs/cert.pem"
ssl_keyfile = "/opt/homebrew/etc/nginx/certs/cert.key"
ssl_keyfile_password = "#foobar#"

if __name__ == "__main__":
    from uvicorn import run

    run(
        "IOServer:app",
        host="0.0.0.0",
        port=9000,
        reload=False,
        ssl_keyfile=ssl_keyfile,
        ssl_keyfile_password=ssl_keyfile_password,
        ssl_certfile=ssl_certfile,
    )

    # run("IOServer:app", host="0.0.0.0", port=9000, reload=True)
