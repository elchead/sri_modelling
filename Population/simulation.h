#pragma once
#include <vector>
#include <random>
#include <chrono>
#include <Eigen/Core>
#include <cmath>
#include "population.h"
#include <fstream>
#include <filesystem>
#include <math.h>

class Simulation
{
public:
    Simulation() = default;
    Simulation(double travel_probability) : travel_probability_(travel_probability) {};
    void addPopulation(Configuration config){
        end_nbr_timesteps_ = config.nbr_timesteps;
        populations_.emplace_back(config, ++size_populations_);
    }
    void start(){
        // while(nbr_timesteps_ < end_nbr_timesteps_){
        //     for(auto& population: populations_){
        //     population.nextTimestep();
        // } 
        // }
        for(auto& population: populations_){
            population.startSimulation();
        }
    }

private:
    std::vector<Population> populations_;
    size_t size_populations_ = 0;
    double travel_probability_ = .5;
    double time_;
    size_t nbr_timesteps_ = 0;
    size_t end_nbr_timesteps_ = 0;
};
