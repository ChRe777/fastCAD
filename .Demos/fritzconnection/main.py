from fritzconnection import FritzConnection

fc = FritzConnection(address="192.168.178.1", user="user", password="pw")
print(fc)  # print router model information
