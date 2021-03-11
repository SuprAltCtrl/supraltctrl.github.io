---
layout: single
title: Java – Análisis de un texto
excerpt: "Analizar un texto, del que deseamos comprobar cuántas apariciones hay de cada una de las letras que tenemos en español, el porcentaje de veces que aparece, el número total de veces que aparece y un histograma para visualizar cuales son las letras que más aparecen."
date: 2021-03-11
classes: wide
tags:
  - Java
  - Arrays
  - Programacion
---

# Enunciado

<p align='justify'>
Tenemos un texto muy largo (aquí puedes coger el que quieras, siempre que sea muy largo), del que deseamos comprobar cuántas apariciones hay de cada uno de las letras que tenemos en español.

Una vez analizado el texto, mostrar por pantalla la letra, el porcentaje de veces que aparece, el número total de veces que aparece, y un histograma (que puedes hacer con asteriscos o algo similar) para visualizar rápidamente cuáles son las letras que más veces aparecen.

Aquí tienes un ejemplo de análisis de las primeras 3 páginas de La Gitanilla, de Miguel de Cervantes:

</p>

<p align="center">
<img src="/assets/images/java/histograma.png">
</p>

# Solución

<p align="justify">Esta es una de las muchas soluciones que tiene el ejercicio, para cada método viene una pequeña explicación de lo que realiza el método.</p>

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {

	/**
	 * Programa inicial
	 * @param args
	 * @throws IOException
	 */
	public static void main(String[] args) throws IOException {
		char[] abecedario = getAbecedario();
		String texto = readFile("texto.txt");
		int[] totales = new int[abecedario.length];
		totales = countCharacters(texto, abecedario, totales);
		int totalCharacters = totalCount(totales);
		paint(abecedario, totales, totalCharacters);
		
	}
	
	/**
	 * Método para pintar el histograma
	 * @param char[] abecedario
	 * @param int[] totales
	 * @param int totalCharacters
	 */
	private static void paint(char[] abecedario, int[] totales, int totalCharacters) {
		System.out.println("=====================");
		System.out.println("ANALISIS DE UN TEXTO");
		System.out.println("=====================");
		for (int i = 0; i < totales.length; i++) {
			System.out.printf("%c %.2f %d %s \n", abecedario[i], ((float)totales[i]/(float)totalCharacters)*100, totales[i], paintAsterisks(totales[i]));
		}
	}
	
	/**
	 * Método para pintar la cadena de asteriscos
	 * @param int veces
	 * @return string 
	 */
	private static String paintAsterisks(int veces) {
		String cadena = "";
		for (int i = 0; i < veces; i++) {
			cadena += "*";
		}
		return cadena;
	}
	
	/**
	 * Método que devuelve la cantidad sumada de todas los caracteres
	 * @param int[] totales
	 * @return int
	 */
	private static int totalCount(int[] totales) {
		int total = 0;
		for (int i = 0; i < totales.length; i++) {
			total += totales[i];
		}
		return total;
	}
	
	/**
	 * Método para contar las veces que aparece un cáracter
	 * @param String texto
	 * @param char[] abecedario
	 * @param int[] totales
	 * @return
	 */
	public static int[] countCharacters(String texto, char[] abecedario, int[] totales) {
		for (int i = 0; i < texto.length(); i++) {
			char aux = texto.charAt(i);
			int index = getIndex(abecedario, aux);
			totales[index]++;
		}
		return totales;
	}
	
	/**
	 * Método que devuelve las posición del carácter en el abecedario
	 * @param char[] abecedario
	 * @param char caracter
	 * @return
	 */
	private static int getIndex(char[] abecedario, char caracter) {
		boolean encontrado = false;
		int index = 0;
		for (int i = 0; i < abecedario.length && !encontrado; i++) {
			if (abecedario[i] == caracter) {
				index = i;
				encontrado = true;
			}
		}
		return index;
	}

	/**
	 * Método para leer el contenido de un fichero.
	 * @param String archivo
	 * @return String
	 * @throws IOException
	 */
	public static String readFile(String archivo) throws IOException {
		String linea, texto = "";
		BufferedReader b = new BufferedReader(new FileReader(archivo));
		while ((linea = b.readLine()) != null) {
			texto += linea;
		}
		b.close();
		return texto;
	}
	
	/**
	 * Método que devuelve un array con todos los caracteres del abecedario
	 * @return char[]
	 */
	private static char[] getAbecedario( ) {
		char[] abecedario = new char[26];
		int index = 0;
		for (int i = 97; i <= 122; i++) {
			abecedario[index] = (char)i;
			index++;
		}
		return abecedario;
	}

}

```

<h2 align="center">¡Os animo a que busquéis vuestra solución!</h2>

