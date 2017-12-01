module View.Sidebar exposing (..)

import Html exposing (Html, button, div, text)
import Html.Attributes exposing (class)
import Msgs exposing (Msg)
import Models exposing (Model)


sidebar : Model -> Html Msg
sidebar model =
    div [ class "sidebar" ]
        [ text "Sidebar here" ]
