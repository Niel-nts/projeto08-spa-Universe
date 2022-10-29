const app = document.querySelector('#app')
const textUniverso = document.querySelector('#app')
const textExploracao = document.querySelector('#app')
const home = document.querySelector('#home')
const universo = document.querySelector('#universo')
const exploracao = document.querySelector('#exploracao')


export class Router {
    routes = {}

    add(routName, page){
        this.routes[routName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()
    
        window.history.pushState({}, "", event.target.href)
    
        this.handle()
    }

    handle() {
        const {pathname} = window.location        
        const route = this.routes[pathname] || this.routes[404]

        app.classList.remove('fade')
        setTimeout(function(){
            app.classList.add('fade')
        },0)

        if (route == "/pages/home.html"){

            setTimeout(function(){
            app.classList.add('textHome')
            },0)
            
            home.classList.add('focus')
            universo.classList.remove('focus')
            exploracao.classList.remove('focus')
            
            fetch(route).then(data => data.text()).then(html => {document.querySelector('#app').innerHTML = html}) 
            
        } else {

            app.classList.remove('textHome')

            fetch(route).then(data => data.text()).then(html => {document.querySelector('#app').innerHTML = html})

            if (route == "/pages/universo.html"){
                home.classList.remove('focus')
                universo.classList.add('focus')
                exploracao.classList.remove('focus')
            } else {              
                home.classList.remove('focus')
                universo.classList.remove('focus')
                exploracao.classList.add('focus')
            }
        }
    }
}
