# Translados de Cuenta Caso Hackathon Data Tools

Caso de uso de transalados de cuenta utilizando hyperledger blockchain y siguiendo descripcion  caso de uso 1.

El diseño de la red (Business Network) contien los siguientes elementos:

**Participant** </p> 
`institucion`: organismos de transito (ciudades), ministerio de transporte. </p>
`solicitante`: usuario dueño del automovil.

**Asset** </p> 
`vehiculo`: formato de propiedades del vehiculo a partir de la tarjeta de propiedad </p>

**Transaction**
`transladoCuenta`: translado de un registro de un `vehiculo` de un organismo de transito a otro.

La logica de negocio de este caso implica el cambio del registro de un `vehiculo` de un organismo de transito a otro. Para lo cual se crea un tipo de transaccion `transladoCuenta` que afecta el estado del blockchain. 

Para utilizar la red, vamos a seguir el siguiente ejemplo en el **Test** tab:

## Creacion de participantes 

Crear dos organismos de transito `Sibate` y `Chia`. Los organismos estan identificados por el nombre de la ciudad en que operan:

```
{
  "$class": "org.transito.institucion",
  "oficina": "Sibate",
  "numeroDocumento": "702",
  "documento": "nit",
  "tipo": "oficinaTransito",
  "direccion": {
    "$class": "org.transito.Direccion",
    "direccion": "Calle principal Sibate",
    "telefono": "1234567",
    "municipio": "Sibate",
    "Pais": "Colombia"
  }
}  
```

```
{
  "$class": "org.transito.institucion",
  "oficina": "Chia",
  "numeroDocumento": "701",
  "documento": "nit",
  "tipo": "oficinaTransito",
  "direccion": {
    "$class": "org.transito.Direccion",
    "direccion": "Calle principal Chia",
    "telefono": "7890123",
    "municipio": "Chia",
    "Pais": "Colombia"
  }
} 
```

Crear un `solicitante` dueño del vehiculo, quien es la persona que realiza el tramite. El `solicitante` se identifica mediante el numero de la cedula (campo solId).

```
{
  "$class": "org.transito.solicitante",
  "solId": "79935958",
  "documento": "cedulaCiudadanaia",
  "nombre": "Juan",
  "apellido": "Perez",
  "direccion": {
    "$class": "org.transito.Direccion",
    "direccion": "Calle 5 no 24 34",
    "telefono": "67890123",
    "municipio": "Bogota",
    "Pais": "Colombia"
  }
}
```

## Creacion de participantes 

Creacion del activo equivale al registro de un `vehiculo` en un organismo de transito `institucion: Sibate` local. El vehiculo se identifica mediante la placa  

```
{
  "$class": "org.vehiculo.vehiculo",
  "licenciaTransito": "0000123455666",
  "placa": "UVS200",
  "marca": "Mazda",
  "linea": "323",
  "cilindraje": "1000",
  "color": "Rojo",
  "servicio": "particular",
  "clase": "automovil",
  "tipo": "sedan",
  "combustible": "gasolina",
  "propietario": "resource:org.transito.solicitante#79935958",
  "lugarRegistro": "resource:org.transito.institucion#Sibate"
}
```

## Translado de Cuenta

La transaccion `transladoCuenta` implica un cambio de organismo de transito `institucion: Chia`  para un `vehiculo: UVS200`. Es decir el `vehiculo: UVS200` inicialmente se registro en el organismo de transito de Sibate y ahora se realiza un cambio en el organismo de transito donde estara registrado.

```
{
  "$class": "org.transito.transladoCuenta",
  "placa": "resource:org.vehiculo.vehiculo#UVS200",
  "nuevaInstitucion": "resource:org.transito.institucion#Chia"
}
```
Es importante notar que la ejecucion de la transaccion implica un cambio en el estado de del activo `vehiculo: UVS200` con respecto al campo lugar de registro.

La transaccion emite un evento que captura el origen `institucion: Sibate` y destino `institucion: Chia` de las instituciones involucradas y afecta el estado del tramite.

```
{
 "$class": "org.transito.translado",
 "origen": "resource:org.transito.institucion#Sibate",
 "destino": "resource:org.transito.institucion#Chia",
 "estado": "registrado",
 "eventId": "cfd2e77c-5938-44a1-bab2-e15a42ba140d#0",
 "timestamp": "2018-10-18T17:02:21.522Z"
}
```
