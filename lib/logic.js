/**
*@param {org.transito.transladoCuenta} data
*@transaction
*/
async function transladoCuenta(data) {
    const lugarOrigen = data.placa.lugarRegistro;
  	data.placa.lugarRegistro = data.nuevaInstitucion;
    // 1. update asset registry
    let assetRegistry = await getAssetRegistry('org.vehiculo.vehiculo');
    await assetRegistry.update(data.placa);
    // Emit an event for the modified participant wallet.
    let event = getFactory().newEvent('org.transito', 'translado');
    event.origen = lugarOrigen;
    event.destino = data.nuevaInstitucion;
    event.estado = "registrado";
    emit(event);
}
