module Routing exposing (..)

import Navigation exposing (Location)
import Models exposing (Model, Database, Route(Home, Query, Tables), SimpleRoute(SQuery, STables))
import Msgs exposing (Msg(OnFocusQuery))
import UrlParser exposing (Parser, parseHash, map, top, s, oneOf, string, (</>))
import Dom
import RemoteData
import Task


matchers : Parser (Route -> a) a
matchers =
    oneOf
        [ map Home top
        , map Query (s "query" </> string)
        , map Tables (s "tables" </> string)
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
        dummy =
            Debug.log location.hash

        route =
            parseLocation location

        cmd =
            case route of
                Home ->
                    Navigation.load <| routeToUrl SQuery model

                Query _ ->
                    Task.attempt OnFocusQuery (Dom.focus "query")

                _ ->
                    Cmd.none
    in
        ( { model | route = route }, cmd )


routeToUrl : SimpleRoute -> Model -> String
routeToUrl simpleRoute model =
    case model.route of
        -- if home, we try to default to the first loaded database
        Home ->
            case model.databaseServer of
                RemoteData.Success databaseServer ->
                    case List.head databaseServer.databases of
                        Just database ->
                            case simpleRoute of
                                SQuery ->
                                    "#query/" ++ database

                                STables ->
                                    "#tables/" ++ database

                        Nothing ->
                            "foo"

                _ ->
                    "bar"

        Query database ->
            case simpleRoute of
                SQuery ->
                    "#query/" ++ database

                STables ->
                    "#tables/" ++ database

        Tables database ->
            case simpleRoute of
                SQuery ->
                    "#query/" ++ database

                STables ->
                    "#tables/" ++ database


isRoute : SimpleRoute -> Model -> Bool
isRoute simpleRoute model =
    case model.route of
        Home ->
            False

        Query _ ->
            simpleRoute == SQuery

        Tables _ ->
            simpleRoute == STables


getDatabase : Model -> Database
getDatabase model =
    case model.route of
        Home ->
            ""

        Query database ->
            database

        Tables database ->
            database
