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

TEST_CASE( "Person state", "[person]" ) {
    auto person = Person(0, 0);
    person.set_state(State::Recovered);
    REQUIRE(person.get_state_string() == "recovered");
    person.set_state(State::Infectious);
    REQUIRE(person.get_state_string() == "infectious");
    person.set_state(State::Susceptible);
    REQUIRE(person.get_state_string() == "susceptible");
}

TEST_CASE( "Add person", "[population]" ) {
    auto pop = Population();
    pop.addPerson(Person(0, 0));
    REQUIRE(pop.get_persons().size() == 1);
}

TEST_CASE( "Remove person", "[population]" ) {
    auto pop = Population();
    pop.addPerson(Person(0, 0));
    REQUIRE(pop.get_persons().size() == 1);
    pop.removePerson();
    REQUIRE(pop.get_persons().size() == 0);
    REQUIRE_THROWS_AS(pop.removePerson(), std::domain_error);
}

TEST_CASE( "Constructor", "[population]" ) {
    auto config = Configuration();
    config.population_size = 2;
    config.infection_probability = 1;
    config.initial_infection_proportion = .5;
    config.infection_radius = 1;
    auto pop = Population(config);
    REQUIRE(pop.get_nbr_infected() == config.initial_infection_proportion*config.population_size);
    REQUIRE(pop.get_persons().size() == config.population_size);
    REQUIRE(std::filesystem::is_directory("CSV") == true);
}

TEST_CASE( "Next timestep: Check status update", "[population]" ) {
    auto config = Configuration();
    config.population_size = 2;
    config.infection_probability = 1;
    config.initial_infection_proportion = .5;
    config.infection_radius = 2;
    auto pop = Population(config);
    pop.nextTimestep();
    REQUIRE(pop.get_nbr_infected() == 2);
}