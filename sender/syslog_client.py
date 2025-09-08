import socket
import sys

FACILITY_MAP = {
    'kern': 0, 'user': 1, 'mail': 2, 'daemon': 3, 'auth': 4, 'syslog': 5, 'lpr': 6, 'news': 7,
    'uucp': 8, 'cron': 9, 'authpriv': 10, 'ftp': 11, 'local0': 16, 'local1': 17, 'local2': 18,
    'local3': 19, 'local4': 20, 'local5': 21, 'local6': 22, 'local7': 23
}

SEVERITY = 6  # info

def send(message, host='localhost', port=514, facility='user', transport='udp'):
    facility_code = FACILITY_MAP.get(facility, 1)
    pri = facility_code * 8 + SEVERITY
    data = f'<{pri}>{message}'
    if transport == 'tcp':
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            sock.connect((host, port))
            sock.sendall(data.encode())
        finally:
            sock.close()
    else:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        try:
            sock.sendto(data.encode(), (host, port))
        finally:
            sock.close()
