# Server.py
#

# Imports
#
from typing import Union
from pydantic import BaseModel

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import json

# App
#
app = FastAPI()

# CORS
#

#  THIS ADDRESS ARE ALLOWED TO USE the IO-Server
origins = [
    "http://127.0.0.1:8000",  # APP-Server allowed
    "http://127.0.0.1:5500",  # Live Server / Browser
    "null",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Constants
#
DATA_FOLDER = "./Data/Scene/"
DEFAULT_FILE_NAME = "scene.json"


# Create a Pydantic model to define the request data structure
#
class Item(BaseModel):
    cmd: str
    data: dict
    name: Union[str, None]  # str | None # Python 3.10


# Define a route that handles POST requests
@app.post("/v2/save/")
async def save(item: Item):
    data = json.dumps(item.data, indent=4)
    save_data(data, item.name)
    return item


@app.post("/v2/load/")
async def load(item: Item):
    jsonStr = load_data(item.name)
    return json.loads(jsonStr)


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


# ------------------------------------------------------------------------------
if __name__ == "__main__":
    from uvicorn import run

    run("IOServer:app", host="0.0.0.0", port=9000, reload=True)
