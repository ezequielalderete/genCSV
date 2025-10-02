# 🏢 Carga Automatizada de Activos
Aplicación web para la generación automatizada de archivos CSV para la carga masiva de activos de TI en el sistema de gestión de Avalian.

## 📋 Descripción
Esta herramienta permite generar archivos CSV de manera rápida y eficiente para la carga de nuevos activos tecnológicos, incluyendo información sobre equipamiento, ubicación, proveedores y estados de inventario.

## ✨ Características
- ✅ Generación automática de archivos CSV
- ✅ Nomenclatura personalizada para nombres de activos
- ✅ Validación de serial numbers vs cantidad
- ✅ Descarga directa del archivo generado


## 📦 Instalación
### Uso Directo (Online)
[Simplemente accede al link de la aplicación y comienza a usarla.](https://ezequielalderete.github.io/genCSV/)
### Uso Local
1. Clona este repositorio:
git clone https://github.com/tu-usuario/carga-activos.git

## 📖 Modo de Uso

### Completa los campos requeridos:
Sitio (ubicación física)
Producto (tipo de equipo)
Estado (Stock nuevo / En uso)
Proveedor
Cantidad de artículos
### Ingresa los Serial Numbers:
Un número de serie por línea
La cantidad se actualiza automáticamente
### Nomenclatura (Opcional):
Marca el checkbox "¿Requiere Nombre?"
Ingresa las siglas y número inicial
Se generarán nombres automáticos (ej: ABC0001, ABC0002...)
### Descripción (Opcional):
Si se deja vacío, la columna no aparece en el CSV
### Genera el CSV:
Click en "Generar CSV"
El archivo se descarga automáticamente

## 📄 Formato del CSV Generado
El archivo CSV incluye las siguientes columnas:
Asset Name
Product
Serial Number
Proveedor
Date
Status
Site
Time
Description (opcional)

## 👨‍💻 Autor
### Ezequiel Alderete
Equipo de Infraestructura TIC - Avalian
