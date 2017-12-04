module View.Tabs exposing (..)

import Utils.String exposing (tern)
import Html exposing (Html, button, div, text, ul, li, select, option, a)
import Html.Attributes exposing (class, value, disabled, href)
import Msgs exposing (Msg)
import Models exposing (Model, Route(Query, Tables))
import RemoteData exposing (WebData)


tabs : Model -> Html Msg
tabs model =
    case model.databaseServer of
        RemoteData.NotAsked ->
            div [ class "tabs" ] [ text "" ]

        RemoteData.Loading ->
            div [ class "tabs" ] [ text "Loading..." ]

        RemoteData.Failure err ->
            div [ class "tabs" ] [ text <| toString err ]

        RemoteData.Success databaseServer ->
            div [ class "tabs" ]
                [ databaseSelector databaseServer.databases
                , a
                    [ href "#query"
                    , class <| tern (model.route == Query) "current" ""
                    ]
                    [ text "Query" ]
                , a
                    [ href "#tables"
                    , class <| tern (model.route == Tables) "current" ""
                    ]
                    [ text "Tables" ]
                ]


databaseSelector : List String -> Html Msg
databaseSelector dbs =
    div [ class "database-selector" ]
        [ select [ disabled (List.isEmpty dbs) ]
            (List.map
                (\db -> option [ value db ] [ text db ])
                dbs
            )
        ]
