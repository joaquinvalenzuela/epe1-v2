/* 
 * Autores: Pedro Gatica Guajardo, Kimberly Soazo Lara, Joaquin Valenzuela Sandoval
 * Servidor Local
 * Fecha: 03-05-2021
 * version 2.0
 */

const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');


const mime = {
    'html': 'text/html',
    'css': 'text/css',
    'jpg': 'image/jpg',
    'png': 'image/png',
    'woff2': 'image/woff2',
    'woff': 'image/woff',
    'ttf': 'image/ttf',
    'ico': 'image/x-icon',
    'mp3': 'audio/mpeg3',
    'mp4': 'video/mp4'
};

const servidor = http.createServer((pedido, respuesta) => {
    const objetourl = url.parse(pedido.url);
    let camino = 'public' + objetourl.pathname;
    if (camino == 'public/')
        camino = 'public/index.html';
    encaminar(pedido, respuesta, camino);
});

function encaminar(pedido, respuesta, camino) {
    switch (camino) {

        /*Llamamos a la pagina Inicio*/
        case 'public/Inicio':
        {
            Inicio(pedido, respuesta);
            break;
        }
        /*Llamamos a la pagina Quienes Somos*/
        case 'public/QuienesSomos':
        {
            QuienesSomos(pedido, respuesta);
            break;
        }
        /*Llamamos a la pagina Historia*/
        case 'public/Historia':
        {
            Historia(pedido, respuesta);
            break;
        }
        /*Llamamos a la pagina Galeria*/
        case 'public/Galeria':
        {
            Galeria(pedido, respuesta);
            break;
        }
        /*Llamamos a la pagina Contacto*/
        case 'public/Contacto':
        {
            Contacto(pedido, respuesta);
            break;
        }
        /*Llamamos a la pagina para mostrar Ver Contacto*/
        case 'public/VerContacto':
        {
            VerContacto(respuesta);
            break;
        }

        /*Llamamos a la pagina Redes Sociales*/
        case 'public/RedesSociales':
        {
            RedesSociales(pedido, respuesta);
            break;
        }
        /*Llamamos a la pagina Ingresar*/
        case 'public/Ingresar':
        {
            Ingresar(pedido, respuesta);
            break;
        }
        /*Llamamos a la pagina Registrar*/
        case 'public/Registrar':
        {
            Registrar(pedido, respuesta);
            break;
        }
        /*creamos la funcion para guardar datos del contacto*/
        case 'public/GuardarDatos':
        {
            GuardarContacto(pedido, respuesta);
            break;
        }

        /*creamos la funcion para guardar datos del Usuario*/
        case 'public/guardarUsuario':
        {
            guardarUsuario(pedido, respuesta);
            break;
        }
        /*Funcion Para validar si el usuario es correcto o no*/
        case 'public/validar':
        {
            validar(pedido, respuesta);
            break;
        }

        default :
        {
            fs.stat(camino, error => {
                if (!error) {
                    fs.readFile(camino, (error, contenido) => {
                        if (error) {
                            respuesta.writeHead(500, {'Content-Type': 'text/plain'});
                            respuesta.write('Error interno');
                            respuesta.end();
                        } else {
                            const vec = camino.split('.');
                            const extension = vec[vec.length - 1];
                            const mimearchivo = mime[extension];
                            respuesta.writeHead(200, {'Content-Type': mimearchivo});
                            respuesta.write(contenido);
                            respuesta.end();
                        }
                    });
                } else {
                    respuesta.writeHead(404, {'Content-Type': 'text/html'});
                    respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');
                    respuesta.end();
                }
            });
        }
    }
}

function Inicio(pedido, respuesta) {
    let info = '';
    pedido.on('data', datosparciales => {
        info += datosparciales;
    });
    pedido.on('end', function () {
        const formulario = querystring.parse(info);
        respuesta.writeHead(200, {'Content-Type': 'text/html'});

        const pagina = `<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Inicio</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">  
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <link href="css/estilo.css" rel="stylesheet" type="text/css"/><!-- se llama al css -->
        <link rel="shortcut icon" href="img/girasol.png">
        <link href="css/footer.css" rel="stylesheet" type="text/css"/>
    </head>
    <body style="background-color: rgba(161,202,241);"><!-- se realiza un menu con respectivo color -->
        <div style="height: 100px; background-color: rgba(48,213,200);"><br> 
            <center>
                <a class="btn btn-outline-dark active" href="Inicio" role="button">Inicio</a>
                <a class="btn btn-outline-dark " href="QuienesSomos" role="button">Quienes Somos</a>
                <a class="btn btn-outline-dark " href="Historia" role="button">Historia</a>
                <a class="btn btn-outline-dark " href="Galeria" role="button">Galeria</a>
                <a class="btn btn-outline-dark " href="Contacto" role="button">Contacto</a> 
                <a class="btn btn-outline-dark" href="RedesSociales" role="button">Redes Sociales</a> 
                <a class="btn btn-outline-dark" href="Ingresar" role="button">Ingresar</a>
            </center>
        </div>
        <!-- agrego carta con diseño de css -->
        <div class="card">
            <div class="imgBx text-white">
                <br><br><br>
                <p>El paisaje es la extensión de terreno que puede apreciarse desde un sitio. 
                    Puede decirse que es todo aquello que ingresa en el campo visual desde 
                    un determinado lugar.</p> <br><br>
                <p>El paisajismo, por otra parte, es el arte de diseñar parques y jardines.
                    Los paisajistas, por lo tanto, se dedican a la creación de paisajes
                    de gran belleza estética a través de la manipulación de ciertos recursos.</p>
                <br><br>
                <p>Los paisajes también son realidades socio-territoriales donde se combina el 
                    paisaje natural cono el paisaje cultural.</p>
              
            </div>
            <!-- agrego el detalle de la carta -->
            <div class="details">
                <h1><b>PAISAJES</b></h1>
                <p>Los paisajes nuevos no nacen de la nada, sino en que su mayoría 
                    son antropizaciones radicales o extensivas de los antiguos</p><hr>
                <img src="img/forest.jpg" alt="" width="200" height="200"/>
            </div>
        </div>

    </body>
    <!-- Footer -->
        <section id="footer">

            <div >
                <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                    <br>
                    <p class="h6">© Paisajitos Chile.<a class="text-green ml-2" href="http://localhost:8888/pagina5.html" target="_blank"></a></p>
                </div>
                <hr>
            </div>	

        </section>
        <!-- ./Footer -->
</html>`;

        respuesta.end(pagina);

    });
}



function QuienesSomos(pedido, respuesta) {
    let info = '';
    pedido.on('data', datosparciales => {
        info += datosparciales;
    });
    pedido.on('end', function () {
        const formulario = querystring.parse(info);
        respuesta.writeHead(200, {'Content-Type': 'text/html'});

        const pagina = `<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Quienes Somos</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">  
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <link href="css/estilo.css" rel="stylesheet" type="text/css"/><!-- se llama al css -->
        <link rel="shortcut icon" href="img/girasol.png">
        <link href="css/footer.css" rel="stylesheet" type="text/css"/>
    </head> 
    <body style="background-color: rgba(161,202,241);"><!-- se realiza un menu con respectivo color -->
        <div style="height: 100px; background-color: rgba(48,213,200);"><br>
            <center>
                <a class="btn btn-outline-dark " href="Inicio" role="button">Inicio</a>
                <a class="btn btn-outline-dark active" href="QuienesSomos" role="button">Quienes Somos</a>
                <a class="btn btn-outline-dark " href="Historia" role="button">Historia</a>
                <a class="btn btn-outline-dark " href="Galeria" role="button">Galeria</a>
                <a class="btn btn-outline-dark " href="Contacto" role="button">Contacto</a> 
                <a class="btn btn-outline-dark" href="RedesSociales" role="button">Redes Sociales</a> 
                <a class="btn btn-outline-dark" href="Ingresar" role="button">Ingresar</a>
            </center>
        </div>
 
        <!-- agrego carta con diseño de css -->
        <div class="card">
            
            
            
            
            
            <div class="imgBx text-white">

        
    <center>
        <br>
        <h1>Quienes Somos</h1>
        
        <br>
        <br>
        
        <p><i>Somos Paisajes, somos un grupo de personas apacionados por la naturaleza...</i></p>
        <br>
        <br>
    </center>
                
                
                <img src="img/bonitas.jpg" alt="" />
               
            </div>
            <!-- agrego el detalle de la carta -->
            <div class="details">
                <h1><b>Más Paisajes</b></h1>
                <p>Puedes ver más información en las siguientes paginas:</p><p>
                         <a href="index.html" >inicio</a>,
                         <a href="Historia">Nuestra Historia</a> y también puedes ir a  
                         <a href="Contacto">contactos</a>, 
                         en donde puedes obtener más información y nuestras  
                        <a href="RedesSociales">redes sociales</a>donde puedes compartirnos con 
                        tus amigos.</p>
            </div>
        </div>

    </body>
    <!-- Footer -->
        <section id="footer">

            <div >
                <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                    <br>
                    <p class="h6">© Paisajitos Chile.<a class="text-green ml-2" href="http://localhost:8888/pagina5.html" target="_blank"></a></p>
                </div>
                <hr>
            </div>	

        </section>
        <!-- ./Footer -->
</html>`;

        respuesta.end(pagina);

    });
}

function Historia(pedido, respuesta) {
    let info = '';
    pedido.on('data', datosparciales => {
        info += datosparciales;
    });
    pedido.on('end', function () {
        const formulario = querystring.parse(info);
        respuesta.writeHead(200, {'Content-Type': 'text/html'});

        const pagina = `<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Historia</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">  
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <link href="css/estilo.css" rel="stylesheet" type="text/css"/><!-- se llama al css -->
        <link rel="shortcut icon" href="img/girasol.png">
        <link href="css/footer.css" rel="stylesheet" type="text/css"/>
    </head> 
    <body style="background-color: rgba(161,202,241);"><!-- se realiza un menu con respectivo color -->
        <div style="height: 100px; background-color: rgba(48,213,200);"><br>
            <center>
                <a class="btn btn-outline-dark " href="Inicio" role="button">Inicio</a>
                <a class="btn btn-outline-dark " href="QuienesSomos" role="button">Quienes Somos</a>
                <a class="btn btn-outline-dark active" href="Historia" role="button">Historia</a>
                <a class="btn btn-outline-dark " href="Galeria" role="button">Galeria</a>
                <a class="btn btn-outline-dark " href="Contacto" role="button">Contacto</a> 
                <a class="btn btn-outline-dark" href="RedesSociales" role="button">Redes Sociales</a> 
                <a class="btn btn-outline-dark" href="Ingresar" role="button">Ingresar</a>
            </center>
        </div>
        <!-- agrego carta con diseño de css -->
        <div class="card">
            <div class="imgBx text-white">
                <br><br><br>
                <h1><b>LOS PAISAJES</b></h1>
                <h5>la representacion de un terreno extenso</h5>
                <h5>Que son los paisajes</h5>
                <h5>donde puedes pasar un rato agradable con tus amigos</h5>
                <h5>y con nuestros hijos</h5>
                <h5>todos podemos pasar ratos cheveres</h5>
                <h5>no te lo pierdas disfrutalo</h5>
                <h5>un lugar donde pasar un rato agradable con nuestra familia</h5>
                <h5>podemos relajarnos con nuestros amigos</h5>

            </div>
            <!-- agrego el detalle de la carta -->
            <div class="details">
                <img src="img/catarata.jpg" alt="" width="400" height="400"/>
            </div>
        </div>

    </body>
    <!-- Footer -->
        <section id="footer">

            <div >
                <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                    <br>
                    <p class="h6">© Paisajitos Chile.<a class="text-green ml-2" href="http://localhost:8888/pagina5.html" target="_blank"></a></p>
                </div>
                <hr>
            </div>	

        </section>
        <!-- ./Footer -->
</html>`;

        respuesta.end(pagina);

    });
}

function Galeria(pedido, respuesta) {
    let info = '';
    pedido.on('data', datosparciales => {
        info += datosparciales;
    });
    pedido.on('end', function () {
        const formulario = querystring.parse(info);
        respuesta.writeHead(200, {'Content-Type': 'text/html'});

        const pagina = `<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Galeria</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">  
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <link href="css/estilo.css" rel="stylesheet" type="text/css"/><!-- se llama al css -->
        <link rel="shortcut icon" href="img/girasol.png">
        <link href="css/footer.css" rel="stylesheet" type="text/css"/>
        <link href="css/ihover.css" rel="stylesheet" type="text/css"/>
    </head>
    <body style="background-color: rgba(161,202,241);"><!-- se realiza un menu con respectivo color -->
        <div style="height: 100px; background-color: rgba(48,213,200);"><br>
            <center>
                <a class="btn btn-outline-dark " href="Inicio" role="button">Inicio</a>
                <a class="btn btn-outline-dark " href="QuienesSomos" role="button">Quienes Somos</a>
                <a class="btn btn-outline-dark " href="Historia" role="button">Historia</a>
                <a class="btn btn-outline-dark active" href="Galeria" role="button">Galeria</a>
                <a class="btn btn-outline-dark " href="Contacto" role="button">Contacto</a> 
                <a class="btn btn-outline-dark" href="RedesSociales" role="button">Redes Sociales</a> 
                <a class="btn btn-outline-dark" href="Ingresar" role="button">Ingresar</a>
            </center>
        </div>


        <br>
        
    <center>
        <h1>Nuestras Galerias</h1>
        
        <br>
        <br>
        
        <i>Mira nuestras imagenes que te presentamos acontinuacion, donde podras admirar estos lindos paisajes</i>
        <br>
        <br>
    </center>
        
        <table align="center">
            <tr>
                <td>
                    <div class="ih-item square effect10 left_to_right"><a href="#">
                            <div class="img"><img src="img/bonitas.jpg" alt="img"></div>
                            <div class="info">
                                <h3>Cataratas</h3>
                                <p>Linda imagen de las cataratas en una bella vista.</p>
                            </div></a></div>
                </td>
                <td>
                    <div class="ih-item square colored effect10 left_to_right"><a href="#">
                            <div class="img"><img src="img/catarata.jpg" alt="img"></div>
                            <div class="info">
                                <h3>Cataratas</h3>
                                <p>Hermoso paisaje que se puede admirar.</p>
                            </div></a></div>
                </td>
                <td>
                    <div class="ih-item square effect10 right_to_left"><a href="#">
                    <div class="img"><img src="img/flor.jpg" alt="img"></div>
                    <div class="info">
                        <h3>Sendero de Flores</h3>
                        <p>Hermosa vista que podemos obtener del Sendero.</p>
                    </div></a></div>
                </td>
            </tr>
            <tr>
                <td> 
                    <div class="ih-item square effect10 left_to_right"><a href="#">
                            <div class="img"><img src="img/forest.jpg" alt="img"></div>
                            <div class="info">
                                <h3>Bosque</h3>
                                <p>Bosques que puedes admirar para adquerir tranquilidad.</p>
                            </div></a></div>
                </td>
                <td>
                    <div class="ih-item square colored effect10 left_to_right"><a href="#">
                            <div class="img"><img src="img/gallo.jpg" alt="img"></div>
                            <div class="info">
                                <h3>Gallo</h3>
                                <p>Hermosa vista que obtenemos de un gallo.</p>
                            </div></a></div>
                </td>
                <td>
                    <div class="ih-item square effect10 right_to_left"><a href="#">
                    <div class="img"><img src="img/winter.jpg" alt="img"></div>
                    <div class="info">
                        <h3>Nieve</h3>
                        <p>Tomada como una portada estupenda para todo admirador de la nieve.</p>
                    </div></a></div>
                </td>
            </tr>
        </table>




<br>
        <br><br>
        <br><br>
        <br>

        <!-- Footer -->
        <section id="footer">

            <div >
                <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                    <br>
                    <p class="h6">© Paisajitos Chile.<a class="text-green ml-2" href="http://localhost:8888/pagina5.html" target="_blank"></a></p>
                </div>
                <hr>
            </div>	

        </section>
        <!-- ./Footer -->


    </body>

</html>`;

        respuesta.end(pagina);

    });
}

function Contacto(pedido, respuesta) {
    let info = '';
    pedido.on('data', datosparciales => {
        info += datosparciales;
    });
    pedido.on('end', function () {
        const formulario = querystring.parse(info);
        respuesta.writeHead(200, {'Content-Type': 'text/html'});

        const pagina = `<html>
    <head>
        <title>Contacto</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">  
        <link href="css/estilo.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="fontawesome/css/all.css">
        <link rel="shortcut icon" href="img/girasol.png">
        <link href="css/footer.css" rel="stylesheet" type="text/css"/>
    </head>
    <body style="background-color: rgba(161,202,241);">
 
        <!-- MENU -->
        <div style="height: 100px; background-color: rgba(48,213,200);"><br>
            <center>
                <a class="btn btn-outline-dark " href="Inicio" role="button">Inicio</a>
                <a class="btn btn-outline-dark " href="QuienesSomos" role="button">Quienes Somos</a>
                <a class="btn btn-outline-dark " href="Historia" role="button">Historia</a>
                <a class="btn btn-outline-dark " href="Galeria" role="button">Galeria</a>
                <a class="btn btn-outline-dark active" href="Contacto" role="button">Contacto</a> 
                <a class="btn btn-outline-dark" href="RedesSociales" role="button">Redes Sociales</a> 
                <a class="btn btn-outline-dark" href="Ingresar" role="button">Ingresar</a>
            </center>
        </div>
        <!-- FIN MENU -->


        <section>
            <div class="container">
                <div class="container">
                    <h4><b>Contactanos</b></h4>
                    <!-- AGREGO LOCALIDAD -->
                    <div class="container">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7917.321296358389!2d-70.66787198884252!3d-33.453903384608495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c507ab673c35%3A0x1f1e3722f07924a!2sIPCHILE%20Sede%20Rep%C3%BAblica!5e0!3m2!1ses-419!2scl!4v1619568149077!5m2!1ses-419!2scl" height="250" width="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                    <!-- FIN LOCALIDAD -->
                    <strong><i class="fas fa-phone-square-alt"></i> +569-58769851</strong><br>
                    <strong><i class="far fa-envelope"></i> contacto@paisajenatural.cl</strong>
                    <hr>
                </div>
                <div class="container">
                    <form role="form" id="Formulario" action="GuardarDatos" method="POST">
                        <div class="form-group">
                            <label class="control-label" for="Nombre">Nombres</label>
                            <input type="text" class="form-control" id="Nombre" name="nombre" placeholder="Introduzca su nombre" required autofocus />
                        </div>            
                        <div class="form-group">
                            <label class="control-label" for="Correo">Dirección de Correo Electrónico</label>
                            <input type="email" class="form-control" id="Correo" name="correo" placeholder="Introduzca su correo electrónico" required />
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="Mensaje">Mensaje</label>
                            <textarea rows="5" cols="30" class="form-control" id="Mensaje" name="mensaje" placeholder="Introduzca su mensaje" required ></textarea>
                        </div>
                        <div class="form-group">                
                            <input type="submit" class="btn btn-primary" value="Enviar">
                            <input type="button" class="btn btn-primary" onclick="location.href='VerContacto';" value="Ver Contactos">
                            <input type="reset" class="btn btn-default" value="Limpiar">
                            
                            
                        </div>
                        <div id="resultado"></div>
                    </form>
                </div>       
            </div><br><br><br><br><br>
        </section>

        <!-- Footer -->
        <section id="footer">

            <div >
                <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                    <br>
                    <p class="h6">© Paisajitos Chile.<a class="text-green ml-2" href="http://localhost:8888/pagina5.html" target="_blank"></a></p>
                </div>
                <hr>
            </div>	

        </section>
        <!-- ./Footer -->
    </body>


</html>`;

        respuesta.end(pagina);

    });
}

function VerContacto(respuesta) {
    let datos = fs.readFileSync('public/Contacto.txt').toString().split("\n");
        respuesta.writeHead(200, {'Content-Type': 'text/html'});
        respuesta.write(`<html>
    <head>
        <title>Ver Contacto</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">  
        <link href="css/estilo.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="fontawesome/css/all.css">
        <link rel="shortcut icon" href="img/girasol.png">
        <link href="css/footer.css" rel="stylesheet" type="text/css"/>
    </head>
    <body style="background-color: rgba(161,202,241);">
 
        <!-- MENU -->
        <div style="height: 100px; background-color: rgba(48,213,200);"><br>
            <center>
                <a class="btn btn-outline-dark " href="Inicio" role="button">Inicio</a>
                <a class="btn btn-outline-dark " href="QuienesSomos" role="button">Quienes Somos</a>
                <a class="btn btn-outline-dark " href="Historia" role="button">Historia</a>
                <a class="btn btn-outline-dark " href="Galeria" role="button">Galeria</a>
                <a class="btn btn-outline-dark active" href="Contacto" role="button">Contacto</a> 
                <a class="btn btn-outline-dark" href="RedesSociales" role="button">Redes Sociales</a> 
                <a class="btn btn-outline-dark" href="Ingresar" role="button">Ingresar</a>
            </center>
        </div>
        <!-- FIN MENU -->


        <section>
        <br><br>
            <div class="container">
                <div class="container">
                    <h4 align=center><b>Ver Contacto</b></h4>
                    
                    
                </div>
        <br>
                <div align=center class="container"> `);
        for (let i = 0; i < datos.length; i++) {
      
        respuesta.write(datos[i]);
        respuesta.write(`<br>`)

    }
        respuesta.write(`</div>       
            </div><br><br><br><br><br>
        </section>

        <!-- Footer -->
        <section id="footer">

            <div >
                <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                    <br>
                    <p class="h6">© Paisajitos Chile.<a class="text-green ml-2" href="http://localhost:8888/pagina5.html" target="_blank"></a></p>
                </div>
                <hr>
            </div>	

        </section>
        <!-- ./Footer -->
    </body>


</html>`);
        //respuesta.write(datos);

        respuesta.end();
    //console.log(datos);
}



function RedesSociales(pedido, respuesta) {
    let info = '';
    pedido.on('data', datosparciales => {
        info += datosparciales;
    });
    pedido.on('end', function () {
        const formulario = querystring.parse(info);
        respuesta.writeHead(200, {'Content-Type': 'text/html'});

        const pagina = `<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Redes Sociales</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">  
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <link href="css/estilo.css" rel="stylesheet" type="text/css"/><!-- se llama al css -->
        <link rel="shortcut icon" href="img/girasol.png">
        <link href="css/footer.css" rel="stylesheet" type="text/css"/>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css"/>
        <link href="css/style.css" rel="stylesheet" type="text/css"/>
    </head> 
    <body style="background-color: rgba(161,202,241);"><!-- se realiza un menu con respectivo color -->
        <div style="height: 100px; background-color: rgba(48,213,200);"><br>
            <center>
                <a class="btn btn-outline-dark " href="Inicio" role="button">Inicio</a>
                <a class="btn btn-outline-dark " href="QuienesSomos" role="button">Quienes Somos</a>
                <a class="btn btn-outline-dark " href="Historia" role="button">Historia</a>
                <a class="btn btn-outline-dark " href="Galeria" role="button">Galeria</a>
                <a class="btn btn-outline-dark " href="Contacto" role="button">Contacto</a> 
                <a class="btn btn-outline-dark active" href="RedesSociales" role="button">Redes Sociales</a> 
                <a class="btn btn-outline-dark" href="Ingresar" role="button">Ingresar</a>
            </center>
        </div>
        
        
    
        
        
        
        
        <!-- agrego carta con diseño de css -->
        <div class="cart">
            
            
                
        
        
                 <br>
        
    <center>
        <h1>Nuestras Redes Sociales</h1>
        
   
        
        <i>No digas nada... Solo disfruta!</i>
        <br>
        <br>
    </center>
            
            
            
                <br>
                <div class="container-fluid">
                    <div class="row">
                        <div class="middle381">
                            <a class="btn381" href="https://web.facebook.com/">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a class="btn381" href="https://twitter.com/">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a class="btn381" href="https://mail.google.com">
                                <i class="fab fa-google"></i>
                            </a>
                            <a class="btn381" href="https://www.instagram.com/">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a class="btn381" href="https://www.youtube.com/">
                                <i class="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                
            </div>
            <!-- agrego el detalle de la carta -->
            
        </div>

    </body>
    <!-- Footer -->
    <section id="footer">

        <div >
            <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                <br>
                <p class="h6">© Paisajitos Chile.<a class="text-green ml-2" href="http://localhost:8888/pagina5.html" target="_blank"></a></p>
            </div>
            <hr>
        </div>	

    </section>
    <!-- ./Footer -->
</html>`;

        respuesta.end(pagina);

    });
}

function Ingresar(pedido, respuesta) {
    let info = '';
    pedido.on('data', datosparciales => {
        info += datosparciales;
    });
    pedido.on('end', function () {
        const formulario = querystring.parse(info);
        respuesta.writeHead(200, {'Content-Type': 'text/html'});

        const pagina = `<html>
    <head>
        <title>Ingreso Usuario</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
        <link href="css/login.css" rel="stylesheet" type="text/css"/>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel="shortcut icon" href="img/girasol.png">
    </head> 
    <body>
        <div id="login">
            <h3 class="text-center text-white pt-5">Ingreso de Usuario</h3>
            <div class="container">
                <div id="login-row" class="row justify-content-center align-items-center">
                    <div id="login-column" class="col-md-6">
                        <div id="login-box" class="col-md-12">
                            <form id="login-form" class="form" action="validar" method="post">
                                <h3 class="text-center text-info">Ingreso</h3>
                                <div class="form-group">
                                    <label for="username" class="text-info">Nombre:</label><br>
                                    <input type="text" name="nombre" id="username" class="form-control" required autofocus>
                                </div> 
                                <div class="form-group">
                                    <label for="password" class="text-info">Password:</label><br>
                                    <input type="text" name="password" id="password" class="form-control" required >
                                </div>
                                <div class="form-group">
                                    <br>
                                    <input type="submit" name="submit" class="btn btn-info btn-md" value="Ingresar">
                                </div>
                                <div id="register-link" class="text-right">
                                    <a href="Registrar" class="text-info">Registrar Aqui</a>
                                    <br>
                                    <a href="Inicio" class="text-info">Volver</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    
</html>`;

        respuesta.end(pagina);

    });
}

function Registrar(pedido, respuesta) {
    let info = '';
    pedido.on('data', datosparciales => {
        info += datosparciales;
    });
    pedido.on('end', function () {
        const formulario = querystring.parse(info);
        respuesta.writeHead(200, {'Content-Type': 'text/html'});

        const pagina = `<html>
    <head>
        <title>Registro Usuario</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
        <link href="css/login.css" rel="stylesheet" type="text/css"/>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel="shortcut icon" href="img/girasol.png">
    </head>
    <body>
        <div id="login">
            <h3 class="text-center text-white pt-5">Registro Usuario</h3>
            <div class="container">
                <div id="login-row" class="row justify-content-center align-items-center">
                    <div id="login-column" class="col-md-6">
                        <div id="login-box" class="col-md-12">
                            <form id="login-form" class="form" action="guardarUsuario" method="post">
                                <h3 class="text-center text-info">REGISTRO</h3>
                                <div class="form-group">
                                    <label for="username" class="text-info">Nombre:</label><br>
                                    <input type="text" name="nombre" id="username" class="form-control" required autofocus>
                                </div>
                                <div class="form-group">
                                    <label for="password" class="text-info">Password:</label><br>
                                    <input type="text" name="password" id="password" class="form-control" required >
                                </div>
                                <div class="form-group">
                                    <br>
                                    <input type="submit" name="submit" class="btn btn-info btn-md" value="Registro">

                                </div>
                                <div id="register-link" class="text-right">
                                    <a href="Ingresar" class="text-info">Volver</a>
                                </div>
                            </form>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>`;

        respuesta.end(pagina);

    });
}

function GuardarContacto(pedido, respuesta) {
    let info = '';
    pedido.on('data', datosparciales => {
        info += datosparciales;
    });
    pedido.on('end', function () {
        const formulario = querystring.parse(info);
        respuesta.writeHead(200, {'Content-Type': 'text/html'});

        const pagina = `<script>alert ("Datos Enviados!");
                        window.location.href='http://localhost:8888/Contacto'; </script>`;

        respuesta.end(pagina);
        DatosAlmacenados(formulario);
    });
}


function DatosAlmacenados(formulario) {
    const datos = `
                Nombre:${formulario['nombre']}\n
                Email:${formulario['correo']}\n
                Mensaje:${formulario['mensaje']}
                <hr style=height:2px;border-width:50%;color:gray;background-color:gray>`;
    fs.appendFile('public/Contacto.txt', datos, error => {
        if (error)
            console.log(error);
    });
}

//funcion de guardar el usuario que se esta registrando

function guardarUsuario(pedido, respuesta) {
    let info = '';
    pedido.on('data', datosparciales => {
        info += datosparciales;

    });

    pedido.on('end', function () {

        const formulario = querystring.parse(info);
        respuesta.writeHead(200, {'Content-Type': 'text/html'});

        const pagina = `<script>alert ("Datos Enviados!");
                        window.location.href='http://localhost:8888/Ingresar'; </script>`;

        respuesta.end(pagina);
        guardarArchivo(formulario);


    })
}
function guardarArchivo(formulario) {
    const datos = [formulario['nombre'], formulario['password'], ''];
    fs.writeFileSync('public/Usuarios.txt', datos.toString())
//    fs.appendFile('public/Usuarios.txt', datos, error => {
//        if (error) {
//            console.log(error);
//        }
//    }) 

}

// validar usuario y contraseña

function validar(pedido, respuesta) {
    let  datos = fs.readFileSync('public/Usuarios.txt').toString().split(",");


    let info = '';
    pedido.on('data', datosparciales => {
        info += datosparciales;

    });

    pedido.on('end', function () {

        const formulario = querystring.parse(info);
        respuesta.writeHead(200, {'Content-Type': 'text/html'});


        let usuario;
        let contrasena;
        for (let i = 0; i <= datos.length; i++) {
            if (datos[i] === formulario['nombre']) {

                console.log("usuario correcto");

                console.log(datos[i]);
                usuario = datos[i];
            }

            if (datos[i] === formulario['password']) {
                console.log("contraseña correcta");

                console.log(datos[i]);

                contrasena = datos[i];

            }




        }
        if (usuario === formulario['nombre'] && contrasena === formulario['password']) {
            const pagina = `<script>alert ("Datos Correctos");
                        window.location.href='http://localhost:8888/Ingresar'; </script>`
            respuesta.end(pagina);
        } else {
            const pagina = `<script>alert ("Usuario o contraseña incorrectos");
                        window.location.href='http://localhost:8888/Ingresar'; </script>`
            respuesta.end(pagina);
        }


    })
    // console.log(datos);

}


servidor.listen(8888);

console.log('Servidor web iniciado');