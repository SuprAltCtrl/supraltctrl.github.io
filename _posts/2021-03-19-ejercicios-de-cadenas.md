---
layout: single
title: Ejercicio de cadenas
excerpt: "Consta de 5 ejercicios que cayeron en un examen de programación sobre cadenas"
date: 2021-03-19
classes: wide
tags:
  - Java
  - Programación
  - Strings
---

<h1 style="color:#d7f798">Enunciados</h1>

<h2 style="color:#d7f798">Ejercicio 1 - El Abecedario.</h2>

<p align="justify">
Generar 4 cadenas String de forma automática (generar no es escribirlas tú, debes hacer esas cadenas de forma automática) e imprimirlas.</p>

<p>Las cadenas a generar son las siguientes:</p>
<ul>
    <li>El abecedario en mayúsculas, ascedente.</li>
    <li>El abecedario en mayúsculas, descendente.</li>
    <li>El abecedario en minúsculas, ascedente.</li>
    <li>El abecedario en minúsculas, descendente.</li>
</ul>

{::options parse_block_html="true" /}

<details><summary markdown="span" style="color:#d7f798">Clic para ver la solución!</summary>

 ```java 
    
    public class Ejercicio1 {
        
        public static void main(String[] args) {
            
            System.out.println("Abecedario mayuscula ascendente: " + generarAbcMayusAsc());
            System.out.println("Abecedario mayuscula ascendente: " + generarAbcMayusDesc());
            System.out.println("Abecedario minuscula ascendente: " + generarAbcMinusAsc());
            System.out.println("Abecedario minusculas ascendente: " + generarAbcMinusDesc());
        }
        
        public static String generarAbcMayusAsc() {
            String abecedario = "";
            for (int i = 65; i <= 90; i++) {
                abecedario += Character.toString(i);
            }
            return abecedario;
        }
        
        public static String generarAbcMayusDesc() {
            String abecedario = "";
            for (int i = 90; i >= 65; i--) {
                abecedario += Character.toString(i);
            }
            return abecedario;
        }
        
        public static String generarAbcMinusAsc() {
            String abecedario = "";
            for (int i = 97; i <= 122; i++) {
                abecedario += Character.toString(i);
            }
            return abecedario;
        }
        
        public static String generarAbcMinusDesc() {
            String abecedario = "";
            for (int i = 122; i >= 97; i--) {
                abecedario += Character.toString(i);
            }
            return abecedario;
        }
    }

```
</details>
<br/>

{::options parse_block_html="false" /}

<h2 style="color:#d7f798">Ejercicio 2 - Conversion de caracteres.</h2>

<p>Leer una cadena (asegurarse de que no esté vacía) y generar otra cadena donde se intercambian las mayúsculas con las minúsculas y viceversa.</p>
<pre>
Ejemplo:
    Cadena leída: "Erase una Vez uN CuentO"
    Cadena resultante: "eRASE UNA vEZ Un cUENTo"
</pre>

{::options parse_block_html="true" /}

<details><summary markdown="span" style="color:#d7f798">Clic para ver la solución!</summary>

 ```java 
    
import java.util.Scanner;

    public class Ejercicio3 {

        public static void main(String[] args) {
            Scanner teclado = new Scanner(System.in);
            
            String cadena = pedirCadena(teclado);
            System.out.println("Cadena original "+cadena);
            System.out.println("Cadena reemplazada "+reemplazarCadena(cadena));
            
            teclado.close();
        }
        
        /**
        * Método para pedir una cadena y asegurarnos de volver a pedirla en caso de que sea vacía o un espacio.
        * @param entrada
        * @return
        */
        public static String pedirCadena(Scanner entrada) {
            System.out.println("Introduce una cadena para intercambiar entre mayuscula y minusculas");
            String cadena = "";
            do {
                cadena = entrada.nextLine();
                if (cadena.isEmpty() || cadena.isBlank()) {
                    System.out.println("No se puede dejar la cadena vacía, inserte una de nuevo");
                }
            }while(cadena.isEmpty() || cadena.isBlank());
            
            return cadena;
        }
        
        /**
        * Comprobamos médiante el código ascii si es mayúsculas o minúscula para convertirla a la opuesta.
        * @param cadena
        * @return
        */
        public static String reemplazarCadena(String cadena) {
            String reemplazada = "";
            for (int i = 0; i < cadena.length(); i++) {
                char caracter = cadena.charAt(i);
                if ((int) caracter >= 65 && (int) caracter <=90 ) {
                    reemplazada += Character.toString(caracter).toLowerCase();
                }else if ((int) caracter >= 97 && (int) caracter <= 122) {
                    reemplazada += Character.toString(caracter).toUpperCase();
                }else {
                    reemplazada += Character.toString(caracter);
                }
            }
            return reemplazada;
        }
    }

```
</details>
<br/>

{::options parse_block_html="false" /}

<h2 style="color:#d7f798">Ejercicio 3 - Sustitucion de caracteres</h2>

<p align="justify">Leída una cadena de al menos 3 carácteres de longitud y leídos dos caracteres por separado (validar que se lee un carácter cada vez), crear una cadena resultante donde se sustituye el primer carácter leído por el segundo.</p>

<p><span style="color:#B47815">Está prohibido el uso de la función replace.</span><br><br>No se contempla el problema de las tildes en este ejercicio.</p>

<pre>
Cadena leída: "¿Hola que tal?"
Carácter original: a
Carácter sustituto: e
Cadena resultante: "¿Hole que tel?"
</pre>

{::options parse_block_html="true" /}

<details><summary markdown="span" style="color:#d7f798">Clic para ver la solución!</summary>

 ```java 
    
import java.util.Scanner;

public class Ejercicio4 {

	public static void main(String[] args) {
		Scanner entrada = new Scanner(System.in);
		String cadena = "";
		String original = "";
		String sustituir = "";
		do {
			System.out.println("Introduce una cadena para reemplazar un caracter por otro");
			cadena = entrada.nextLine();
			System.out.println("Introduce el caracter original");
			original = entrada.next();
			System.out.println("Introduce el caracter para sustituir");
			sustituir = entrada.next();
			
		}while(cadena.length() < 3 && original.length() != 1 && sustituir.length() != 1);
		entrada.close();
		System.out.println("La cadena original es: "+cadena);
		System.out.println("La cadena sustituida es: "+reemplazarCaracter(cadena, original.charAt(0), sustituir.charAt(0)));
	}
	
	public static String reemplazarCaracter(String cadena, char original, char sustituir) {
		String reemplazada = "";
		for (int i = 0; i < cadena.length(); i++) {
			if (cadena.charAt(i) == original) {
				reemplazada += Character.toString(sustituir);
			}else {
				reemplazada += cadena.charAt(i);
			}
		}
		return reemplazada;
	}
}

```
</details>
<br/>

{::options parse_block_html="false" /}

<h2 style="color:#d7f798">Ejercicio 4 - Cadenas palindromas</h2>

<p align="justify">Introducir una cadena y ver si es palindroma, esto es, se lee igual de derecha a izquierda que de izquierda a derecha.</p>

<p>La frase original puede contener espacios y signos de puntuación, que deben saltarse, al igual que los números que pudiera tener.

Ejemplo:

<ul>
    <li>Si es palindromo: "Ana"</li>
    <li>Si es palindromo: "Dabale arroz a la zorra el Abad." (se ignora las mayúsculas y se salta el punto del final)</li>
    <li>No es palíndromo: "Hoalao" (falla en la h")</li>
    <li>No es palindromo: "OalaP" (falla en la P)</li>
    <li>Si es palindromo: "Oala o 1998" (se salta los numeros)</li>
</ul>
</p>

{::options parse_block_html="true" /}

<details><summary markdown="span" style="color:#d7f798">Clic para ver la solución!</summary>

 ```java 
    
import java.util.Scanner;

public class Ejercicio5 {

	public static void main(String[] args) {
		Scanner entrada = new Scanner(System.in);
		System.out.println("Introduce una cadena para comprobar si es palindroma");
		String cadena = entrada.nextLine();
		if (isPalindrome(cadena.toLowerCase())) {
			System.out.println("Es palindroma");
		}else {
			System.out.println("No es palindroma");
		}
		entrada.close();

	}
	
	static boolean isPalindrome(String str) 
    {   
        int i = 0, j = str.length() - 1; 
  
        while (i < j) { 
        	
        	while((int) str.charAt(i) < 97 || (int) str.charAt(i) > 122) {
        		i++;
        	}  
        	
        	while((int) str.charAt(j) < 97 || (int) str.charAt(j) > 122) {
        		j--;
        	} 
  
            if (str.charAt(i) != str.charAt(j)) {
            	return false;
            }

            i++; 
            j--; 
        } 
        return true; 
    } 
}
```
</details>
<br/>

{::options parse_block_html="false" /}
