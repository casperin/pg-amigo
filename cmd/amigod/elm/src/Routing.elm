module Routing exposing (..)

import Navigation exposing (Location)
import Models exposing (Route(Query, Tables))
import UrlParser exposing (..)


matchers : Parser (Route -> a) a
matchers =
    oneOf
        [ map Query top
        , map Query (s "query")
        , map Tables (s "tables")
        ]


parseLocation : Location -> Route
parseLocation location =
    case (parseHash matchers location) of
        Just route ->
            route

        Nothing ->
            Query
