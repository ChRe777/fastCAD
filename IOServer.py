# Server.py
#

# Imports
#
from typing import Union
from pydantic import BaseModel

from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

import json

# App
#
app = FastAPI()

# CORS
#
origins = ["http://127.0.0.1:5500", "null", "http://www.orf.at/", "null"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Constants
#
file_name = "./Data/Data.txt"
data_folder = "./Data/Scene/"
default_file_name = "scene.json"
app_html = "./App.html"

# Define the directory where your script and css files are located
#
from pathlib import Path

# Mount for static files
#
app.mount("/Components", StaticFiles(directory="Components"), name="Components")
app.mount("/Services", StaticFiles(directory="Services"), name="Services")
app.mount("/Assests/css", StaticFiles(directory="Assests/css"), name="Css")
app.mount("/Stores", StaticFiles(directory="Stores"), name="Stores")


# Create a Pydantic model to define the request data structure
#
class Item(BaseModel):
    cmd: str
    data: dict
    name: Union[str, None]  # str | None # Python 3.10


# Define a route that handles POST requests
#
@app.get("/", response_class=HTMLResponse)
@app.post("/", response_class=HTMLResponse)
def index():
    with open(app_html, "r") as file:
        content = file.read()
        print(f"Load from {file_name}")
        return content


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
        file_name = default_file_name

    # Specify the file name and mode (e.g., 'r' for read)
    # Open the file in read mode
    with open(data_folder + file_name, "r") as file:
        # Read the entire content
        content = file.read()
        print(f"Load from {data_folder+file_name}")
        return content


def save_data(data, name):
    file_name = name
    if name == None:
        file_name = default_file_name

    # Make backup
    import time

    # Get the current Unix timestamp in seconds
    timestamp_seconds = int(time.time())

    # Create a backup
    #
    try:
        with open(data_folder + file_name, "r") as file:
            # Read the entire content
            old_data = file.read()
            backup_file_name = data_folder + "_".join(
                ["time", str(timestamp_seconds), file_name]
            )
            with open(backup_file_name, "w") as file:
                file.write(old_data)
    except:
        print("file not found")

    # Open the file in write mode
    #
    with open(data_folder + file_name, "w") as file:
        file.write(data)

    print(f"Data saved to {data_folder+file_name}")


# ------------------------------------------------------------------------------
# LTI launch
#
@app.post("/lti")
async def lti_launch(
    oauth_consumer_key: str = Form(...),
    user_id: str = Form(...),
    custom_course_id: str = Form(...),
):
    # Validate the LTI request here
    print("oauth_consumer_key", oauth_consumer_key)
    print("user_id", user_id)
    print("custom_course_id", custom_course_id)

    # redirect_url = f"http://127.0.0.1:8000/"
    redirect_url = f"http://www.orf.at/"

    # Perform any necessary checks before redirection
    # If conditions are met, perform the redirection
    return RedirectResponse(url=redirect_url)


# LTI Option for Cors preflight
#
# Needed for fetch api because it sends a preflight
# to check if endpoint is allowed
@app.options("/lti")
async def lti_launch_cors():
    return {}


# ------------------------------------------------------------------------------
if __name__ == "__main__":
    from uvicorn import run

    run("IOServer:app", host="0.0.0.0", port=8000, reload=True)
