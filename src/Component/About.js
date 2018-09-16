import React from 'react';

export default class About extends React.Component {

    render(){
        const style = {
            height:300,
            display:'flex',
            alignItems:'center'
        }
        return (
            <div className={'container'}>
                <h5 className={'teal-text'}> Sobre o experimento</h5>
                <div className={'card-pannel z-depth-5 teal'}>
                    <div className={'container white-text'} style={style}>
                      <p>
                          Foram cadastrados locais por boa parte do parana e os pontos em curitiba foram cadastrado do inicio e no fim da lista em ordem eleatoria para validar a o experimento em questão a performance do algoritmo. <br/><br/> <strong>Modo de ultilização:</strong> passe o raio desejado e faça uma busca os resultado seram exibidos abaixo, caso queira adicionar novos pontos basta preencher os campos de cadastro primiro a latitude ensigida a longitude e o nome e clickar em enviar.
                      </p>
                    </div>
                </div>
            </div>
        );
    }
}