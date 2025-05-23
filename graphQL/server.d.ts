// Categories
export interface CatRaw {
  id: number,
  Categorie: string,
  Ordre: number,
  template: number
}

// Objects
export interface ObjRaw {
  id: number,
  Objet: string,
  id_categorie: number
  template: number
}

export interface WhereObjets {
  where: {
    id: string,
    catId: string
  }
}

// Years
export interface YearRaw {
  year: string
}

// Prices
export interface PriceRaw {
  priceId: number,
  prix: number,
  commentaire: string,
  DateAction: string,
  dateCreate: string,
  dateModif: string,
  priceTemplate: number,
  objId: number,
  Objet: string,
  objTemplate: number,
  catId: number,
  categorie: string,
  Ordre: number,
  catTemplate: number
}

export interface WherePricesByDates {
  where: {
    years: string,
    months: string
  }
}


export interface MostUsedObjectsRaw {
  nb: number,
  id_objet: number
  Objet: string,
  id_categorie: number,
  categorie: string
}