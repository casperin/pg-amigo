port module Main exposing (..)

import Html exposing (Html)
import Update exposing (update)
import Models exposing (initialModel, Model)
import View exposing (view)
import Msgs exposing (Msg)
import Commands.Databases exposing (fetchDatabaseServer)
import Navigation exposing (Location)
import Routing
import Json.Decode as Json
import Window.Events exposing (onWindow)
import Keyboard.Event exposing (KeyboardEvent, decodeKeyboardEvent)


main =
    Navigation.program Msgs.OnLocationChange
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ onWindow "keydown" (Json.map Msgs.HandleKeyboardEvent decodeKeyboardEvent)
        , Msgs.updateDatabase Msgs.OnUpdateDatabase
        ]


init : Location -> ( Model, Cmd Msg )
init location =
    let
        currentRoute =
            Routing.parseLocation location
    in
        ( initialModel currentRoute, fetchDatabaseServer )
