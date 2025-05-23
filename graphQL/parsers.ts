import { CatGql, MostUsedObjectGql, ObjGql, PriceGql, YearGql } from "./types/graphql.js"
import { CatRaw, MostUsedObjectsRaw, ObjRaw, PriceRaw, YearRaw } from "./server.js"

export const parseCategories = (rows: CatRaw[]): CatGql[] => {
  return rows.map((rs: CatRaw): CatGql => {
    return {
      id: rs.id.toString(),
      name: rs.Categorie,
      position: rs.Ordre,
      template: rs.template
    }
  })
}

export const parseObjects = (rows: ObjRaw[]) => {
  return rows.map((rs: ObjRaw): ObjGql => {
    return {
      id: rs.id.toString(),
      name: rs.Objet,
      template: rs.template,
      cat: {
        id: rs.id_categorie.toString()
      }
    }
  })
}

export const parseYears = (rows: YearRaw[]): YearGql[] => {
  return rows.map(rs => { return { name: rs.year } })
}

export const parsePrices = (rows: PriceRaw[]): PriceGql[] => {
  return rows.map(rs => {
    return {
      id: rs.priceId.toString(),
      amount: rs.prix.toString(),
      comment: rs.commentaire ? rs.commentaire : '',
      actionDate: rs.DateAction,
      dateCreate: rs.dateCreate,
      dateModif: rs.dateModif,
      template: rs.priceTemplate,
      obj: {
        id: rs.objId.toString(),
        name: rs.Objet,
        template: rs.objTemplate
      },
      cat: {
        id: rs.catId.toString(),
        name: rs.categorie,
        position: rs.Ordre,
        template: rs.catTemplate
      }
    }
  })
}

export const parseMostUsedObjects = (rows: MostUsedObjectsRaw[]) => {
  return rows.map((rs: MostUsedObjectsRaw): MostUsedObjectGql => {
    const { nb, id_objet, Objet, id_categorie, categorie } = rs
    return {
      nb,
      objId: id_objet,
      objName: Objet,
      catId: id_categorie,
      catName: categorie
    }
  })
}
