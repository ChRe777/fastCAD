# Imports
#

from fastapi import FastAPI, Cookie, Request
from fastapi.responses import RedirectResponse, HTMLResponse


# App
#
app = FastAPI()


# Define a route that handles POST requests
@app.get("/redirect", response_class=RedirectResponse)
def redirect():
    response = RedirectResponse(url="/destination")
    response.set_cookie(
        key="session_cookie", value="session_123", max_age=5, httponly=True
    )
    return response


# Define ...
@app.get("/destination")
def dest(request: Request):
    session_cookie = request.cookies.get("session_cookie")
    if session_cookie != "session_123":
        return RedirectResponse(url="/login")
    html = """
    <html>
        <body>
            <h1>Hello World!</h1>
            <script>
                document.write(document.cookie)
            </script>
        </body>
    </html>
    """
    return HTMLResponse(content=html)


@app.get("/login")
def login():
    return HTMLResponse(
        content='<h1>Login</h1><a href="/redirect">Set Session Cookie and Redirect</a>'
    )


# ------------------------------------------------------------------------------


if __name__ == "__main__":
    from uvicorn import run

    run("redirect:app", host="127.0.0.1", port=9000, reload=True)
