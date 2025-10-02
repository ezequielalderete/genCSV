// Referencias a elementos del DOM
const checkboxNombre = document.getElementById('requiereNombre');
const inputNomenclatura = document.getElementById('nomenclatura');
const inputDesde = document.getElementById('desde');
const textareaSerialNumbers = document.getElementById('serialNumbers');
const inputCantidad = document.getElementById('cantidad');
const inputDescripcion = document.getElementById('descripcion');
const nomenclaturaGroup = document.getElementById('nomenclaturaGroup');
const desdeGroup = document.getElementById('desdeGroup');

// Event Listeners
checkboxNombre.addEventListener('change', function() {
    if (this.checked) {
        nomenclaturaGroup.classList.remove('hidden');
        desdeGroup.classList.remove('hidden');
    } else {
        nomenclaturaGroup.classList.add('hidden');
        desdeGroup.classList.add('hidden');
        inputNomenclatura.value = '';
        inputDesde.value = '';
    }
});

// Inicializar: ocultar los campos al cargar la página
window.addEventListener('DOMContentLoaded', function() {
    nomenclaturaGroup.classList.add('hidden');
    desdeGroup.classList.add('hidden');
});

textareaSerialNumbers.addEventListener('input', function() {
    const lineas = this.value.split('\n').filter(line => line.trim() !== '');
    inputCantidad.value = lineas.length;
});

document.getElementById('assetForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generarCSV();
});

// Función principal para generar el CSV
function generarCSV() {
    const sitio = document.getElementById('sitio').value;
    const producto = document.getElementById('producto').value;
    const estado = document.getElementById('estado').value;
    const proveedor = document.getElementById('proveedor').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const serialNumbers = document.getElementById('serialNumbers').value;
    const descripcion = inputDescripcion.value.trim();

    // Validación de campos requeridos
    if (!sitio || !producto || !estado || !proveedor || !cantidad || !serialNumbers) {
        mostrarMensaje('Error de Validación', 'Por favor, complete todos los campos requeridos.');
        return;
    }

    // Procesar serial numbers
    const seriales = serialNumbers.split('\n')
        .map(s => s.trim())
        .filter(s => s !== '');

    // Validar cantidad vs seriales
    if (seriales.length !== cantidad) {
        mostrarMensaje('Error de Validación', 
            `Se esperaban ${cantidad} serial numbers, pero se encontraron ${seriales.length}.\n` +
            'Por favor, verifica que la cantidad coincida con el número de seriales ingresados.');
        return;
    }

    // Generar nombres de activos
    let assetNames;
    if (checkboxNombre.checked) {
        const nomenclatura = document.getElementById('nomenclatura').value.toUpperCase().trim();
        const desde = parseInt(document.getElementById('desde').value);

        if (!nomenclatura || isNaN(desde)) {
            mostrarMensaje('Error de Validación', 'Por favor, complete la nomenclatura y el número inicial.');
            return;
        }

        assetNames = generarNombresConNomenclatura(nomenclatura, desde, cantidad);
    } else {
        assetNames = seriales;
    }

    // Crear y descargar CSV
    const incluirDescripcion = descripcion !== '';
    const csvContent = crearCSV(assetNames, seriales, producto, proveedor, sitio, estado, descripcion, incluirDescripcion);
    descargarCSV(csvContent);
}

// Generar nombres con nomenclatura
function generarNombresConNomenclatura(nomenclatura, numeroInicial, cantidad) {
    const nombres = [];
    for (let i = 0; i < cantidad; i++) {
        const numeroActual = numeroInicial + i;
        const numeroFormateado = numeroActual.toString().padStart(4, '0');
        nombres.push(nomenclatura + numeroFormateado);
    }
    return nombres;
}

// Crear contenido del CSV
function crearCSV(assetNames, serialNumbers, producto, proveedor, sitio, estado, descripcion, incluirDescripcion) {
    const now = new Date();
    const fecha = now.toISOString().split('T')[0];
    const hora = now.toTimeString().split(' ')[0];

    // Construir el header según si incluye descripción o no
    let csv = '';
    if (incluirDescripcion) {
        csv = 'Asset Name,Product,Serial Number,Proveedor,Date,Status,Site,Time,Description\n';
    } else {
        csv = 'Asset Name,Product,Serial Number,Proveedor,Date,Status,Site,Time\n';
    }

    // Agregar las filas de datos
    for (let i = 0; i < assetNames.length; i++) {
        if (incluirDescripcion) {
            csv += `${assetNames[i]},${producto},${serialNumbers[i]},${proveedor},${fecha},${estado},${sitio},${hora},${descripcion}\n`;
        } else {
            csv += `${assetNames[i]},${producto},${serialNumbers[i]},${proveedor},${fecha},${estado},${sitio},${hora}\n`;
        }
    }

    return csv;
}

// Descargar archivo CSV
function descargarCSV(contenido) {
    const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace('T', '_').split('.')[0];
    const nombreArchivo = `Assets_${timestamp}.csv`;

    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', nombreArchivo);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    mostrarMensaje('CSV Generado', 
        `Archivo CSV generado exitosamente: ${nombreArchivo}\n\n` +
        `Se procesaron ${contenido.split('\n').length - 2} elementos.`);

    setTimeout(limpiarCampos, 1000);
}

// Limpiar todos los campos del formulario
function limpiarCampos() {
    document.getElementById('assetForm').reset();
    nomenclaturaGroup.classList.add('hidden');
    desdeGroup.classList.add('hidden');
}

// Mostrar modal de información
function mostrarInfo() {
    document.getElementById('modalInfo').style.display = 'block';
}

// Cerrar modal de información
function cerrarModal() {
    document.getElementById('modalInfo').style.display = 'none';
}

// Mostrar modal con mensaje personalizado
function mostrarMensaje(titulo, mensaje) {
    document.getElementById('modalTitulo').textContent = titulo;
    document.getElementById('modalCuerpo').textContent = mensaje;
    document.getElementById('modalMensaje').style.display = 'block';
}

// Cerrar modal de mensaje
function cerrarModalMensaje() {
    document.getElementById('modalMensaje').style.display = 'none';
}

// Cerrar modales al hacer clic fuera de ellos
window.onclick = function(event) {
    const modalInfo = document.getElementById('modalInfo');
    const modalMensaje = document.getElementById('modalMensaje');
    if (event.target == modalInfo) {
        modalInfo.style.display = 'none';
    }
    if (event.target == modalMensaje) {
        modalMensaje.style.display = 'none';
    }
}