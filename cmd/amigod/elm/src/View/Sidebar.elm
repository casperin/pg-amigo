module View.Sidebar exposing (..)

import Utils.List exposing (nth)
import Html exposing (Html, button, div, text, ul, li, select, option)
import Html.Attributes exposing (class, value, disabled)
import Msgs exposing (Msg)
import Models exposing (Model)
import RemoteData exposing (WebData)


sidebar : Model -> Html Msg
sidebar model =
    case model.databaseServer of
        RemoteData.NotAsked ->
            div [ class "sidebar" ] [ text "" ]

        RemoteData.Loading ->
            div [ class "sidebar" ] [ text "Loading..." ]

        RemoteData.Failure err ->
            div [ class "sidebar" ] [ text <| toString err ]

        RemoteData.Success databaseServer ->
            div [ class "sidebar" ]
                [ databaseSelector databaseServer.databases
                ]


databaseSelector : List String -> Html Msg
databaseSelector dbs =
    select [ disabled (List.isEmpty dbs) ]
        (List.map
            (\db -> option [ value db ] [ text db ])
            dbs
        )
