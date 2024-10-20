# PETSHOPAPP

Es un proyecto desarrollado en Angular versión 17.3.10, esta app permite consumir la API de Local Business Data (https://rapidapi.com/letscrape-6bRBa3QguO5/api/local-business-data/playground), obteniendo información de los petshop en Colombia, así como realizar las operaciones de CRUD de forma temporal guardando la información en localstorage hasta recargar la página, en ese caso volvería la data original, también permite ubicar los negocios obtenidos en el mapa. Debido a las restricciones para el consumo de la API seleccionada, se guardó un mock de datos para el caso de que la suscripción no permita más peticiones y se pueda seguir usando la app sin problema, de igual forma si se desea probar con alguna suscripción propia se puede remplazar el x-rapidapi-key desde el servicio de business.service.

## Correr el proyecto:

Para correr el proyecto, se debe inicialmente se debe ejecutar el comando `npm install` desde la carpeta raíz del proyecto, una vez instaladas las dependencias, se puede ejecutar `ng serve` o `npm run start` de esa forma quedaría corriendo el proyecto en: `http://localhost:4200/`.

## Datos técnicos:

Se utiliza la librería `Tailwind css` para poder realizar una maquetación de forma mas rapida y de igual forma se usa `Angular Material` bajo lo solicitado en la prueba.

Para el resonsive se tuvo en cuenta las siguientes medidas: - FullHD: 1920 x 1080 - HD: 1280 X 720 - iPad: 810 x 1080 - iPad mini: 768 x 1024 - iPhone 11 pro
