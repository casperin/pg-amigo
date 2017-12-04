module Utils.List exposing (..)


nth : Int -> List a -> Maybe a
nth n xs =
    if n < 0 then
        Nothing
    else
        case ( xs, n ) of
            ( [], _ ) ->
                Nothing

            ( x :: xs, 0 ) ->
                Just x

            ( _ :: xs, n ) ->
                nth (n - 1) xs
