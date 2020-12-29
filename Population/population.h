#include <vector>
#include "person.h"
#include "configuration.h"
#include <random>
#include <chrono>
#include <Eigen/Core>
#include <range/v3/view/filter.hpp>

class Random
{
public:
    double get_double() const;
};

class Population
{
public:
    Population(size_t size);
    void nextTimestep();    // outputs SIR data
    void startSimulation(); // timestep loop

private:
    std::vector<Person> persons_;

    Random random_;
    Configuration config_;
    Eigen::VectorXf S_;
    Eigen::VectorXf I_;
    Eigen::VectorXf R_;
};

std::ostream &operator<<(std::ostream &output, const Person &p);