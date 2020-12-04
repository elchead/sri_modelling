#include <iostream>
#include "population.h"

int main(int argc, char **argv)
{
    std::cout << "Welcome to the infection modeller! " << std::endl;
    std::cout << "This is your input " << std::endl;
    for (int i = 0; i < argc; ++i)
        std::cout << argv[i] << "\n";

    auto p = Population(3);
    p.startSimulation();
    return 0;
}