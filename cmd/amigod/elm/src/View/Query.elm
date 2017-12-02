module View.Query exposing (..)

import RemoteData exposing (WebData)
import Models exposing (QueryResponse, SchemaColumn)
import Msgs exposing (Msg)
import Html exposing (Html, text, table, thead, tbody, tr, th, td)
import Html.Attributes exposing (class)


query : WebData QueryResponse -> Html Msg
query resp =
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
