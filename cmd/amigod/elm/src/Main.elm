module Main exposing (..)

import Navigation
import Model exposing (Model)
import Model.InitialModel exposing (createInitialModel)
import View exposing (wrapper)
import Update exposing (update, Msg(UrlChange))
import Cmd.DB


main =
    Navigation.program UrlChange
        { init = init
        , view = wrapper
        , update = update
        , subscriptions = (\_ -> Sub.none)
        }


init : Navigation.Location -> ( Model, Cmd Msg )
init location =
    ( createInitialModel location
    , Cmd.DB.fetchDBServer
    )
