module Msgs exposing (..)

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
    | FocusQuery
    | OnUpdateQueryString String
    | OnFocusQuery (Result Dom.Error ())
    | RunQuery
    | OnQueryResponse (WebData QueryResponse)
