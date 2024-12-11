import express from 'express' 
import {PORT} from './config.js'

const app = express();

//manejo de json
app.use(express.json())

//importacion de rutas
import dependiente from './routes/dependiente.js'
import persona from './routes/persona.js'
import reside from './routes/reside.js'
import trabajo from './routes/trabajo.js'
import gobierna from './routes/gobierna.js'
import municipio from './routes/municipio.js'
import vivienda from './routes/vivienda.js'
import ubicacion from './routes/ubicacion.js'
import propietario from './routes/propietario.js'



app.use(persona);
app.use(dependiente);
app.use(reside);
app.use(trabajo);
app.use(gobierna);
app.use(municipio);
app.use(vivienda);
app.use(ubicacion);
app.use(propietario);


app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})