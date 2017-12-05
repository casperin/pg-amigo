module Models exposing (..)

import RemoteData exposing (WebData)


type Route
    = Home
    | Query Database
    | Tables Database


type SimpleRoute
    = SQuery
    | STables


type alias Database =
    String


type alias QueryResponse =
    { schema : List SchemaColumn
    , values : List (List String)
    }


type alias SchemaColumn =
    { name : String }


type alias DatabaseServer =
    { databases : List String }


type alias Model =
    { loading : Int
    , route : Route
    , ignoreKeyEvents : Bool
    , databaseServer : WebData DatabaseServer
    , queryString : String
    , queryResponse : WebData QueryResponse
    , error : Maybe String
    }


initialModel : Route -> Model
initialModel route =
    { loading = 0
    , route = route
    , ignoreKeyEvents = False
    , databaseServer = RemoteData.Loading
    , queryString = ""
    , queryResponse = RemoteData.NotAsked
    , error = Nothing
    }
