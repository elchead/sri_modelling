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
#include "random.h"

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
        std::vector<Person> moving_persons;
            for(std::vector<Population>::iterator population = populations_.begin(); 
        population != populations_.end();
        population++)
            {
                for (auto nbr_timesteps = 0;nbr_timesteps < end_nbr_timesteps_;++nbr_timesteps)
                {
                    std::cout << "Output: "
                        << nbr_timesteps << std::endl;
                    if(!moving_persons.empty()){
                        population->addPerson(moving_persons.back());
                        moving_persons.pop_back();
                        // std::cout << "Adding person to " << population->id() << std::endl;
                    }

                    if (random_.get_double() < travel_probability_)
                    {
                        // remove person
                        moving_persons.push_back(population->removePerson());
                    }
                    population->nextTimestep();
                }
            }
        }

private:
    std::vector<Population> populations_;
    size_t size_populations_ = 0;
    double travel_probability_ = .5;
    double time_;
    size_t nbr_timesteps_ = 0;
    size_t end_nbr_timesteps_ = 0;
    Random random_;
};
