//PROYECTO DE GRAFICADORA DE ECUACIONES INTERACTIVA

  //Variables del proyecto
    //Estas variables obtienen del html el canvas y le dan el atributo de 2D.
    var lienzo_html = document.getElementById("dibujo");
    var dibujo = lienzo_html.getContext("2d");

    //Variables del formulario
    var Txt_ax2 = document.getElementById("x2");
    var Txt_ax = document.getElementById("x");
    var Txt_const = document.getElementById("const");
    var Bttn = document.getElementById("boton");
    var Txt_vin = document.getElementById("inicial");
    var Txt_vfin = document.getElementById("final");

    //Codigo que coloca un monitoreador del evento Click.
    Bttn.addEventListener("click", DibujoPorClick);
    var ax2, ax, cons, Vinicial, Vfinal;
    //Variables de la funcion Hacer_lineas.
    var xi, yi, x2, y2, color;
    //Variables de la función Linea_Trazado.
    var c, color2, color3, ze;
    //Variables de la función Graficar.
    var x, y;
    //Variables de la función Tabular.
    var a, b, equis, ye, z, Vinicial, Vfinal, datos;

    //Definición del valor de algunas variables.

    color = "green";
    color2 = "red";
    color3 = "blue";
    color4 = "black";
    ze = -400;

//Sección de variables.
  //Función que es activada por el evento click.
        function DibujoPorClick(){
          //Arregla el hecho de que un cuadro de texto vacío llama un NaN (Not a Number).
          if(Txt_ax2.value == "" ){
              ax2 = 0;
              dax2 = 0;
            } else{
              ax2 = parseInt(Txt_ax2.value);
              dax2 = parseInt(Txt_ax2.value);
            }
            if(Txt_ax.value == "" ){
              ax = 0;
              dax = 0;
            } else{
              ax = parseInt(Txt_ax.value);
              dax = parseInt(Txt_ax.value);
            }
            if(Txt_const.value == "" ){
              cons = 0;
              dcons = 0;
            } else{
              cons = parseInt(Txt_const.value);
              dcons = parseInt(Txt_const.value);
            }
            if (Txt_vin.value == ""){
              Vinicial = 0;
              Vinicia = 0;
            } else{
              Vinicial = parseInt(Txt_vin.value);
              Vinicia = parseInt(Txt_vin.value);
            }
            if (Txt_vfin.value == ""){
              Vfinal = 0;
              Vfina = 0;
            } else{
              Vfinal = parseInt(Txt_vfin.value);
              Vfina = parseInt(Txt_vfin.value);
            }
            //permite el cálculo de la separación de los puntos negros.
            datos = (Vfinal - Vinicial)/20;

            //Llama a la tabla de html.
            var Tbl_tab2 = document.getElementById("tablita");
            //Cuenta las filas de la tabla html.
            var longitud = Tbl_tab2.rows.length;
            //Si tiene más de una fila se procede a borrar.
            if (longitud>1){
              var longitud3 = longitud;
              while(longitud3 > 2){
                longitud3 = Tbl_tab2.rows.length;
                var longitud2 = Tbl_tab2.rows.length - 1;
                Tbl_tab2.deleteRow(longitud2)
              }
            }

            //Permite el dibujo de una línea en el canvas.
            function Hacer_Linea(xi,yi,x2,y2,color){
              dibujo.beginPath();
                dibujo.moveTo(xi,yi);
                dibujo.strokeStyle = color;
                dibujo.lineTo(x2,y2);
                dibujo.stroke();
              dibujo.closePath();
              }

              //Genera el espacio de la gráfica.
              function Linea_Trazado(){
                //Enmarca el área de trazado en azul.
                Hacer_Linea(0,0,0,800,color3);
                Hacer_Linea(0,0,800,0,color3);
                Hacer_Linea(800,0,800,800,color3);
                Hacer_Linea(0,800,800,800,color3);
                //EjeY en color rojo
                Hacer_Linea(399,0,399,800,color2);
                Hacer_Linea(400,0,400,800,color2);
                Hacer_Linea(399,0,401,800,color2);
                //EjeX en color rojo
                Hacer_Linea(0,399,800,399, color2);
                Hacer_Linea(0,400,800,400, color2);
                Hacer_Linea(0,401,800,401, color2);

                //Ciclo para colocar cada graduación de la recta.
                for (c = 0; c<801; c = c + 20){
                  //Coloca el texto que representa el valor de cada línea.
                    dibujo.font = "bold 8px sans-serif";
                    Hacer_Linea(c, 390,c,410);
                    dibujo.fillText(ze, c-7,426);
                    Hacer_Linea(390,c,410,c);
                    dibujo.fillText(-ze,426,c+2);
                    ze = ze + 20;
                  }
                }

                //Esta función permite graficar círculos rellenos.
                function Graficar(x,y,rad,color){
                  dibujo.beginPath();
                    dibujo.moveTo(x,y);
                    dibujo.strokeStyle = color;
                    //Esta función en realidad dibuja un arco de 360°, NOTA: Esta función usa radianes por lo que se utiliza la fórmula Math.PI*360/180 para hacer la conversión.
                    dibujo.arc(x,y,rad,0,(Math.PI/180)*360,true);
                    dibujo.fillStyle = color;
                    dibujo.fill();
                    dibujo.stroke();
                  dibujo.closePath();
                }


                //Esta función permite generar los valores a graficar.
                function Tabular(dat, Vinici, s, si, sis, color,rad){
                  //La variable dat es una variable interna que representa a datos, Vinci representa a Vinicial, las variables s, si, sis corresponden a los coeficientes de la ecuación a resolver.
                  z=Vinici;
                  //Llama a la tabla de html.
                  var Tbl_tab = document.getElementById("tablita");
                  //Ciclo que permite colocar en puntos negros los datos de tabulación.
                  for(a=0;a<21; a = a + 1){
                    //ecuación cuadrática o lineal a calcular.
                    b = s * z * z + si * z + sis;
                    //Convierte las coordenadas de la ecuación en coordenadas del canvas.
                    equis = (400 + z);
                    ye = (400 - b);
                    //Forma la tabulacion en html.
                    var ultimaFila = Tbl_tab.rows.length;
                    var filaInsertada = Tbl_tab.insertRow(ultimaFila);
                    var tabX = filaInsertada.insertCell(0);
                    var tabY = filaInsertada.insertCell(1);
                    //Introduce contenido en la tabla recién formada.
                    tabX.innerHTML = "<center>" + parseInt(z) + "</center>";
                    tabY.innerHTML = "<center>" + parseInt(b) + "</center>";
                    //Separador de puntos negros.
                    z = z + dat;
                    //Grafica los puntos.
                    Graficar(equis,ye,rad,color);
                    }
                  }

                  //Esta función permite generar los valores a graficar.
                  function Tabular2(da, Vin, l,li,lil,color2,rad){
                    r = Vin;
                    var limite = l * Vfinal* Vfinal + li * Vfinal + lil;
                    //Genera una línea de tendencia verde entre los puntos.
                      while( f<limite){
                        f = l * r * r + li * r + lil;
                        //Convierte los puntos a coordenadas del canvas.
                        var dequis = (400 + r);
                        var dye = (400 - f);
                        r = r + 0.1;
                        Graficar(dequis,dye,rad,color2);
                        console.log("los verdes son ",r,f);
                      }
                    }
            //Este codigo limplia el canvas.
            dibujo.clearRect(0,0,lienzo_html.width,lienzo_html.height);
            //Variables que se reinician para que el ciclo siga funcionando.
            c = 0;
            ze = -400;
            z= Vinicial;
            r = Vinicia;
            f = 0;
            b = 0;

            //Llamado de las funciones.
            Linea_Trazado();
            Tabular2(datos, Vinicial, ax2,ax,cons,"green",2);

            Tabular(datos, Vinicia, dax2,dax,dcons,"black",4);
            console.log(ax2,ax,cons);
          }
          //Esta función dibuja una línea en el canvas.
          function Hacer_Linea(xi,yi,x2,y2,color){
            dibujo.beginPath();
              dibujo.moveTo(xi,yi);
              dibujo.strokeStyle = color;
              dibujo.lineTo(x2,y2);
              dibujo.stroke();
            dibujo.closePath();
            }
            //Genera el área donde se generará la gráfica.
            function Linea_Trazado(){
              //Enmarca el área de trazado en azul.
              Hacer_Linea(0,0,0,800,color3);
              Hacer_Linea(0,0,800,0,color3);
              Hacer_Linea(800,0,800,800,color3);
              Hacer_Linea(0,800,800,800,color3);
              //EjeY en color rojo.
              Hacer_Linea(399,0,399,800,color2);
              Hacer_Linea(400,0,400,800,color2);
              Hacer_Linea(399,0,401,800,color2);
              //EjeX en color rojo.
              Hacer_Linea(0,399,800,399, color2);
              Hacer_Linea(0,400,800,400, color2);
              Hacer_Linea(0,401,800,401, color2);

              //Ciclo para colocar cada graduación de la recta.
              for (c = 0; c<801; c = c + 20){
                //Coloca el texto que representa el valor de cada línea.
                  dibujo.font = "bold 8px sans-serif";
                  Hacer_Linea(c, 390,c,410);
                  dibujo.fillText(ze, c-7,426);
                  Hacer_Linea(390,c,410,c);
                  dibujo.fillText(-ze,426,c+2);
                  ze = ze + 20;
                }
              }
          //Sección de llamado de Funciones.
          Linea_Trazado();//Se llama para que el usuario vea el trazado desde que carga la página.
