---
layout: single
title: HackMyVM - Máquina Gift
excerpt: "Solución de la máquina Gift de HackMyVM"
date: 2021-12-07
classes: wide
header:
  teaser: /assets/images/hackmyvm/gift/gift.PNG
  teaser_home_page: true
tags:
  - HackMyVM.eu
  - Pentesting
  - Linux
  - Easy
---

<p align="center">
<img src="/assets/images/hackmyvm/gift/gift.PNG">
</p>

# Enumeración
```bash
nmap -p- --open -sS --min-rate 5000 -n -Pn 192.168.195.129 -oG allPorts
```

```bash
nmap -sC -sV -p80,22 192.168.195.129 -oN targeted
```

En el escaneo más especifico solo vemos un puerto abierto:

```text
22/tcp open  ssh     OpenSSH 8.3 (protocol 2.0)
80/tcp open  http    nginx
```

En el puerto 80 vemos que hay una web con el siguiente contenido: 

<p align="center">
<img src="/assets/images/hackmyvm/gift/gift-web.PNG">
</p>

# Explotación

Como en la parte de la web no se encuentra nada, solo nos queda el servicio SSH, para lo que haremos fuerza bruta. 

Creamos un diccionario de usuarios con dos usuarios: <b>root</b> y <b>gift</b> y para las contraseñas el mítico <b>rockyou.txt</b>

Para lanzar el ataque de fuerza bruta, usaré Hydra con el siguiente comando:

```bash
hydra -L users -P /usr/share/wordlists/rockyou.txt 192.168.195.129 ssh
```

Resultado:

<p align="center">
<img src="/assets/images/hackmyvm/gift/ssh-bf-gift.PNG">
</p>

