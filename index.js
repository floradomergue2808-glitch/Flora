

// helper to format rich text
function formatContent(text){

// sections
text = text.replace(/Idée principale et contexte :/g, '<h3>Idée principale et contexte</h3>')
text = text.replace(/Valeurs et caractéristiques :/g, '<h3>Valeurs et caractéristiques</h3>')
text = text.replace(/Designer clé et objets emblématiques :/g, '<h3>Designer & objets</h3>')
text = text.replace(/Designer clé :/g, '<h3>Designer clé</h3>')
text = text.replace(/Designers clés et objets emblématiques :/g, '<h3>Designers & objets</h3>')

// bullets → list
text = text.replace(/• (.*)/g, '<li>$1</li>')
text = text.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')

// paragraphs
text = text.split('\n').map(line=>{
    if(line.trim().startsWith('<h3>') || line.trim().startsWith('<ul>')) return line
    if(line.trim()==='') return ''
    return `<p>${line}</p>`
}).join('')

return text
}

const timeline=document.getElementById("timeline")


fetch('./events.json').then(res => res.json()).then(data => {
    data.forEach(e => {

        const el=document.createElement("div")
        el.className="event"

        el.innerHTML=`
            <div class="node"></div>
            <div class="period">${e.period}</div>
            <div class="title">${e.title}</div>
            <div class="content">${formatContent(e.content)}</div>
            `

        el.addEventListener("click",()=>{

            if(el.classList.contains("open")){
                el.classList.remove("open")

            }else{
                document.querySelectorAll(".event").forEach(ev=>ev.classList.remove("open"))
                el.classList.add("open")
            }
            })

            timeline.appendChild(el)
    });
});

if("serviceWorker" in navigator){
    navigator.serviceWorker.register("../service-worker.js")
}
