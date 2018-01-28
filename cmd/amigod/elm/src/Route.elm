module Route exposing (parseLocation)

import Navigation
import Model exposing (Model, Route(NotFound, Home, Query, Tables))
import UrlParser exposing (Parser, parseHash, map, top, s, oneOf, string, (</>))


matchers : Parser (Route -> a) a
matchers =
    oneOf
        [ map Home top
        , map Query (s "db" </> string </> s "query")
        , map Tables (s "db" </> string </> s "tables")
        ]


parseLocation : Navigation.Location -> Route
parseLocation location =
    case (parseHash matchers location) of
        Just route ->
            route

        Nothing ->
            NotFound
