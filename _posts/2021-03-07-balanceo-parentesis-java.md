---
layout: single
title: Java - Comprobar expresión matemática
excerpt: "Dada una expresión matemática, comprobar que todos los paréntesis están nivelados mediante una pila"
date: 2021-03-07
classes: wide
tags:
  - Programación
  - Java
  - Stack
---

# Enunciado

<p> 
Vamos a crear una función matemática que debe comprobar el formato de la fórmula que se pasa por parámetro, comprobando que todos los paréntesis que tiene la fórmula están nivelados (es decir, están por pares). Devolverá <strong>true</strong> si están por parejas y <strong>false</strong> en caso contrario (hay más paréntesis de apertura que de cierre o viceversa)

Por ejemplo:
<ul>
    <li>La fórmula (4+3)) no está nivelado, ya que hay un paréntesis de cierre más que de apertura</li>
    <li>La fórmula (4*(3+2) no está nivelada, ya que hay un paréntesis de apertura más que de cierre</li>
    <li>La fórmula (4*(3+2)) sí está nivelada, ya que hay el mismo número de paréntesis de apertura que de cierre</li>
</ul>
</p>

# Código

```java
import java.util.Scanner;
import java.util.Stack;

public class Balanceador {

	public static void main(String[] args) {
		Scanner teclado = new Scanner(System.in);
		
		System.out.println("======= MENU =======");
		System.out.println("1. Comprobar formato cadena");
		System.out.println("2. Test");
		int option = askOption(teclado);
		switch(option) {
			case 1:
				System.out.println("Introduzca una formula:");
				String formula = teclado.next();
				showInfo(checkFormat(formula));
				break;
			case 2:
				test();
				break;
		}

	}
	
	public static void test() {
		showInfo(checkFormat("(4+3))")); // False hay un paréntesis de cierra mas que de apertura.
		showInfo(checkFormat("(4*(3+2)")); // False hay un paréntesis de apertura más que de cierre
		showInfo(checkFormat("(4*(3+2))")); // True esta nivelado
	}
	
	public static void showInfo(boolean resultado) {
		if (resultado) {
			System.out.println("Los parentesis están balanceados");
		}else {
			System.out.println("Los parentesis no están balanceados");
		}
	}
	
	public static boolean checkFormat(String formula) {
		Stack<Character> stack = new Stack<Character>();
		for (int i = 0; i < formula.length(); i++) {
			char caracter = formula.charAt(i);
			if (caracter == '(') {
				stack.push(caracter);
			}else if (caracter == ')') {
				if (!stack.empty() && stack.peek() != ')') {
					stack.pop();
				}else {
					stack.push(caracter);
				}
			}
		}
		
		return stack.empty();
	}
	
	public static int askOption(Scanner teclado) {
		System.out.println("Introduce una opción:");
		int opcion;
		do {
			opcion = teclado.nextInt();
			if (opcion!=1 && opcion !=2) {
				System.err.println("No es una opción correcta. Introduzca una opción nueva.");
			}
		}while(opcion!=1 && opcion!=2);
		return opcion;
	}

}

```

{::options parse_block_html="false" /}

# Explicación

<p>El método más importante es <b>checkFormat</b> en el que se comprueba si están balanceados los paréntesis en una fórmula que se pasa por parámetro.</p>

Tenemos dos situaciones:

* Que sea paréntesis izquierdo:
    
    Solo hay que añadirlo a la cola.

* Que sea paréntesis derecho:
    
    Si la cola está vacía y la cima de la pila es distinto de paréntesis derecho entonces sacamos la cima de la pila.

    En el caso que no se cumpla la condición anterior, tenemos que añadirlo a la pila.


Cuando se ejecuta el programa nos muestra un menú con dos opciones:

<ol>
    <li> <b>Comprobar una cadena:</b> le pasamos una cadena por teclado y nos muestra si están balanceados los paréntesis.</li>
    <li> <b>Test:</b> Muestra la salida de los ejemplos que vienen en el enunciado.</li>
</ol>




