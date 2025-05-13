export interface propEstilos{
    id              : string;
    categoria       : string;
    links           : string;
    estilo          : string;
    exibir          : string;
}

export interface propBandas{
     id             : string;
     banda          : string;
     integrantes    : string;
     descricao      : string;
     links          : string;
     slug           : string;
     imagem         : string;
     categoria      : string;
     exibir         : string;
}

export interface propAlbuns {
    id              : string;
    album           : string;
    banda           : string;
    categoria       : string;
    imagem          : string;
    lancamento      : string;
    faixas          : string;
    exibir          : string;
    integrantes     : string;
    nomeBanda       : string;
    descricao       : string;
    links           : string;
    slug            : string;
    nomeEstilo      : string;
    slugBanda       : string;
}