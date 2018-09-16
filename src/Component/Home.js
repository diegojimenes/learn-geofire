import React from 'react';
import firebase from 'firebase'
import GeoFire from 'geofire'

export default class Home extends React.Component {
    state = {
        lat : 0,
        lng : 0,
        raio: 5,
        nome: '',
        pontos: []
    }
    componentWillMount(){
        var config = {
            apiKey: "AIzaSyDRPIFTvUUSiGrcwCbyUDiIbysg4hi0HW8",
            authDomain: "geo-fire-learn.firebaseapp.com",
            databaseURL: "https://geo-fire-learn.firebaseio.com",
            projectId: "geo-fire-learn",
            storageBucket: "geo-fire-learn.appspot.com",
            messagingSenderId: "499044566543"
          };
          
        if (!firebase.apps.length) {
          firebase.initializeApp(config);
        }
    }
    sendNewPoint(){
        var storageRef = firebase.database().ref();
        var geoFire = new GeoFire(storageRef);
        var id = btoa(this.state.nome)
        geoFire.set(id, [parseFloat(this.state.lat),parseFloat(this.state.lng)]).then(() => {
            console.log("Provided key has been added to GeoFire");
            firebase.database().ref(`/points/${id}/`)
                .set({
                    nome: this.state.nome,
                    lat: parseFloat(this.state.lat),
                    lng: parseFloat(this.state.lng)
                })
                .then(value => {
                    console.log('certo')
                }).catch((erro) => {
                    console.log(erro)
                })
          },(error) => {
            console.log("Error: " + error);
          });
    }
    getItem(){
        var storageRef = firebase.database().ref();
        var geoFire = new GeoFire(storageRef);
        var geoQuery = geoFire.query({
            center: [-25.556100, -49.282136],
            radius: parseFloat(this.state.raio)
        });
        geoQuery.on("key_entered", (key, location, distance) => {
        console.log(key + " entered query at " + location + " (" + distance + " km from center)");
            var markers = firebase.database().ref(`points/${key}`).orderByKey();
            markers.on('value', (snapshot) =>{   
                var lat = snapshot.child("lat").val()
                var lng = snapshot.child("lng").val()
                var nome = snapshot.child("nome").val()
                var all = {id: snapshot.key,lat,lng,nome,distance }
                this.pushItem(all)
            })
        });
        
    }
    pushItem = (obj) => {
        this.state.pontos.push(obj)
        // console.log('send obj',list)
        
        this.setState([...this.state.pontos, obj])
    }
    render(){
        const style ={
            display:'flex',
            justifyContent:'center',
            alignItems:'center'

        }
        console.log('estado atual',this.state.pontos)
        return (
          <div>  
                <div style={style}>
                   <div>  
                         <div className={'container '}>
                             <h2 className={'teal-text'}>Enviando pontos</h2>
                             <label>latitude</label>
                             <input type="number" placeholder="lat" value={this.state.lat} onChange={(e) => this.setState({lat: e.target.value})}/>
                             <label>longitude</label>
                             <input type="number" placeholder="lng" value={this.state.lng} onChange={(e) => this.setState({lng: e.target.value})}/>
                             <label>Nome</label>
                             <input type="text" placeholder="nome" value={this.state.nome} onChange={(e) => this.setState({nome: e.target.value})}/>
                             <a className="waves-effect waves-light btn-large" onClick={() => this.sendNewPoint()}>Enviar</a>
                         </div>
                         <div className={'container '}>
                         <h4>busca</h4>
                         <label>Raio</label>
                         <input type="number" placeholder="raio" value={this.state.raio} onChange={(e) => this.setState({raio: e.target.value})}/>
                        <a className="waves-effect waves-light btn-large" onClick={() => {
                            this.setState({pontos: []})
                            this.getItem()
                        }}>buscar</a>
                        <h5>Resultados</h5>
                         <div className="collection">
                            {this.state.pontos.map((item) => {
                                return <a href="#!" className="collection-item"><span className="badge">{item.distance}Km</span>{item.nome}</a>
                            })}
                        </div>
                         </div>
                    </div>
                </div>
          </div>  
        );
    }
}