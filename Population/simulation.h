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
    void addPopulation(Configuration config){
        populations_.emplace_back(config,++size_populations_);
    }
    void start(){
        for(auto& population: populations_){
            population.startSimulation();
        }
    }

private:
    std::vector<Population> populations_;
    size_t size_populations_ = 0;
    double time_;
};
