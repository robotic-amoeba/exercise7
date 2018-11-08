# Ejercicio 7

## Introducción

En este punto ya hemos conseguido tener una versión funcional del servicio con una alta disponibilidad y capaz de gestionar una cantidad elevada de peticiones. Por un lado podemos enviar mensajes, y por otro lado, somos capaces de cobrar por el envio de éstos.

### 1 - Divide y vencerás

Con el paso del tiempo, es posible que decidamos ampliar o modificar la aplicación, pero con la arquitectura actual puede ser complicado. Para ello, vamos a implementar una arquitectura basada en eventos. Esta arquitectura nos permitirá añadir features a nuestra aplicación independientes del resto con mayor facilidad, independencia y eficiencia.
 
- Extrae la funcionalidad ya implementada sobre el cobro y creación de crédito a un nuevo servicio creando un contenedor para él.
- Separa las bases de datos para que cada servicio sólo tenga que almacenar la información que le corresponda. Esto es, el servicio de envío de mensajes tendrá su propia base de datos con el registro de los envíos, mientras que el nuevo servicio de gestión de crédito tendrá su propia base de datos para gestionarlo.
- Crea un medio de comunicación entre ambos servicios. De esta forma, cuando un servicio cree o actualize datos, el servicio publicará un evento (en una cola, por ejemplo) para que otro servicio pueda consumirlo y reaccione actualizando sus propios datos.

### 2 - ¿Cómo va lo mío?

Ahora los dos servicios tienen que procesar la información de forma independiente además de ser capaces de comunicarse entre ellos. Comprueba que la aplicación es capaz de llevar a cabo la funcionalidad hasta ahora implementada pero aplicando una arquitectura basada en eventos.

- Piensa en los posibles estados de un mensaje ahora que se procesan entre servicios.
- ¿Cómo afectan estos cambios a nuestro modelo de datos? ¿Qué queremos almecenar ahora? ¿Y cómo?
- Modifica el registro de mensajes para que sea capaz de reflejar estos estados.

