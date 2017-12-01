module Utils.String exposing (..)


tern : Bool -> String -> String -> String
tern x a b =
    if x then
        a
    else
        b
