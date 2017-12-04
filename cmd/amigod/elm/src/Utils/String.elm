module Utils.String exposing (..)


tern : Bool -> a -> a -> a
tern p x y =
    if p then
        x
    else
        y
