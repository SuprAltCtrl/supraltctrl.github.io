---
layout: single
title: Java - Adivina el número
excerpt: "Juego en el que tienes que adivinar un número que se genera en un rango"
date: 2021-03-13
classes: wide
tags:
  - Programación
  - Java
  - Juego
---

# Enunciado

Este minijuego consiste en adivinar el número que genera aleatoriamente entre un rango (mínimo - máximo) que se le pasa por teclado, también le pasamos el número de intentos para ver si somos capaces de adivinarlo en menos intentos del que hemos puesto.

# Solución

En el código se han puesto algunos comentarios para diferenciar cada parte del programa y en los métodos para ver que parámetros tienen, que retornan y para que sirven.

```java
import java.util.Scanner;

public class Main {

	public static void main(String[] args) {
		
		//DECLARACIÓN DE VARIABLES
		Scanner teclado = new Scanner(System.in);
		int numero, minimo, maximo, numeroOculto, intentos;
		boolean encontrado = false;
		
		// MENU Y RECOGIDA DE DATOS
		System.out.println("=====< ADIVINA EL NÚMERO >=======");
		System.out.println("Introduce el rango de número que quieres jugar (min al max)");
		System.out.println("Mínimo:");
		minimo = askNumber(teclado);
		System.out.println("Máximo:");
		maximo = askNumber(teclado);
		numeroOculto = generateRandomNumber(maximo, minimo);
		System.out.println("Introduce el número de intentos que quieres adivinarlo");
		intentos = askNumber(teclado);
		encontrado = false;
		
		// LÓGICA DEL PROGRAMA
		while(!encontrado && intentos > 0) {
			System.out.println("Introduce el número");
			numero = askNumber(teclado);
			if (numero == numeroOculto) {
				encontrado=true;
				System.out.println("Has encontrado el número");
			}else {
				intentos--;
				if (numero < numeroOculto) {
					System.out.println("El número oculto es mayor");
				}else {
					System.out.println("El número oculto es menor");
				}
			}
		}
		teclado.close();
	}
	
	/**
	 * Método que pide un número y valida para evitar excepciones
	 * @param teclado
	 * @return int
	 */
	public static int askNumber(Scanner teclado) {
		boolean isValid;
		String entrada = ""; 
		do {
			isValid = true;
			entrada = teclado.next();
			try {
				Integer.parseInt(entrada);
			}catch (Exception e) {
				isValid = false;
			}
			if (entrada.isBlank() || entrada.isEmpty() || !isValid) {
				System.out.println("[ERROR] Valor incorrecto.\nIntroduce un nuevo valor:");
			}
		}while (entrada.isBlank() || entrada.isEmpty() || !isValid);
		
		return Integer.parseInt(entrada);
	}
	
	/**
	 * Método que genera un numero aleatorio entre dos valores
	 * @param max
	 * @param min
	 * @return int 
	 */
	public static int generateRandomNumber(int max, int min) {
		return min + (int)(Math.random() * ((max - min) + min));
	}
}

```
<h2 align="center">¡Os animo a que busquéis vuestra solución!</h2>