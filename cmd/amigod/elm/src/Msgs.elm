module Msgs exposing (..)

import Navigation exposing (Location)
import Keyboard.Event exposing (KeyboardEvent)
import Dom


type Msg
    = ToggleSidebar
    | OnLocationChange Location
    | HandleKeyboardEvent KeyboardEvent
    | SetIgnoreKeyEvent Bool
    | FocusQuery
    | OnFocusQuery (Result Dom.Error ())
