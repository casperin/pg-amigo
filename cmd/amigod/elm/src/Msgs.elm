module Msgs exposing (..)

import Navigation exposing (Location)
import Keyboard.Event exposing (KeyboardEvent)
import Models exposing (QueryResponse, Structure)
import Dom
import RemoteData exposing (WebData)
import Http


type Msg
    = ToggleSidebar
    | OnLocationChange Location
    | HandleKeyboardEvent KeyboardEvent
    | SetIgnoreKeyEvent Bool
    | FocusQuery
    | OnFetchDatabasesResponse (WebData Structure)
    | OnUpdateQueryString String
    | OnFocusQuery (Result Dom.Error ())
    | RunQuery
    | OnQueryResponse (WebData QueryResponse)
