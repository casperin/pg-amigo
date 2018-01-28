module View.SelectDB exposing (selectDB)

import Html exposing (..)
import Html.Attributes exposing (..)


selectDB : List String -> Html msg
selectDB dbs =
    div []
        [ h1 [] [ text "Select database" ]
        , ul [] (List.map viewDB dbs)
        ]


viewDB : String -> Html msg
viewDB db =
    li []
        [ a
            [ href ("#db/" ++ db ++ "/query") ]
            [ text db ]
        ]
