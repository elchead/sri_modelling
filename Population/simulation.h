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
    void addPopulation(Population&& population){
        populations_.push_back(population);
    }
    void start(){
        for(auto& population: populations_){
            population.startSimulation();
        }
    }

private:
    std::vector<Population> populations_;
    double time_;
};
