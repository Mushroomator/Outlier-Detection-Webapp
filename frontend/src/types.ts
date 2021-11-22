export interface IImages {
    original: string
    reconstructed: string
}

export interface IDetails {
    isOk: boolean
    quadraticError: number
}


export interface IOutlierData {
    time: Date
    images: IImages
    details: IDetails
}

export type THistory = Array<IOutlierData>; 