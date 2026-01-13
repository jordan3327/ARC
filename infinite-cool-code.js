// Archivo: infinite-cool-code.js
// Este archivo genera líneas de código de manera infinita en la consola para un efecto visual cool.


// Generador de líneas de código aleatorias durante 4 minutos
const codeSnippets = [
  "console.log('Hello, World!');",
  "let x = Math.random();",
  "function suma(a, b) { return a + b; }",
  "const fecha = new Date();",
  "for(let i=0;i<10;i++){console.log(i);}",
  "if(x > 0.5) { alert('Grande!'); }",
  "const arr = [1,2,3,4];",
  "arr.forEach(n => console.log(n));",
  "document.body.style.background = '#222';",
  "setTimeout(() => alert('Tiempo!'), 1000);",
  "let nombre = 'Jordan';",
  "console.log('ARC powered!');",
  "while(true) break;",
  "const PI = 3.1416;",
  "let mensaje = '¡Código cool!';"
];

function randomCodeLine(n) {
  const idx = Math.floor(Math.random() * codeSnippets.length);
  return `// Línea #${n}: ${codeSnippets[idx]}`;
}

function startRandomCode(durationSeconds = 240) {
  let i = 1;
  const interval = setInterval(() => {
    console.log(randomCodeLine(i));
    i++;
  }, 100);
  setTimeout(() => {
    clearInterval(interval);
    console.log('// Fin de la demostración de código aleatorio.');
  }, durationSeconds * 1000);
}

startRandomCode();
