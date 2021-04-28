import {Viaje} from '../models/Viajes.js';
import {Testimonial} from '../models/Testimoniales.js';

const paginaInicio = async (req,res) => { //req: lo q enviamos, res:lo q express nos responde
    
    //Consultar tres viajes del modelo

    const promisesDB = [];

    promisesDB.push(Viaje.findAll({limit:3}));
    promisesDB.push(Testimonial.findAll({limit:3}));

    try {

        const resultado = await Promise.all(promisesDB);

        res.render('inicio',{
            pagina: "Inicio",
            clase: "home",
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }
    
    
}

const paginaNosotros = (req,res) => { //req: lo q enviamos, res:lo q express nos responde

    // const viajes = 'viaje a Alemania';

    res.render('nosotros',{
        pagina: "Nosotros"
        // viajes //aplica object Literal = viajes : viajes
    });
}

const paginaViajes = async (req,res) => { //req: lo q enviamos, res:lo q express nos responde
    // consultar base de datos
    const viajes = await Viaje.findAll();

    console.log(viajes);
    
    res.render('viajes',{
        pagina: "Proximos Viajes",
        viajes, //aplica object Literal = viajes : viajes
    });
}

const paginaTestimoniales =  async (req,res) => { //req: lo q enviamos, res:lo q express nos responde
    
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales',{
            pagina: "Testimoniales",
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
    
    
    
}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req,res) => {
    // console.log(req.params.viaje);
    const {slug} = req.params

    try {
        const viaje = await Viaje.findOne({ where : {slug}});

        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }

}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
    
}