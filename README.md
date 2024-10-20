# PETSHOPAPP

Es un proyecto desarrollado en Angular version 17.3.10, app la cual permite consumir la API de Local Business Data (https://rapidapi.com/letscrape-6bRBa3QguO5/api/local-business-data/playground), obteniendo información de los petshop en Colombia. asi como realizar las operaciones de CRUD de forma temporal guardando la información en localstorage hasta recargar la pagina, en ese caso volveria la data original, tambien permite ubicar los negocios obtenidos en el mapa. Debido a las restricciones para el consumo de la API seleccionada, se guardo un mock de datos para el caso de que la suscripción no permita mas peticiones y se pueda seguir usando la app sin problema, de igual forma si se desea probar con alguna suscripción propia se puede remplazar el x-rapidapi-key desde el servicio de business.service.

## Correr el proyecto:

Para correr el proyecto se debe inicialmente se debe ejecutar el comando `npm install` desde la carpeta raiz del proyecto, una vez instaladas las dependencias se puede ejectuar `ng serve` o `npm run start` de esa forma quedaria corriendo el proyecto en: `http://localhost:4200/`.

## Datos tecnicos:

Se utiliza la libreria `Tailwind css` para poder realizar una maquetación de forma mas rapida y de igual forma se usa `Angular Material` bajo lo solicitado en la prueba.

Para el resonsive se tuvo en cuenta la siguientes medidas: - FullHD: 1920 x 1080 - HD: 1280 X 720 - iPad: 810 x 1080 - iPad mini: 768 x 1024 - iPhone 11 pro
