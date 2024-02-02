from zipfile import ZipFile

STR = """\ufeffWEBVTT

1
00:00:00.500 --> 00:00:04.000
Aprendi a me virar e você voltou

2
00:00:04.100 --> 00:00:06.000
do espaço sideral
"""

with ZipFile("test.zip", mode="w") as myzip:
    with myzip.open("test.vtt", mode="w") as vttfile:
        vttfile.write(STR.encode())
    with myzip.open("test.vtt") as myfile:
        bs = myfile.read()
        vtt = bs.decode(
            "utf-8-sig"
        )  # Remove also BOM (\ufeffWEBVTT'),  otherwise webvtt says not valid WEBVTT

        from io import StringIO

        buffer = StringIO(vtt)

        import webvtt

        for caption in webvtt.read_buffer(buffer):
            # print(caption.start)
            # print(caption.end)
            print(caption.text)

        print(myzip.namelist())
