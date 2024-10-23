// Variables para guardar la letra y la vocal seleccionadas
let letraSeleccionada = '';
let vocalSeleccionada = '';

// Función para manejar la selección de letras
document.querySelectorAll('.letra').forEach(button => {
    button.addEventListener('click', function() {
        letraSeleccionada = this.textContent;
        actualizarResultado();
    });
});

// Función para manejar la selección de vocales
document.querySelectorAll('.vocal').forEach(button => {
    button.addEventListener('click', function() {
        vocalSeleccionada = this.textContent;
        actualizarResultado();
    });
});

// Función para mostrar la combinación de letra y vocal
function actualizarResultado() {
    const resultadoDiv = document.getElementById('resultado');
    if (letraSeleccionada && vocalSeleccionada) {
        const combinacion = letraSeleccionada + vocalSeleccionada;
        resultadoDiv.textContent = combinacion;
        leerTexto(combinacion);
    }
}

// Función para leer el texto en voz alta
function leerTexto(texto) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-CL'; // Establecer el idioma a español latino

    // Seleccionar una voz femenina en español
    const voices = synth.getVoices();
    const femaleVoice = voices.find(voice => 
        voice.lang === 'es-MX' && voice.name.includes('Google') && voice.name.includes('feminine')
    );

    // Si no encuentra una voz que contenga "feminine", elige la voz más cercana
    utterance.voice = femaleVoice || voices.find(voice => voice.lang === 'es-MX' && voice.name.includes('Google'));

    synth.speak(utterance);
}

// Asegurarse de que las voces estén cargadas antes de usarlas
window.speechSynthesis.onvoiceschanged = () => {
    const voices = window.speechSynthesis.getVoices();
    console.log(voices);
};
