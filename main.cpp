#include <iostream>
#include "configuration.h"
#include "population.h"
#include <fstream>
#include <string>
#include "simulation.h"

int main(int argc, char **argv)
{
    std::cout << "Welcome to the infection modeller! " << std::endl;
    // std::cout << "This is your input " << std::endl;
    // for (int i = 0; i < argc; ++i){
    //     std::cout << argv[i] << "\n";
    // }
    auto sim = Simulation();
    auto config = readConfig();
    size_t nbr_populations = 1;
    for (int i = 0; i < nbr_populations; i++){
        sim.addPopulation(config);
    }
    sim.start();
    return 0;
}