module Routing exposing (..)

import Navigation exposing (Location)
import Models exposing (Model, Route(Home, Query, Tables))
import Msgs exposing (Msg(OnFocusQuery))
import UrlParser exposing (Parser, parseHash, map, top, s, oneOf)
import Dom exposing (focus)
import Task


matchers : Parser (Route -> a) a
matchers =
    oneOf
        [ map Home top
        , map Query (s "query")
        , map Tables (s "tables")
        ]


parseLocation : Location -> Route
parseLocation location =
    case (parseHash matchers location) of
        Just route ->
            route

        Nothing ->
            Home


updateLocation : Location -> Model -> ( Model, Cmd Msg )
updateLocation location model =
    let
        route =
            parseLocation location

        cmd =
            case route of
                Home ->
                    Navigation.load "#query"

                Query ->
                    Task.attempt OnFocusQuery (focus "query")

                _ ->
                    Cmd.none
    in
        ( { model | route = route }, cmd )
