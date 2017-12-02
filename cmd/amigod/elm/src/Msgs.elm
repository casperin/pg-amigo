module Msgs exposing (..)

import Navigation exposing (Location)
import Keyboard.Event exposing (KeyboardEvent)
import Models exposing (QueryResponse)
import Dom
import RemoteData exposing (WebData)
import Http


type Msg
    = ToggleSidebar
    | OnLocationChange Location
    | HandleKeyboardEvent KeyboardEvent
    | SetIgnoreKeyEvent Bool
    | FocusQuery
    | OnFocusQuery (Result Dom.Error ())
    | RunQuery
    | OnQueryResponse (WebData QueryResponse)
