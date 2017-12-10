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
    { route : Route
    , ignoreKeyEvents : Bool
    , databaseServer : WebData DatabaseServer
    , queryString : String
    , queryKey : Int
    , queryHistory : List String
    , queryResponse : WebData QueryResponse
    , queryResponseOffset : Int
    , queryResponseChunk : Int
    , error : Maybe String
    }


initialModel : Route -> Model
initialModel route =
    { route = route
    , ignoreKeyEvents = False
    , databaseServer = RemoteData.Loading
    , queryString = ""
    , queryKey = 1
    , queryHistory = []
    , queryResponse = RemoteData.NotAsked
    , queryResponseOffset = 0
    , queryResponseChunk = 50
    , error = Nothing
    }
