export class PokemonModel {
    base_experience?: number;
    height?: number;
    id?: number;
    is_default?: boolean;
    location_area_encounters?: string;
    name?: string;
    order?: number;
    weight?: number;
    cries?: {
        latest?: string;
        legacy?: string;
    };
    sprites?: {
        front_default?: string;
        front_female?: number;
        front_shiny?: string;
        front_shiny_female?: number;
        other?: {
            home?: {
                front_default?: string;
                front_female?: number;
                front_shiny?: string;
                front_shiny_female?: number
            }
        }
    };
    stats: Array<StatsModel> | [];
    types: Array<TypesModel> | [];

    constructor(value?: PokemonModel) {
        this.stats = value ? value.stats : [];
        this.types = value ? value.types : [];
    }
}

export class TypesModel {
    slot?: number;
    type?: {
        name: string;
        url: string;
    }
}

export class StatsModel {
    base_stat?: number;
    effort?: number;
    stat?: {
        name: TypeStats;
        url: string;
    }
}

export enum TypeStats {
    HP = 'hp',
    ATK = 'attack',
    DEF = 'defense',
    SATK = 'special-attack',
    SDEF = 'special-defense',
    SPD = 'speed',
}