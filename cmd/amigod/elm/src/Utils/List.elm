module Utils.List exposing (..)


section : Int -> Int -> List a -> List a
section offset chunk items =
    items
        |> List.drop offset
        |> List.take chunk
