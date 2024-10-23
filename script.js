// Variables para guardar la letra, la vocal seleccionadas y la palabra formada
let letraSeleccionada = '';
let silabaFormada = ''; // Para guardar la última sílaba formada
let palabraFormada = ''; // Para acumular la palabra
let vocalSeleccionada = ''; // Para guardar la vocal seleccionada

// Función para manejar la selección de letras
document.querySelectorAll('.letra').forEach(button => {
    button.addEventListener('click', function() {
        if (letraSeleccionada && silabaFormada) { 
            palabraFormada += silabaFormada; // Agregar la última sílaba a la palabra formada
            silabaFormada = ''; // Reiniciar la última sílaba formada
        }
        letraSeleccionada = this.textContent.toLowerCase(); // Convertir a minúscula
        leerTexto(letraSeleccionada); // Leer la letra al seleccionarla
        mostrarLetraSeleccionada(); // Mostrar la letra seleccionada antes de elegir vocal
    });
});

// Función para manejar la selección de vocales
document.querySelectorAll('.vocal').forEach(button => {
    button.addEventListener('click', function() {
        if (letraSeleccionada) { // Solo si hay una letra seleccionada
            vocalSeleccionada = this.textContent.toLowerCase(); // Convertir a minúscula
            formarSilaba(); // Formar la sílaba letra + vocal
        } else {
            alert("Por favor selecciona una letra antes de una vocal.");
        }
    });
});

// Función para formar y mostrar la sílaba
function formarSilaba() {
    if (letraSeleccionada && vocalSeleccionada) {
        silabaFormada = letraSeleccionada + vocalSeleccionada; // Formar la sílaba
        leerTexto(silabaFormada); // Leer la sílaba formada
        mostrarPalabraFormada(); // Mostrar la sílaba antes de agregar más letras
    }
}

// Función para mostrar solo la letra seleccionada antes de elegir la vocal
function mostrarLetraSeleccionada() {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.textContent = palabraFormada + letraSeleccionada; // Mostrar solo la letra seleccionada
}

// Función para mostrar la palabra formada hasta el momento
function mostrarPalabraFormada() {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.textContent = palabraFormada + silabaFormada; // Mostrar la palabra formada con la última sílaba
}

// Función para leer la palabra completa cuando se presiona el botón
function leerPalabra() {
    const textoCompleto = palabraFormada + silabaFormada; // Combinar la palabra formada con la última sílaba
    if (textoCompleto) {
        leerTexto(textoCompleto); // Leer la palabra completa cuando el botón es presionado
    } else {
        alert("No hay ninguna palabra formada todavía.");
    }
}

// Función para leer el texto en voz alta
function leerTexto(texto) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-ES'; // Cambiar a español (puedes probar es-ES, es-MX o es-CL)

    // Seleccionar una voz femenina en español
    const voices = synth.getVoices();
    const femaleVoice = voices.find(voice => 
        voice.lang.startsWith('es') && voice.name.includes('Google') && voice.name.includes('feminine')
    );

    // Si no encuentra una voz que contenga "feminine", elige la voz más cercana en español
    utterance.voice = femaleVoice || voices.find(voice => voice.lang.startsWith('es'));

    synth.speak(utterance);
}

// Función para limpiar la palabra formada
function limpiarPalabra() {
    palabraFormada = ''; // Reiniciar la palabra
    silabaFormada = ''; // Reiniciar la sílaba
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.textContent = ''; // Limpiar el área de resultado
}
