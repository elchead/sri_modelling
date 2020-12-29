#include <vector>
#include "person.h"
#include "configuration.h"
#include <random>
#include <chrono>
#include <Eigen/Core>
#include <cmath>
//#include <ranges>

class Random
{
public:
    double get_double(double min=0,double max=1) const;
};

class Population
{
public:
    Population(size_t size);
    void nextTimestep();    // outputs SIR data
    void startSimulation(); // timestep loop

private:
    void updateStatuses();
    void move();

    std::vector<Person> persons_;
    Random random_;
    Configuration config_;
    Eigen::VectorXf S_;
    Eigen::VectorXf I_;
    Eigen::VectorXf R_;
};

std::ostream &operator<<(std::ostream &output, const Person &p);