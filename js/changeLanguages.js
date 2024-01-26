const idioma = document.getElementById("idioma")
const modificarTexto = document.querySelectorAll("[data-section]")

function IdiomaGuardado() {
    try {
        const idiomaAlmacenado = localStorage.getItem("lang");
        if (idiomaAlmacenado) {
            cambiarIdioma(idiomaAlmacenado);
        }
    } catch (err) {
        console.error("No se pudo obtener el idioma guardado");
    }
}

// Trae el json del idioma elegido por el usuario
const cambiarIdioma = async(idioma) =>{
    const requestJson = await fetch(`./languages/${idioma}.json`);
    const texts = await requestJson.json();

    localStorage.setItem("lang", idioma);
    console.log(localStorage.getItem("lang"))
    //console.log(texts)

    for (const textoModificado of modificarTexto){
        const section = textoModificado.dataset.section;
        const value = textoModificado.dataset.value;
        
        // Cambia el idioma del texto SOLO en las etiquetas de tipo meta
        if (section == "meta"){
            document.documentElement.setAttribute("lang", texts[section][value])
        }
        else{
            textoModificado.innerHTML = texts[section][value];
            //console.log(textoModificado);
        }
        
    }
};
// Captura el idioma que ha elegido el usuario
idioma.addEventListener("click", e =>{
    //console.log(e.target.dataset.language)
    cambiarIdioma(e.target.dataset.language);
});

document.addEventListener("DOMContentLoaded", IdiomaGuardado);