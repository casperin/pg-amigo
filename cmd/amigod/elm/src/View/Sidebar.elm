module View.Sidebar exposing (..)

import Utils.List exposing (nth)
import Html exposing (Html, button, div, text, ul, li, select, option)
import Html.Attributes exposing (class, value, disabled)
import Msgs exposing (Msg)
import Models exposing (Model, DatabaseSchema, Structure)
import RemoteData exposing (WebData)


sidebar : Model -> Html Msg
sidebar model =
    case model.structure of
        RemoteData.NotAsked ->
            div [ class "sidebar" ] [ text "" ]

        RemoteData.Loading ->
            div [ class "sidebar" ] [ text "Loading..." ]

        RemoteData.Failure err ->
            div [ class "sidebar" ] [ text <| toString err ]

        RemoteData.Success struc ->
            div [ class "sidebar" ]
                [ databaseSelector struc.databases
                ]


databaseSelector : List DatabaseSchema -> Html Msg
databaseSelector dbs =
    select [ disabled (List.isEmpty dbs) ]
        (List.indexedMap
            (\idx db -> option [ value (toString idx) ] [ text db.name ])
            dbs
        )
