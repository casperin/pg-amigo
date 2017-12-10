port module Msgs exposing (..)

import Navigation
import Keyboard.Event exposing (KeyboardEvent)
import Models exposing (QueryResponse, DatabaseServer)
import Dom
import RemoteData exposing (WebData)
import Http


type Msg
    = OnLocationChange Navigation.Location
    | HandleKeyboardEvent KeyboardEvent
    | SetIgnoreKeyEvent Bool
    | OnFetchDatabaseServerResponse (WebData DatabaseServer)
    | OnUpdateDatabase Models.Database
    | FocusQuery
    | OnUpdateQueryString String
    | OnForceUpdateQueryString String
    | OnFocusQuery (Result Dom.Error ())
    | RunQuery
    | OnQueryResponse (WebData QueryResponse)
    | UpdateQueryOffset Int


port saveDatabase : String -> Cmd msg


port loadDatabase : List String -> Cmd msg


port updateDatabase : (String -> msg) -> Sub msg
