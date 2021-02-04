#define CATCH_CONFIG_MAIN  // This tells Catch to provide a main() - only do this in one cpp file
#include "catch_amalgamated.hpp"
//#include <catch2/catch.hpp> // when using VCPKG, include this header instead
#include "simulation.h"

TEST_CASE( "Person movement", "[person]" ) {
    auto pop = Population();
    pop.addPerson(Person(0, 0));
    auto& person = pop.get_persons()[0];
    person.move(1, 0);
    REQUIRE(person.get_position()[0] == 1);
    REQUIRE(person.get_position()[1] == 0);

}