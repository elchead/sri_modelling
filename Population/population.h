#include <vector>
#include "person.h"
#include "configuration.h"
#include <random>
#include <chrono>

class Random
{
public:
    double get_double() const;
};

class Population
{
public:
    Population(size_t size);
    void nextTimestep(); // outputs SIR data

private:
    std::vector<Person> persons_;
    Random random_;
    Configuration config_;
};

std::ostream &operator<<(std::ostream &output, const Person &p);