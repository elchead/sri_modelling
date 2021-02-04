#define CATCH_CONFIG_MAIN  // This tells Catch to provide a main() - only do this in one cpp file
#include "catch_amalgamated.hpp"
//#include <catch2/catch.hpp> // when using VCPKG, include this header instead
#include "simulation.h"
unsigned int Factorial( unsigned int number ) {
    return number <= 1 ? number : Factorial(number-1)*number;
}

TEST_CASE( "Factorials are computed", "[factorial]" ) {
    auto sim = Simulation();
    auto config = readConfig();
    size_t nbr_populations = 1;
    for (int i = 0; i < nbr_populations; i++){
        sim.addPopulation(config);
    }
    sim.start();
    REQUIRE( Factorial(1) == 1 );
    REQUIRE( Factorial(2) == 2 );
    REQUIRE( Factorial(3) == 6 );
    REQUIRE( Factorial(10) == 3628800 );
}