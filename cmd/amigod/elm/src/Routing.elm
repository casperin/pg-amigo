module Routing exposing (..)

import Navigation exposing (Location)
import Models exposing (Route(..))


parseLocation : Location -> Route
parseLocation location =
    Home
