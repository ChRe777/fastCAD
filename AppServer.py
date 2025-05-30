# Server.py
#

# Imports
#
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles



# App
#
app = FastAPI()

# CORS
#
origins = [
    "http://127.0.0.1:5500",  # Local Development
    "https://weare.gleeze.com",  # Over Server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # ["*"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Constants
#
index_html = "./index.html"

# Mount for static files
#
app.mount("/Components", StaticFiles(directory="Components"), name="Components")
app.mount("/Services", StaticFiles(directory="Services"), name="Services")
app.mount("/Assests", StaticFiles(directory="Assests"), name="Assests")
app.mount("/Stores", StaticFiles(directory="Stores"), name="Stores")
app.mount("/Scripts", StaticFiles(directory="Scripts"), name="Scripts")
app.mount("/Views", StaticFiles(directory="Views"), name="Views")
app.mount("/API", StaticFiles(directory="API"), name="API")
app.mount("/Tests", StaticFiles(directory="Tests"), name="Tests")


# Define a route that handles POST requests
#
@app.get("/", response_class=HTMLResponse)
async def index():
    return FileResponse(index_html)


# ------------------------------------------------------------------------------
if __name__ == "__main__":
    from uvicorn import run

    run("AppServer:app", host="0.0.0.0", port=8000, reload=True)
