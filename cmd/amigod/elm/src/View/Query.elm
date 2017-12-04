module View.Query exposing (..)

import RemoteData exposing (WebData)
import Models exposing (Model, QueryResponse, SchemaColumn)
import Msgs exposing (Msg(SetIgnoreKeyEvent, RunQuery, OnUpdateQueryString))
import Msgs exposing (Msg)
import Html exposing (Html, text, div, hr, table, textarea, button, thead, tbody, tr, th, td)
import Html.Attributes exposing (class, autofocus, value, id)
import Html.Events exposing (onClick, onFocus, onBlur, onInput)


query : Model -> Html Msg
query model =
    div [ class "query-page" ]
        [ div [ class "query-container" ]
            [ textarea
                [ id "query"
                , autofocus True
                , value model.queryString
                , onInput OnUpdateQueryString
                , onFocus (SetIgnoreKeyEvent True)
                , onBlur (SetIgnoreKeyEvent False)
                ]
                []
            , button [ class "run-query-button", onClick RunQuery ] [ text "Run query" ]
            ]
        , hr [] []
        , div [ class "query-result-container" ]
            [ queryResponse model.queryResponse ]
        ]


queryResponse : WebData QueryResponse -> Html Msg
queryResponse resp =
    case resp of
        RemoteData.NotAsked ->
            text "No query"

        RemoteData.Loading ->
            text "Loading..."

        RemoteData.Failure error ->
            text (toString error)

        RemoteData.Success data ->
            table []
                [ thead []
                    [ tr [ class "labels" ]
                        (List.map
                            schema
                            data.schema
                        )
                    ]
                , tbody []
                    (List.map
                        row
                        data.values
                    )
                ]


schema : SchemaColumn -> Html Msg
schema sc =
    td [] [ text (.name sc) ]


row : List String -> Html Msg
row r =
    tr [] (List.map col r)


col : String -> Html Msg
col c =
    td [] [ text c ]
