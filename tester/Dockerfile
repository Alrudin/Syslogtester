FROM ubuntu:latest

RUN apt-get update && apt-get install -y syslog-ng syslog-ng-core
RUN mkdir -p /var/log/syslog-ng
RUN apt-get install -y net-tools
RUN apt-get install -y tcpdump

# Copy default config (can be overridden by mounting a volume)
COPY syslog-ng.conf /etc/syslog-ng/syslog-ng.conf

CMD ["syslog-ng", "-F", "-f", "/etc/syslog-ng/syslog-ng.conf"]
