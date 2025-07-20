---
title: Setting Up a local DNS server
description: In order to resolve dns names on my local network, I decided to set up a local DNS server. This post documents the steps I took to set up a local DNS server using bind-9. 
src: https://imgur.com/a/naFusJe
author: Abisade Ogunwoolu
slug: setting-up-bind-9-dns-server
date: 2024-11-19
tags:
  - DNS
  - Bind-9
  - Linux
---

While setting up [visual studio code server](https://github.com/coder/code-server) on my respberrry pi, i wanted to access the server using a domain name instead of the ip address. I wasn't too sure about how to go about it, so i went for creating a local DNS network for my home network. I used bind-9 to set up the DNS server. Bind-9 is a popular DNS server software that is used to resolve domain names to IP addresses on the internet. It is a powerful and flexible tool that can be configured to meet the needs of any network which i felt was perfect for my needs!

I first designed the initial architecture for my local network. This was what i came up with:
![Local DNS Architecture](https://i.imgur.com/qzRGYo8.png)

The steps show the journey that a DNS request takes from client throughout the network, with my raspberry pi acting as a central hub that directs traffic to the bind9 server as my router does not support direct DNS configuration. The bind9 server then resolves the domain name to the IP address of the service running on the raspberry pi, allowing the client to access the service using the domain name.

### Step 1: Install Bind-9
bind-9 is available for several different installation environments, including Linux and docker. I chose to install it using a docker container via docker compose. This is the docker compose file I used to set it up:
```yaml
version: '3'

services:
  bind9:
    container_name: dns-bind-9
    image: ubuntu/bind9:latest
    environment:
      - BIND9_USER=root
      - TZ=Europe/London
    ports:
      - "53:53/tcp"
      - "53:53/udp"
    volumes:
      - ./config:/etc/bind
      - ./cache:/var/cache/bind
      - ./records:/var/lib/bind
    restart: unless-stopped
```
This uses the official latest bind-9 image, setting up to use the London timezone (where i am based). Bind-9 uses port 53 for both UDP and TCP so these ports were exposed accordingly. This made the bind-9 runnable. I then did some research into how to configure bind-9 as a DNS server. I found the official bind-9 docs [here](https://bind9.readthedocs.io/en/latest/). 

### Step 2: Configurre named.conf
This allowed me to understand that i needed a `named.conf` file to configure the DNS server. I created a `config` directory and added the `named.conf` file to it. Here is the content of the `named.conf` file:
```bash
acl internal {
    192.xxx.x.x/24;
    192.xxx.x.x/24;
};

options {
    directory "/var/cache/bind";

    forwarders {
        1.1.1.1;
        1.0.0.1;
    };
    forward only;

    // Allow recursive queries from internal networks only
    allow-query { internal; };
    allow-recursion { internal; };

    // Enable recursion explicitly
    recursion yes;

    // DNSSEC validation (optional but recommended)
    dnssec-validation auto;

    // Don't send "authoritative NXDOMAIN" for domains you don't manage
    auth-nxdomain no;

    // Listen on all interfaces (important in container/docker or multi-NIC systems)
    listen-on { any; };
    listen-on-v6 { any; };
};

zone "home.abisade.dev" IN {
    type master;
    file "/etc/bind/home-abisade-dev.zone";
};
```
The `named.conf` file has several components to it:
- **ACL (Access Control List):** Defines which IP ranges are allowed to query the DNS server. In this case, it allows queries from two local networks (my main and guest networks).
- **Options Block:** Configures various settings for the DNS server:
  - **Directory:** Specifies where the DNS server will store its cache files.
  - **Forwarders:** Defines external DNS servers to which queries will be forwarded if the local server cannot resolve them. In this case, it uses Cloudflare's DNS servers.
  - **Allow Query and Recursion:** Restricts who can query the server and perform recursive lookups to the defined ACL.
  - **Recursion:** Enables recursive queries.
  - **DNSSEC Validation:** Enables DNSSEC validation for security.
  - **Listen On:** Configures the server to listen on all interfaces, which is important in a containerized environment.
- **Zone Definition:** Defines a DNS zone for the domain `home.abisade.dev`, specifying that this server is the master for this zone and where to find the zone file.

### Step 3: Create the Zone File
Next, I created the zone file for the domain `home.abisade.dev`. This file contains the DNS records for the domain. I created a `home-abisade-dev.zone` file in the `config` directory with the following content:
```bash
$TTL 2d

$ORIGIN home.abisade.dev.

@           IN       SOA    ns.home.abisade.dev. info.abisade.dev. (
                            2024111100      ; serial
                            12h             ; refresh
                            15m             ; retry
                            3w              ; expire
                            2h              ; minimum ttl
                            )

            IN      NS      ns.home.abisade.dev.

ns          IN      A       192.xxx.x.x

; -- add dns records below

router-home IN      A       192.xxx.x.x
pi-vscode   IN      A       192.xxx.x.x
grafana     IN      A       192.xxx.x.x
prometheus  IN      A       192.xxx.x.x
proxmox     IN      A       192.xxx.x.x
portainer   IN      A       192.xxx.x.x
start       IN      A       192.xxx.x.x
jenkins     IN      A       192.xxx.x.x
vault       IN      A       192.xxx.x.x
budget      IN      A       192.xxx.x.x
pi-hole     IN      A       192.xxx.x.x
```

There is a `SOA` (Start of Authority) record, `NS` (Name Server) record, and `A` (Address) record for setting up the name server and the domain. The `SOA` record contains information about the zone, including the primary name server, the email address of the administrator, and various timers for zone maintenance. The `NS` record specifies the authoritative name server for the domain. The `A` records map hostnames to IP addresses. 

As i've got an nginx reverse proxy, there are many `A` records being directed to the same IP address. This allows me to access different services on my Raspberry Pi using different subdomains, such as `pi-vscode.home.abisade.dev` for the VS Code server, `grafana.home.abisade.dev` for Grafana, and so on.

