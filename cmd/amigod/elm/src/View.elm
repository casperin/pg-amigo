module View exposing (wrapper)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Navigation
import RemoteData
import Model as M
import View.SelectDB exposing (selectDB)


wrapper : M.Model -> Html msg
wrapper model =
    case model.dbServer of
        RemoteData.NotAsked ->
            p [] [ text "Hold on..." ]

        RemoteData.Loading ->
            p [] [ text "Loading..." ]

        RemoteData.Success dbs ->
            page model dbs.databases

        RemoteData.Failure error ->
            div []
                [ p [] [ text "I could not fetch the Databases for you." ]
                , pre [] [ text <| toString error ]
                ]


page : M.Model -> List String -> Html msg
page model dbs =
    case model.route of
        M.Home ->
            selectDB dbs

        M.Query db ->
            h1 [] [ text <| "Query " ++ db ]

        M.Tables db ->
            h1 [] [ text <| "Tables " ++ db ]

        M.NotFound ->
            h1 [] [ text "404: Not found :(" ]
