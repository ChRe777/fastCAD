
## Example POST Request

```HTTP
URL: https://weare.gleeze.com/io/v2/load
Status: 200 OK
Quelle: Netzwerk
Adresse: 2606:4700:4400::ac40:961c:443 (Proxy)
Initiator: IORestStorageService.js:85
```

The origin is the URL where the main index.html
come from and where the request in send from

    *https://weare.gleeze.com*

``` HTTP
POST /io/v2/load HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: de-DE,de;q=0.9
Connection: keep-alive
Content-Length: 49
Content-Type: application/json
Host: weare.gleeze.com
Origin: https://weare.gleeze.com
Referer: https://weare.gleeze.com/
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15
```

## Problem Mixed Mode

### Question
[blocked] The page at https://weare.gleeze.com/ was not allowed to display insecure content from http://localhost:9000/v2/load.
Not allowed to request resource
Fetch API cannot load http://localhost:9000/v2/load due to access control checks.

### Answer ChatGPT 
The error you're encountering is related to the Mixed Content policy of web browsers. The page at https://weare.gleeze.com/ is served over HTTPS (secure), but you are trying to make a request to http://localhost:9000/v2/load, which is served over HTTP (not secure).

To resolve this issue, you have a few options:

Use HTTPS for your Local Server:
Configure your local development server (running at http://localhost:9000) to use HTTPS. Many modern browsers enforce stricter security policies and block mixed content by default.
Use HTTP for your Local Server During Development:
If HTTPS setup for your local server is not feasible, you can serve your local development environment over HTTP. Update your frontend code to use http://localhost:9000/v2/load instead of https://localhost:9000/v2/load when making requests during development.
Serve Frontend Over HTTP During Development:
If your frontend is served over HTTPS during development, consider serving it over HTTP for local development. This can be adjusted based on your development and deployment environments.
Please note that for production, it's highly recommended to use HTTPS for both your frontend and backend to ensure a secure connection. Modern browsers actively encourage secure connections and may block mixed content.