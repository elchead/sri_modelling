#include <iostream>
#include "population.h"
#include <fstream>
#include "jute.h"
#include <string>

Configuration readConfig(const char* filepath="../config.json"){
    std::ifstream in("../config.json",std::ios::out);
    std::string str = "";
    std::string tmp;
    while (getline(in, tmp)) str += tmp;

    jute::jValue v = jute::parser::parse(str);
    Configuration config;
    config.population_size = v["population_size"].as_int();
    config.nbr_timesteps = v["nbr_timesteps"].as_int();
    config.dt = v["dt_days"].as_double();
    config.infection_duration = v["infection_duration_days"].as_double();
    config.dimensions = BoxDimension(v["dimension_x"].as_double(), v["dimension_x"].as_double());
    config.moving_speed = v["moving_speed"].as_double();
    config.infection_probability = v["infection_probability_day"].as_double();
    config.infection_radius = v["infection_radius"].as_double();
    return config;
    }

int main(int argc, char **argv)
{
    std::cout << "Welcome to the infection modeller! " << std::endl;
    // std::cout << "This is your input " << std::endl;
    // for (int i = 0; i < argc; ++i){
    //     std::cout << argv[i] << "\n";
    // }
    auto config = readConfig();
    auto p = Population(config);
    p.startSimulation();
    return 0;
}