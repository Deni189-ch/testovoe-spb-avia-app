
//Processing information on aircraft departure
export const getPlace = ( id, Quotes, Places, Name ) => {

  const getPlaceString = (filterID) => {
    return Places.reduce( (acc, {IataCode, CityName, PlaceId}) => {
      if(PlaceId === filterID) acc = `${CityName} (${IataCode})`
      return acc
    }, '')
  }

  return Object.values(Quotes).reduce( ( acc, {
    MinPrice,
    QuoteDateTime,
    OutboundLeg: {OriginId, DestinationId, CarrierIds, DepartureDate}} ) => {
    
      const getDate = (date) => {
        const year = new Date(date).getFullYear()
        const day = new Date(date).getDate()
        const manth = new Date(date).toLocaleString('en', { month: 'long' })
      
        return `${day} ${manth}, ${year}`
      }

      const getHour = (date) => {
        const hour = new Date(date).getHours()
        const minutes = new Date(date).getMinutes()
    
        return `${hour}:${minutes}`
      }

    if (CarrierIds.includes(id)) {
      acc = {
        id: OriginId + MinPrice,
        From: getPlaceString(OriginId),
        To: getPlaceString(DestinationId),
        DepartureDate: getDate(DepartureDate),
        QuoteDateTime: getHour(QuoteDateTime),
        MinPrice: MinPrice,
        Name: Name
      }
    }
    return acc
  }, {})
}

export const getPrintInfoFight = (dates) => {
  if(Object.values(dates).length > 0) {
    //debugger
    return dates.Carriers.map( ( {CarrierId, Name} ) => {
      const { Quotes, Places } = dates
  
      return getPlace(CarrierId, Quotes, Places, Name)
    })
  }
  //debugger
  return null
}

//The end of Processing information on aircraft departure.
