const data = {
  Carriers: [
    { CarrierId: 1717, Name: 'Aeroflot' },
    { CarrierId: 1375, Name: 'LOT' },
  ],

  Currencies: [
    {
      Code: 'RUB',
      DecimalDigits: 2,
      DecimalSeparator: ',',
      RoundingCoefficient: 0,
      SpaceBetweenAmountAndSymbol: true,
      Symbol: '₽',
      SymbolOnLeft: false,
      ThousandsSeparator: ' ',
    },
  ],

  Dates: {
    OutboundDates: [
      {
        PartialDate: '2021-04-30',
        Price: 19495,
        QuoteDateTime: '2021-04-09T20:57:00',
        QuoteIds: [1, 2],
      },
    ],
  },

  Places: [
    {
      CityId: 'NYCA',
      CityName: 'New York',
      CountryName: 'United States',
      IataCode: 'JFK',
      Name: 'New York John F. Kennedy',
      PlaceId: 60987,
      SkyscannerCode: 'JFK',
      Type: 'Station',
    },
    {
      CityId: 'MOSC',
      CityName: 'Moscow',
      CountryName: 'Russia',
      IataCode: 'SVO',
      Name: 'Moscow Sheremetyevo',
      PlaceId: 82495,
      SkyscannerCode: 'SVO',
      Type: 'Station',
    },
  ],

  Quotes: [
    {
      Direct: false,
      MinPrice: 19495,
      OutboundLeg: {
        CarrierIds: [1375],
        DepartureDate: '2021-04-30T00:00:00',
        DestinationId: 60987,
        OriginId: 82495,
        QuoteDateTime: '2021-04-09T20:57:00',
        QuoteId: 1,
      },
    },
    {
      Direct: true,
      MinPrice: 22760,
      OutboundLeg: {
        CarrierIds: [1717],
        DepartureDate: '2021-04-30T00:00:00',
        DestinationId: 60987,
        OriginId: 82495,
        QuoteDateTime: '2021-04-09T20:57:00',
        QuoteId: 2,
      },
    },
  ],
}

const resultObj = [
  {
    Place: {
      From: 'Moscow (SVO)',
      To: 'New York City (JFK)',
    },
    Date: '28 June, 2020 - 14:50',
    Carriers: 'Aeroflot',
    Price: '23 924',
  },
]

const getPlace = (quotes, places, id) => {
  const getPlaceString = (id) => {
    return places.reduce((acc, { PlaceId, CityName, IataCode }) => {
      if (PlaceId === id) acc = `${CityName} (${IataCode})`
      return acc
    }, '')
  }

  return Object.values(quotes).reduce(
    (acc, { OutboundLeg: { DestinationId, CarrierIds, OriginId } }) => {
      if (CarrierIds.includes(id)) {
        acc = {
          From: getPlaceString(OriginId),
          To: getPlaceString(DestinationId),
        }
      }
      return acc
    },
    {}
  )
}

const res = Object.values(data.Carriers).map(({ CarrierId, Name }) => {
  return {
    Place: getPlace(data.Quotes, data.Places, CarrierId),
    Dates: '',
    Carriers: '',
    Price: '',
  }
})

console.log(res)
