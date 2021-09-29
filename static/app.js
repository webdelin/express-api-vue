const App = {
    data(){
        return {
            servers: [],
            name: null
        }
    },
    async mounted(){
        const res = await fetch('/api/servers')
        this.servers = await res.json()
    },
    methods: {
        async createServer(){
            const data = {
                name: this.name,
                status: 'created'
            }
            const res = await fetch('/api/servers', {
                method: 'POST',
                headers: {
                   'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            this.name = ''
            const newServer = await res.json()
            this.servers.push(newServer)
        },
        async deleteServer(id){
            await fetch('/api/servers/'+id, {method: 'DELETE'})
            this.servers = this.servers.filter(s => s.id !== id)
        }
    }
}
Vue.createApp(App).mount('#app')