import { connect } from 'react-redux'
import { BoardView, BoardViewProps } from '../components/board/boardView'
import { Categorie, Month, Price, Year } from '../types/common'
import { SUM_TYPE } from '../constants/constants'
import { RootState } from '../store/store'

const mapStateToProps = (state:RootState ):BoardViewProps => {

    const {
      categories,
      prices,
      years,
      months,
      // activedObjs,
      searchOptions
    } = state

  const { searchMin, searchMax } = searchOptions
  const activatedCats = categories
    .filter((cat:Categorie) => cat.isDisplayed)
    .sort((a:Categorie, b:Categorie) =>
      a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' })
    )
  const filteredCatIds = activatedCats
    .filter((cat:Categorie) => cat.isOn)
    .map((cat:Categorie) => cat.id)
  const filteredPrices = prices
    .filter((price:Price) => filteredCatIds.includes(price.cat.id))
    .filter((price:Price) =>
      searchOptions.searchWord.length < 3
        ? true
        : price.comment
            .replace(/\s/g, '')
            .toLowerCase()
            .includes(
              searchOptions.searchWord.replace(/\s/g, '').toLowerCase()
            ) ||
          price.obj.name
            .replace(/\s/g, '')
            .toLowerCase()
            .includes(searchOptions.searchWord.replace(/\s/g, '').toLowerCase())
    )
    .filter((price:Price)  => (searchMin == null ? true : price.amount >= searchMin))
    .filter((price:Price)  => (searchMax == null ? true : price.amount <= searchMax))
  const filteredPricesCats = [...new Set(filteredPrices.map((p:Price) => p.cat.id))]
  const filteredCats = activatedCats
    .filter((cat:Categorie) => cat.isOn)
    .filter((cat:Categorie) => filteredPricesCats.includes(cat.id))
    .map((cat:Categorie) => {
      const recette = sumPrices(filteredPrices, cat, 'RECETTE')
      const depense = sumPrices(filteredPrices, cat, 'DEPENSE')
      return {
        ...cat,
        recette,
        depense
      }
    })
  const isAllYearsChecked = years.filter((y:Year) => !y.isOn).length === 0
  const isAllMonthsChecked = months.filter((m:Month) => !m.isOn).length === 0
  const isAllCatsChecked = activatedCats.filter((c:Categorie) => !c.isOn).length === 0
  return {
    years,
    months,
    filteredPrices,
    activatedCats,
    filteredCats,
    // activedObjs,
    isAllYearsChecked,
    isAllMonthsChecked,
    isAllCatsChecked,
    searchOptions
  }
}
const BoardViewContainer = connect(mapStateToProps)(BoardView)
export default BoardViewContainer

interface IsPricePos {
  'RECETTE' : boolean,
  'DEPENSE' : boolean,
  'TOTAL' : boolean
}

export const sumPrices = (filteredPrices:Price[], cat:Categorie, sumType:SUM_TYPE) =>
  filteredPrices.reduce((acc, price) => {
    const isPricePos = ({
      'RECETTE': price.amount < 0,
      'DEPENSE': price.amount > 0
    } as IsPricePos )[sumType]
    return price.cat.id === cat.id   && isPricePos ? acc + price.amount : acc
  }, 0)
