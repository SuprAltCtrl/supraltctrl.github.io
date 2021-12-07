var store = [{
        "title": "Proyecto Personal - Empezando 2021.",
        "excerpt":"Presentación Me presento como SuprAltCtrl soy Ingeniero Informático, Máster en Ciberseguridad y Seguridad de la Información y actualmente estoy con un Experto Universitario en Devops &amp; Cloud Computing. Llevo en el mundo laboral unos 4 años, los primeros dos años y medio como desarrollador tanto de backend como de frontend...","categories": [],
        "tags": ["presentacion"],
        "url": "http://0.0.0.0:4000/empezando-proyecto/",
        "teaser":"http://0.0.0.0:4000/assets/images/empezando/empezando.png"},{
        "title": "Java - Comprobar expresión matemática",
        "excerpt":"Enunciado Vamos a crear una función matemática que debe comprobar el formato de la fórmula que se pasa por parámetro, comprobando que todos los paréntesis que tiene la fórmula están nivelados (es decir, están por pares). Devolverá true si están por parejas y false en caso contrario (hay más paréntesis...","categories": [],
        "tags": ["Programación","Java","Stack"],
        "url": "http://0.0.0.0:4000/balanceo-parentesis-java/",
        "teaser":null},{
        "title": "Java – Análisis de un texto",
        "excerpt":"Enunciado Tenemos un texto muy largo (aquí puedes coger el que quieras, siempre que sea muy largo), del que deseamos comprobar cuántas apariciones hay de cada uno de las letras que tenemos en español. Una vez analizado el texto, mostrar por pantalla la letra, el porcentaje de veces que aparece,...","categories": [],
        "tags": ["Java","Arrays","Programacion"],
        "url": "http://0.0.0.0:4000/analisis-documento-java/",
        "teaser":null},{
        "title": "Java - Adivina el número",
        "excerpt":"Enunciado Este minijuego consiste en adivinar el número que genera aleatoriamente entre un rango (mínimo - máximo) que se le pasa por teclado, también le pasamos el número de intentos para ver si somos capaces de adivinarlo en menos intentos del que hemos puesto. Solución En el código se han...","categories": [],
        "tags": ["Programación","Java","Juego"],
        "url": "http://0.0.0.0:4000/adivina-el-numero/",
        "teaser":null},{
        "title": "HackTheBox - Máquina Lame",
        "excerpt":"Enumeración Lanzamos un escaneo para ver los puertos que tiene abiertos y después lanzamos para obtener versiones y scripts básicos de nmap. nmap -sS --min-rate 5000 -p- --open -T5 -v -n -Pn -oG allPorts 10.10.10.3 nmap -sV -sC -p21,22,139,445,3632 10.10.10.3 -oN targeted Y obtenemos el siguiente resultado: 21/tcp open ftp...","categories": [],
        "tags": ["Htb","Pentesting","Linux","Easy"],
        "url": "http://0.0.0.0:4000/htb-lame/",
        "teaser":"http://0.0.0.0:4000/assets/images/htb/lame/lame.png"},{
        "title": "Ejercicio de cadenas",
        "excerpt":"Enunciados Ejercicio 1 - El Abecedario. Generar 4 cadenas String de forma automática (generar no es escribirlas tú, debes hacer esas cadenas de forma automática) e imprimirlas. Las cadenas a generar son las siguientes: El abecedario en mayúsculas, ascedente. El abecedario en mayúsculas, descendente. El abecedario en minúsculas, ascedente. El...","categories": [],
        "tags": ["Java","Programación","Strings"],
        "url": "http://0.0.0.0:4000/ejercicios-de-cadenas/",
        "teaser":null},{
        "title": "HackTheBox - Máquina Legacy",
        "excerpt":"Enumeración Lanzamos un escaneo de todos los puertos con el estado open para ver que servicios hay corriendo. nmap -p- --open -sS --min-rate=5000 -T5 -n -Pn -vvv 10.10.10.4 -oG allPorts Después, lanzamos otro escaneo para obtener versiones. nmap -sC -sV -p139,445 10.10.10.4 -oN targeted El resultado que obtenemos es el...","categories": [],
        "tags": ["Htb","Pentesting","Windows","Easy"],
        "url": "http://0.0.0.0:4000/htb-legacy/",
        "teaser":"http://0.0.0.0:4000/assets/images/htb/legacy/legacy.png"},{
        "title": "HackTheBox - Máquina Devel",
        "excerpt":"Enumeración nmap -p- -sS --min-rate=5000 --open -vvv -Pn -n 10.10.10.5 -oG allPorts nmap -sC -sV -p21,80 10.10.10.5 -oN targeted Resultado: PORT STATE SERVICE VERSION 21/tcp open ftp Microsoft ftpd | ftp-anon: Anonymous FTP login allowed (FTP code 230) | 03-18-17 01:06AM &lt;DIR&gt; aspnet_client | 03-17-17 04:37PM 689 iisstart.htm |_03-17-17 04:37PM...","categories": [],
        "tags": ["Htb","Pentesting","Windows","Easy"],
        "url": "http://0.0.0.0:4000/htb-devel/",
        "teaser":"http://0.0.0.0:4000/assets/images/htb/devel/devel.png"},{
        "title": "HackTheBox - Máquina Popcorn",
        "excerpt":"Enumeración nmap -p- --open -T5 -n -vvv 10.10.10.6 -oG allPorts nmap -sC -sV -p22,80 10.10.10.6 -oN targeted Y obtenemos: 22/tcp open ssh OpenSSH 5.1p1 Debian 6ubuntu2 (Ubuntu Linux; protocol 2.0) 80/tcp open http Apache httpd 2.2.12 ((Ubuntu)) Explotación Vamos a buscar directorios con wfuzz: wfuzz -c -L --hc 404 --hh...","categories": [],
        "tags": ["Htb","Pentesting","Linux","Medium"],
        "url": "http://0.0.0.0:4000/htb-popcorn/",
        "teaser":"http://0.0.0.0:4000/assets/images/htb/popcorn/popcorn.png"},{
        "title": "HackTheBox - Máquina Optimum",
        "excerpt":"Enumeración nmap -p- --open -sS --min-rate 5000 -n -Pn 10.10.10.8 -oG allPorts nmap -sC -sV -p80 10.10.10.8 -oN targeted En el escaneo más especifico solo vemos un puerto abierto: 80/tcp open http HttpFileServer httpd 2.3 Whatweb: whatweb http://10.10.10.8 http://10.10.10.8 [200 OK] Cookies[HFS_SID], Country[RESERVED][ZZ], HTTPServer[HFS 2.3], HttpFileServer, IP[10.10.10.8], JQuery[1.4.4], Script[text/javascript], Title[HFS...","categories": [],
        "tags": ["Htb","Pentesting","Windows","Easy"],
        "url": "http://0.0.0.0:4000/htb-optimum/",
        "teaser":"http://0.0.0.0:4000/assets/images/htb/optimum/optimum.png"},{
        "title": "HackMyVM - Máquina Gift",
        "excerpt":"Enumeración nmap -p- --open -sS --min-rate 5000 -n -Pn 192.168.195.129 -oG allPorts nmap -sC -sV -p80,22 192.168.195.129 -oN targeted En el escaneo más especifico solo vemos un puerto abierto: 22/tcp open ssh OpenSSH 8.3 (protocol 2.0) 80/tcp open http nginx En el puerto 80 vemos que hay una web con...","categories": [],
        "tags": ["HackMyVM.eu","Pentesting","Linux","Easy"],
        "url": "http://0.0.0.0:4000/hackmyvm-gift/",
        "teaser":"http://0.0.0.0:4000/assets/images/hackmyvm/gift/gift.PNG"}]
